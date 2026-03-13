package com.teamnest.teamnestapi.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.teamnest.teamnestapi.config.JwtProperties;
import com.teamnest.teamnestapi.dtos.AppResDto;
import com.teamnest.teamnestapi.dtos.AuthResDto;
import com.teamnest.teamnestapi.dtos.ErrorResDto;
import com.teamnest.teamnestapi.dtos.ForgotPasswordReqDto;
import com.teamnest.teamnestapi.dtos.LoginReqDto;
import com.teamnest.teamnestapi.dtos.RefreshReqDto;
import com.teamnest.teamnestapi.dtos.ResetPasswordReqDto;
import com.teamnest.teamnestapi.dtos.SuccessResDto;
import com.teamnest.teamnestapi.dtos.TenantRegistrationReqDto;
import com.teamnest.teamnestapi.dtos.TenantRegistrationResDto;
import com.teamnest.teamnestapi.dtos.UpdatePasswordReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;
import com.teamnest.teamnestapi.security.IAuthCookieService;
import com.teamnest.teamnestapi.services.IAuthService;
import com.teamnest.teamnestapi.services.ITenantRegisterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication",
    description = "Endpoints for user authentication, registration, and password management")
public class AuthController {

  private final IAuthService authService;
  private final IAuthCookieService authCookieService;
  private final ITenantRegisterService tenantRegisterService;
  private final JwtProperties jwtProperties;

  @Operation(summary = "Register a new tenant",
      description = "Creates a new tenant organization along with the owner user account. No authentication required.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "201", description = "Tenant registered successfully"),
          @ApiResponse(responseCode = "400", description = "Validation error",
              content = @Content(schema = @Schema(implementation = ErrorResDto.class))),
          @ApiResponse(responseCode = "409", description = "Tenant or email already exists",
              content = @Content(schema = @Schema(implementation = ErrorResDto.class)))})
  @SecurityRequirement(name = "")
  @PostMapping("/register")
  public ResponseEntity<AppResDto<TenantRegistrationResDto>> registerTenant(
      @Valid @RequestBody TenantRegistrationReqDto tenantRegistrationReqDto) {
    TenantRegistrationResDto tenantRegistrationResDto =
        tenantRegisterService.registerTenant(tenantRegistrationReqDto);
    AppResDto<TenantRegistrationResDto> appResDto =
        new SuccessResDto<>("Tenant registered successfully", tenantRegistrationResDto);

    return ResponseEntity.status(HttpStatus.CREATED).body(appResDto);
  }


  @Operation(summary = "User login",
      description = "Authenticates a user with email and password. Returns JWT tokens in response body and sets HTTP-only cookies.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Login successful, tokens returned"),
      @ApiResponse(responseCode = "400", description = "Validation error",
          content = @Content(schema = @Schema(implementation = ErrorResDto.class))),
      @ApiResponse(responseCode = "401", description = "Invalid credentials",
          content = @Content(schema = @Schema(implementation = ErrorResDto.class)))})
  @SecurityRequirement(name = "")
  @PostMapping("/login")
  public ResponseEntity<AppResDto<AuthResDto>> login(@Valid @RequestBody LoginReqDto loginReqDto) {
    AuthResDto authResDto = authService.login(loginReqDto);
    AppResDto<AuthResDto> response = new SuccessResDto<>("Login successful", authResDto);
    return ResponseEntity.status(HttpStatus.OK)
        .header(HttpHeaders.SET_COOKIE, authCookieService
            .accessTokenCookie(authResDto.getAccessToken(), authResDto.getExpiresIn()).toString())
        .header(HttpHeaders.SET_COOKIE,
            authCookieService
                .refreshTokenCookie(authResDto.getRefreshToken(), authResDto.getRefreshExpiresIn())
                .toString())
        .body(response);
  }

  @Operation(summary = "Refresh access token",
      description = "Generates new access and refresh tokens using a valid refresh token. "
          + "The refresh token can be provided in the request body or via the refresh token cookie.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "200", description = "Tokens refreshed successfully"),
          @ApiResponse(responseCode = "400", description = "Refresh token is required",
              content = @Content(schema = @Schema(implementation = ErrorResDto.class))),
          @ApiResponse(responseCode = "401", description = "Invalid or expired refresh token",
              content = @Content(schema = @Schema(implementation = ErrorResDto.class)))})
  @SecurityRequirement(name = "")
  @PostMapping("/refresh")
  public ResponseEntity<AppResDto<AuthResDto>> refresh(HttpServletRequest request,
      @RequestBody(required = false) RefreshReqDto refreshReqDto) {
    String refreshToken = null;
    if (refreshReqDto != null) {
      refreshToken = refreshReqDto.refreshToken();
    }
    if (refreshToken == null) {
      refreshToken = authCookieService.extractCookieValue(request,
          jwtProperties.getCookie().getRefreshTokenName());
    }
    if (refreshToken == null || refreshToken.isBlank()) {
      throw new IllegalStateException("Refresh token is required");
    }
    RefreshReqDto requestDto = new RefreshReqDto(refreshToken);
    AuthResDto authResDto = authService.refresh(requestDto);
    AppResDto<AuthResDto> response = new SuccessResDto<>("Token refreshed", authResDto);
    return ResponseEntity.status(HttpStatus.OK)
        .header(HttpHeaders.SET_COOKIE, authCookieService
            .accessTokenCookie(authResDto.getAccessToken(), authResDto.getExpiresIn()).toString())
        .header(HttpHeaders.SET_COOKIE,
            authCookieService
                .refreshTokenCookie(authResDto.getRefreshToken(), authResDto.getRefreshExpiresIn())
                .toString())
        .body(response);
  }

  @Operation(summary = "Request password reset",
      description = "Sends a password reset email if the account exists. Always returns success to prevent email enumeration.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200",
          description = "Password reset email sent (if account exists)"),
      @ApiResponse(responseCode = "400", description = "Validation error",
          content = @Content(schema = @Schema(implementation = ErrorResDto.class)))})
  @SecurityRequirement(name = "")
  @PostMapping("/forgot-password")
  public ResponseEntity<AppResDto<Void>> forgotPassword(
      @Valid @RequestBody ForgotPasswordReqDto forgotPasswordReqDto) {
    authService.forgotPassword(forgotPasswordReqDto);
    AppResDto<Void> response =
        new SuccessResDto<>("If an account exists, a password reset link has been sent", null);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @Operation(summary = "Reset password",
      description = "Resets the user's password using the token received via email.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "200", description = "Password reset successful"),
          @ApiResponse(responseCode = "400", description = "Invalid or expired reset token",
              content = @Content(schema = @Schema(implementation = ErrorResDto.class)))})
  @SecurityRequirement(name = "")
  @PostMapping("/reset-password")
  public ResponseEntity<AppResDto<Void>> resetPassword(
      @Valid @RequestBody ResetPasswordReqDto resetPasswordReqDto) {
    authService.resetPassword(resetPasswordReqDto);
    AppResDto<Void> response = new SuccessResDto<>("Password reset successful", null);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @Operation(summary = "Get current user info",
      description = "Returns the profile information of the currently authenticated user including tenant and roles.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "200", description = "User info retrieved successfully"),
          @ApiResponse(responseCode = "401", description = "Not authenticated",
              content = @Content(schema = @Schema(implementation = ErrorResDto.class)))})
  @GetMapping("/me")
  public ResponseEntity<AppResDto<UserInfoResDto>> me(Authentication authentication) {
    UserInfoResDto userInfo = authService.getCurrentUser(authentication);
    AppResDto<UserInfoResDto> response = new SuccessResDto<>("User info retrieved", userInfo);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @Operation(summary = "Update password",
      description = "Updates the authenticated user's password. Requires the current password for verification.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "200", description = "Password updated successfully"),
          @ApiResponse(responseCode = "400",
              description = "Validation error or incorrect current password",
              content = @Content(schema = @Schema(implementation = ErrorResDto.class))),
          @ApiResponse(responseCode = "401", description = "Not authenticated",
              content = @Content(schema = @Schema(implementation = ErrorResDto.class)))})
  @PostMapping("/update-password")
  public ResponseEntity<AppResDto<Void>> updatePassword(
      @Valid @RequestBody UpdatePasswordReqDto updatePasswordReqDto,
      Authentication authentication) {
    authService.updatePassword(updatePasswordReqDto, authentication);
    AppResDto<Void> response = new SuccessResDto<>("Password updated", null);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  @Operation(summary = "Update current user profile",
      description = "Updates the authenticated user's profile information such as name, avatar, and tenant organization name.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "200", description = "User info updated successfully"),
          @ApiResponse(responseCode = "400", description = "Validation error",
              content = @Content(schema = @Schema(implementation = ErrorResDto.class))),
          @ApiResponse(responseCode = "401", description = "Not authenticated",
              content = @Content(schema = @Schema(implementation = ErrorResDto.class)))})
  @PutMapping("/me")
  public ResponseEntity<AppResDto<UserInfoResDto>> updateMe(
      @Valid @RequestBody UserInfoReqDto userInfoReqDto, Authentication authentication) {
    UserInfoResDto userInfo = authService.updateUserInfo(userInfoReqDto, authentication);
    AppResDto<UserInfoResDto> response = new SuccessResDto<>("User info updated", userInfo);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }


  @Operation(summary = "Logout",
      description = "Logs out the current user by clearing access and refresh token cookies.")
  @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Logout successful")})
  @PostMapping("/logout")
  public ResponseEntity<AppResDto<Void>> logout(HttpServletRequest request) {

    AppResDto<Void> response = new SuccessResDto<>("Logout successful", null);
    return ResponseEntity.status(HttpStatus.OK)
        .header(HttpHeaders.SET_COOKIE, authCookieService.clearAccessTokenCookie().toString())
        .header(HttpHeaders.SET_COOKIE, authCookieService.clearRefreshTokenCookie().toString())
        .body(response);
  }

}
