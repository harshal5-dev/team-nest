package com.teamnest.teamnestapi.security;

import java.time.Duration;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import com.teamnest.teamnestapi.config.JwtProperties;
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
  public ResponseCookie clearAccessTokenCookie() {
    return clearCookie(properties.getCookie().getAccessTokenName());
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
