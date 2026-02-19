package com.teamnest.teamnestapi.security;

import org.springframework.http.ResponseCookie;

public interface IAuthCookieService {

  ResponseCookie accessTokenCookie(String token, long maxAgeSeconds);

  ResponseCookie clearAccessTokenCookie();
}
