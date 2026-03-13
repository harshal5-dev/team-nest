package com.teamnest.teamnestapi.security;

import org.springframework.http.ResponseCookie;
import jakarta.servlet.http.HttpServletRequest;

public interface IAuthCookieService {

  ResponseCookie accessTokenCookie(String token, long maxAgeSeconds);

  ResponseCookie clearAccessTokenCookie();

  ResponseCookie refreshTokenCookie(String token, long maxAgeSeconds);

  ResponseCookie clearRefreshTokenCookie();

  String extractCookieValue(HttpServletRequest request, String cookieName);
}
