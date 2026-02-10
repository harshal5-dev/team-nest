package com.teamnest.teamnestapi.controllers;

import java.util.Arrays;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import com.teamnest.teamnestapi.dtos.AppResDto;
import com.teamnest.teamnestapi.dtos.AuthResDto;
import com.teamnest.teamnestapi.dtos.LoginReqDto;
import com.teamnest.teamnestapi.dtos.RefreshReqDto;
import com.teamnest.teamnestapi.dtos.SuccessResDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;
import com.teamnest.teamnestapi.services.AuthService;
import com.teamnest.teamnestapi.security.AuthCookieService;
import com.teamnest.teamnestapi.config.JwtProperties;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

  private final AuthService authService;
  private final AuthCookieService authCookieService;
  private final JwtProperties jwtProperties;

  @PostMapping("/login")
  public ResponseEntity<AppResDto<AuthResDto>> login(@Valid @RequestBody LoginReqDto loginReqDto) {
    AuthResDto authResDto = authService.login(loginReqDto);
    AppResDto<AuthResDto> response = new SuccessResDto<>("Login successful", authResDto);
    return ResponseEntity.status(HttpStatus.OK)
        .header(HttpHeaders.SET_COOKIE,
            authCookieService.accessTokenCookie(authResDto.getAccessToken(), authResDto.getExpiresIn()).toString())
        .header(HttpHeaders.SET_COOKIE,
            authCookieService.refreshTokenCookie(authResDto.getRefreshToken(), authResDto.getRefreshExpiresIn()).toString())
        .body(response);
  }

  @PostMapping("/refresh")
  public ResponseEntity<AppResDto<AuthResDto>> refresh(HttpServletRequest request,
      @RequestBody(required = false) RefreshReqDto refreshReqDto) {
    String refreshToken = null;
    if (refreshReqDto != null) {
      refreshToken = refreshReqDto.getRefreshToken();
    }
    if (refreshToken == null) {
      refreshToken = extractCookieValue(request, jwtProperties.getCookie().getRefreshTokenName());
    }
    if (refreshToken == null || refreshToken.isBlank()) {
      throw new IllegalStateException("Refresh token is required");
    }
    RefreshReqDto requestDto = new RefreshReqDto();
    requestDto.setRefreshToken(refreshToken);
    AuthResDto authResDto = authService.refresh(requestDto);
    AppResDto<AuthResDto> response = new SuccessResDto<>("Token refreshed", authResDto);
    return ResponseEntity.status(HttpStatus.OK)
        .header(HttpHeaders.SET_COOKIE,
            authCookieService.accessTokenCookie(authResDto.getAccessToken(), authResDto.getExpiresIn()).toString())
        .header(HttpHeaders.SET_COOKIE,
            authCookieService.refreshTokenCookie(authResDto.getRefreshToken(), authResDto.getRefreshExpiresIn()).toString())
        .body(response);
  }

  @PostMapping("/logout")
  public ResponseEntity<AppResDto<Void>> logout(HttpServletRequest request,
      @RequestBody(required = false) RefreshReqDto refreshReqDto) {
    String refreshToken = null;
    if (refreshReqDto != null) {
      refreshToken = refreshReqDto.getRefreshToken();
    }
    if (refreshToken == null) {
      refreshToken = extractCookieValue(request, jwtProperties.getCookie().getRefreshTokenName());
    }
    authService.logout(refreshToken);

    AppResDto<Void> response = new SuccessResDto<>("Logout successful", null);
    return ResponseEntity.status(HttpStatus.OK)
        .header(HttpHeaders.SET_COOKIE, authCookieService.clearAccessTokenCookie().toString())
        .header(HttpHeaders.SET_COOKIE, authCookieService.clearRefreshTokenCookie().toString())
        .body(response);
  }

  @GetMapping("/me")
  public ResponseEntity<AppResDto<UserInfoResDto>> me(Authentication authentication) {
    UserInfoResDto userInfo = authService.getCurrentUser(authentication);
    AppResDto<UserInfoResDto> response = new SuccessResDto<>("User info retrieved", userInfo);
    return ResponseEntity.status(HttpStatus.OK).body(response);
  }

  private String extractCookieValue(HttpServletRequest request, String cookieName) {
    Cookie[] cookies = request.getCookies();
    if (cookies == null) {
      return null;
    }
    return Arrays.stream(cookies)
        .filter(cookie -> cookieName.equals(cookie.getName()))
        .map(Cookie::getValue)
        .findFirst()
        .orElse(null);
  }
}
