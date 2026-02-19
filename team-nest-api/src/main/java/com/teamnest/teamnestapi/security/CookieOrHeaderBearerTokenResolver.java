package com.teamnest.teamnestapi.security;

import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;
import org.springframework.security.oauth2.server.resource.web.DefaultBearerTokenResolver;
import com.teamnest.teamnestapi.config.JwtProperties;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

public class CookieOrHeaderBearerTokenResolver implements BearerTokenResolver {

  private final DefaultBearerTokenResolver defaultResolver = new DefaultBearerTokenResolver();
  private final JwtProperties properties;

  public CookieOrHeaderBearerTokenResolver(JwtProperties properties) {
    this.properties = properties;
  }

  @Override
  public String resolve(HttpServletRequest request) {
    String headerToken = defaultResolver.resolve(request);
    if (headerToken != null) {
      return headerToken;
    }

    Cookie[] cookies = request.getCookies();
    if (cookies == null) {
      return null;
    }

    String accessCookieName = properties.getCookie().getAccessTokenName();
    for (Cookie cookie : cookies) {
      if (accessCookieName.equals(cookie.getName())) {
        return cookie.getValue();
      }
    }
    return null;
  }

}
