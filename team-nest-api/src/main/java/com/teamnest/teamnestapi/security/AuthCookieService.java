package com.teamnest.teamnestapi.security;

import java.time.Duration;
import java.util.Arrays;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import com.teamnest.teamnestapi.security.jwt.JwtProperties;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthCookieService implements IAuthCookieService {

  private final JwtProperties properties;

  @Override
  public ResponseCookie accessTokenCookie(String token, long maxAgeSeconds) {
    return buildCookie(properties.getCookie().getAccessTokenName(), token, maxAgeSeconds);
  }

  @Override
  public ResponseCookie refreshTokenCookie(String token, long maxAgeSeconds) {
    return buildCookie(properties.getCookie().getRefreshTokenName(), token, maxAgeSeconds);
  }

  @Override
  public ResponseCookie clearAccessTokenCookie() {
    return clearCookie(properties.getCookie().getAccessTokenName());
  }

  @Override
  public ResponseCookie clearRefreshTokenCookie() {
    return clearCookie(properties.getCookie().getRefreshTokenName());
  }

  @Override
  public String extractCookieValue(HttpServletRequest request, String cookieName) {
    Cookie[] cookies = request.getCookies();
    if (cookies == null) {
      return null;
    }
    return Arrays.stream(cookies).filter(cookie -> cookieName.equals(cookie.getName()))
        .map(Cookie::getValue).findFirst().orElse(null);
  }



  private ResponseCookie buildCookie(String name, String value, long maxAgeSeconds) {
    ResponseCookie.ResponseCookieBuilder builder = ResponseCookie.from(name, value).httpOnly(true)
        .secure(properties.getCookie().isSecure()).path(properties.getCookie().getPath())
        .sameSite(properties.getCookie().getSameSite()).maxAge(Duration.ofSeconds(maxAgeSeconds));

    if (StringUtils.hasText(properties.getCookie().getDomain())) {
      builder.domain(properties.getCookie().getDomain());
    }

    return builder.build();
  }

  private ResponseCookie clearCookie(String name) {
    ResponseCookie.ResponseCookieBuilder builder = ResponseCookie.from(name, "").httpOnly(true)
        .secure(properties.getCookie().isSecure()).path(properties.getCookie().getPath())
        .sameSite(properties.getCookie().getSameSite()).maxAge(Duration.ZERO);

    if (StringUtils.hasText(properties.getCookie().getDomain())) {
      builder.domain(properties.getCookie().getDomain());
    }

    return builder.build();
  }

}
