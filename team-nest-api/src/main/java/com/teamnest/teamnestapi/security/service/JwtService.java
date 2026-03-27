package com.teamnest.teamnestapi.security.service;

import java.util.UUID;
import com.teamnest.teamnestapi.user.entity.User;

public interface JwtService {
  String generateAccessToken(User user);

  long getAccessTokenTtlSeconds();

  long getRefreshTokenTtlSeconds();

  UUID extractTenantIdFromToken(String token);
}
