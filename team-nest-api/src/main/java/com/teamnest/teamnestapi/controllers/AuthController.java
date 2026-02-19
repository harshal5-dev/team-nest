package com.teamnest.teamnestapi.controllers;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.teamnest.teamnestapi.dtos.AppResDto;
import com.teamnest.teamnestapi.dtos.AuthResDto;
import com.teamnest.teamnestapi.dtos.LoginReqDto;
import com.teamnest.teamnestapi.dtos.SuccessResDto;
import com.teamnest.teamnestapi.dtos.TenantRegistrationReqDto;
import com.teamnest.teamnestapi.dtos.TenantRegistrationResDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;
import com.teamnest.teamnestapi.security.IAuthCookieService;
import com.teamnest.teamnestapi.services.IAuthService;
import com.teamnest.teamnestapi.services.ITenantRegisterService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final IAuthService authService;
  private final IAuthCookieService authCookieService;
  private final ITenantRegisterService tenantRegisterService;

  @PostMapping("/register")
  public ResponseEntity<AppResDto<TenantRegistrationResDto>> registerTenant(
      @Valid @RequestBody TenantRegistrationReqDto tenantRegistrationReqDto) {
    TenantRegistrationResDto tenantRegistrationResDto =
        tenantRegisterService.registerTenant(tenantRegistrationReqDto);
    AppResDto<TenantRegistrationResDto> appResDto =
        new SuccessResDto<>("Tenant registered successfully", tenantRegistrationResDto);

    return ResponseEntity.status(HttpStatus.CREATED).body(appResDto);
  }


  @PostMapping("/login")
  public ResponseEntity<AppResDto<AuthResDto>> login(@Valid @RequestBody LoginReqDto loginReqDto) {
    AuthResDto authResDto = authService.login(loginReqDto);
    AppResDto<AuthResDto> response = new SuccessResDto<>("Login successful", authResDto);
    return ResponseEntity.status(HttpStatus.OK)
        .header(HttpHeaders.SET_COOKIE, authCookieService
            .accessTokenCookie(authResDto.getAccessToken(), authResDto.getExpiresIn()).toString())
        .body(response);
  }

  @GetMapping("/me")
  public ResponseEntity<AppResDto<UserInfoResDto>> me(Authentication authentication) {
    UserInfoResDto userInfo = authService.getCurrentUser(authentication);
    AppResDto<UserInfoResDto> response = new SuccessResDto<>("User info retrieved", userInfo);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }


  @PostMapping("/logout")
  public ResponseEntity<AppResDto<Void>> logout(HttpServletRequest request) {

    AppResDto<Void> response = new SuccessResDto<>("Logout successful", null);
    return ResponseEntity.status(HttpStatus.OK)
        .header(HttpHeaders.SET_COOKIE, authCookieService.clearAccessTokenCookie().toString())
        .body(response);
  }


}
