package com.teamnest.teamnestapi.auth.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.teamnest.teamnestapi.auth.dto.AuthResDTO;
import com.teamnest.teamnestapi.auth.dto.ForgotPasswordReqDto;
import com.teamnest.teamnestapi.auth.dto.LoginReqDTO;
import com.teamnest.teamnestapi.auth.dto.ResetPasswordReqDto;
import com.teamnest.teamnestapi.auth.dto.UpdatePasswordReqDto;
import com.teamnest.teamnestapi.auth.service.AuthService;
import com.teamnest.teamnestapi.common.dto.TenantRegistrationReqDto;
import com.teamnest.teamnestapi.common.dto.TenantRegistrationResDto;
import com.teamnest.teamnestapi.common.response.AppApiResponse;
import com.teamnest.teamnestapi.common.response.ResponseBuilder;
import com.teamnest.teamnestapi.dtos.UserInfoReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;
import com.teamnest.teamnestapi.refreshtoken.dto.RefreshReqDTO;
import com.teamnest.teamnestapi.security.jwt.JwtProperties;
import com.teamnest.teamnestapi.security.service.AuthCookieService;
import com.teamnest.teamnestapi.services.ITenantRegisterService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication V1",
    description = "Endpoints for user authentication, registration, and password management operations.")
public class AuthController {

  private final AuthService authService;
  private final AuthCookieService authCookieService;
  private final ITenantRegisterService tenantRegisterService;
  private final JwtProperties jwtProperties;

  @Operation(summary = "Register a new tenant",
      description = "Creates a new tenant organization along with the owner user account. No authentication required.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "201", description = "Tenant registered successfully"),
          @ApiResponse(responseCode = "400", description = "Validation error",
              content = @Content(schema = @Schema(implementation = AppApiResponse.class))),
          @ApiResponse(responseCode = "409", description = "Tenant or email already exists",
              content = @Content(schema = @Schema(implementation = AppApiResponse.class)))})
  @SecurityRequirement(name = "")
  @PostMapping("/register")
  public ResponseEntity<AppApiResponse<TenantRegistrationResDto>> registerTenant(
      @Valid @RequestBody TenantRegistrationReqDto tenantRegistrationReqDto,
      HttpServletRequest request) {

    TenantRegistrationResDto tenantRegistrationResDto =
        tenantRegisterService.registerTenant(tenantRegistrationReqDto);

    return ResponseBuilder.created(tenantRegistrationResDto, "Tenant registered successfully",
        request);
  }


  @Operation(summary = "User login",
      description = "Authenticates a user with email and password. Returns JWT tokens in response body and sets HTTP-only cookies.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Login successful, tokens returned"),
      @ApiResponse(responseCode = "400", description = "Validation error",
          content = @Content(schema = @Schema(implementation = AppApiResponse.class))),
      @ApiResponse(responseCode = "401", description = "Invalid credentials",
          content = @Content(schema = @Schema(implementation = AppApiResponse.class)))})
  @SecurityRequirement(name = "")
  @PostMapping("/login")
  public ResponseEntity<AppApiResponse<AuthResDTO>> login(
      @Valid @RequestBody LoginReqDTO loginReqDTO, HttpServletRequest request,
      HttpServletResponse response) {
    AuthResDTO authResDto = authService.login(loginReqDTO);

    response.addHeader(HttpHeaders.SET_COOKIE, authCookieService
        .accessTokenCookie(authResDto.getAccessToken(), authResDto.getExpiresIn()).toString());
    response.addHeader(HttpHeaders.SET_COOKIE,
        authCookieService
            .refreshTokenCookie(authResDto.getRefreshToken(), authResDto.getRefreshExpiresIn())
            .toString());

    return ResponseBuilder.ok(authResDto, "Login successful", request);
  }

  @Operation(summary = "Refresh access token",
      description = "Generates new access and refresh tokens using a valid refresh token. "
          + "The refresh token can be provided in the request body or via the refresh token cookie.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "200", description = "Tokens refreshed successfully"),
          @ApiResponse(responseCode = "400", description = "Refresh token is required",
              content = @Content(schema = @Schema(implementation = AppApiResponse.class))),
          @ApiResponse(responseCode = "401", description = "Invalid or expired refresh token",
              content = @Content(schema = @Schema(implementation = AppApiResponse.class)))})
  @SecurityRequirement(name = "")
  @PostMapping("/refresh")
  public ResponseEntity<AppApiResponse<AuthResDTO>> refresh(HttpServletRequest request,
      @RequestBody(required = false) RefreshReqDTO refreshReqDto, HttpServletResponse response) {
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
    RefreshReqDTO requestDto = new RefreshReqDTO(refreshToken);
    AuthResDTO authResDto = authService.refresh(requestDto);

    response.addHeader(HttpHeaders.SET_COOKIE, authCookieService
        .accessTokenCookie(authResDto.getAccessToken(), authResDto.getExpiresIn()).toString());
    response.addHeader(HttpHeaders.SET_COOKIE,
        authCookieService
            .refreshTokenCookie(authResDto.getRefreshToken(), authResDto.getRefreshExpiresIn())
            .toString());

    return ResponseBuilder.ok(authResDto, "Tokens refreshed successfully", request);
  }

  @Operation(summary = "Request password reset",
      description = "Sends a password reset email if the account exists. Always returns success to prevent email enumeration.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200",
          description = "Password reset email sent (if account exists)"),
      @ApiResponse(responseCode = "400", description = "Validation error",
          content = @Content(schema = @Schema(implementation = AppApiResponse.class)))})
  @SecurityRequirement(name = "")
  @PostMapping("/forgot-password")
  public ResponseEntity<AppApiResponse<Void>> forgotPassword(
      @Valid @RequestBody ForgotPasswordReqDto forgotPasswordReqDto, HttpServletRequest request) {
    authService.forgotPassword(forgotPasswordReqDto);
    return ResponseBuilder.noContent("If an account exists, a password reset link has been sent",
        request);
  }

  @Operation(summary = "Reset password",
      description = "Resets the user's password using the token received via email.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "200", description = "Password reset successful"),
          @ApiResponse(responseCode = "400", description = "Invalid or expired reset token",
              content = @Content(schema = @Schema(implementation = AppApiResponse.class)))})
  @SecurityRequirement(name = "")
  @PostMapping("/reset-password")
  public ResponseEntity<AppApiResponse<Void>> resetPassword(
      @Valid @RequestBody ResetPasswordReqDto resetPasswordReqDto, HttpServletRequest request) {
    authService.resetPassword(resetPasswordReqDto);
    return ResponseBuilder.noContent("Password reset successful", request);
  }

  @Operation(summary = "Get current user info",
      description = "Returns the profile information of the currently authenticated user including tenant and roles.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "200", description = "User info retrieved successfully"),
          @ApiResponse(responseCode = "401", description = "Not authenticated",
              content = @Content(schema = @Schema(implementation = AppApiResponse.class)))})
  @GetMapping("/me")
  public ResponseEntity<AppApiResponse<UserInfoResDto>> me(Authentication authentication,
      HttpServletRequest request) {
    UserInfoResDto userInfo = authService.getCurrentUser(authentication);
    return ResponseBuilder.ok(userInfo, "User info retrieved successfully", request);
  }

  @Operation(summary = "Update password",
      description = "Updates the authenticated user's password. Requires the current password for verification.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "200", description = "Password updated successfully"),
          @ApiResponse(responseCode = "400",
              description = "Validation error or incorrect current password",
              content = @Content(schema = @Schema(implementation = AppApiResponse.class))),
          @ApiResponse(responseCode = "401", description = "Not authenticated",
              content = @Content(schema = @Schema(implementation = AppApiResponse.class)))})
  @PostMapping("/update-password")
  public ResponseEntity<AppApiResponse<Void>> updatePassword(
      @Valid @RequestBody UpdatePasswordReqDto updatePasswordReqDto, HttpServletRequest request,
      Authentication authentication) {
    authService.updatePassword(updatePasswordReqDto, authentication);
    return ResponseBuilder.noContent("Password updated", request);
  }

  @Operation(summary = "Update current user profile",
      description = "Updates the authenticated user's profile information such as name, avatar, and tenant organization name.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "200", description = "User info updated successfully"),
          @ApiResponse(responseCode = "400", description = "Validation error",
              content = @Content(schema = @Schema(implementation = AppApiResponse.class))),
          @ApiResponse(responseCode = "401", description = "Not authenticated",
              content = @Content(schema = @Schema(implementation = AppApiResponse.class)))})
  @PutMapping("/me")
  public ResponseEntity<AppApiResponse<UserInfoResDto>> updateMe(
      @Valid @RequestBody UserInfoReqDto userInfoReqDto, Authentication authentication,
      HttpServletRequest request) {
    UserInfoResDto userInfo = authService.updateUserInfo(userInfoReqDto, authentication);
    return ResponseBuilder.ok(userInfo, "User info updated", request);
  }


  @Operation(summary = "Logout",
      description = "Logs out the current user by clearing access and refresh token cookies.")
  @ApiResponses(value = {@ApiResponse(responseCode = "200", description = "Logout successful")})
  @PostMapping("/logout")
  public ResponseEntity<AppApiResponse<Void>> logout(HttpServletRequest request,
      HttpServletResponse response) {

    response.addHeader(HttpHeaders.SET_COOKIE,
        authCookieService.clearAccessTokenCookie().toString());
    response.addHeader(HttpHeaders.SET_COOKIE,
        authCookieService.clearRefreshTokenCookie().toString());

    return ResponseBuilder.noContent("logout Successfully. ", request);
  }

}
