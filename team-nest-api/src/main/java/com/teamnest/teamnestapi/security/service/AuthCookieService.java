package com.teamnest.teamnestapi.security.service;

import org.springframework.http.ResponseCookie;
import jakarta.servlet.http.HttpServletRequest;

public interface AuthCookieService {

  ResponseCookie accessTokenCookie(String token, long maxAgeSeconds);

  ResponseCookie clearAccessTokenCookie();

  ResponseCookie refreshTokenCookie(String token, long maxAgeSeconds);

  ResponseCookie clearRefreshTokenCookie();

  String extractCookieValue(HttpServletRequest request, String cookieName);
}
