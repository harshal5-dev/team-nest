package com.teamnest.teamnestapi.security;

import java.util.UUID;
import com.teamnest.teamnestapi.models.User;

public interface IJwtService {
  String generateAccessToken(User user);

  long getAccessTokenTtlSeconds();

  long getRefreshTokenTtlSeconds();

  UUID extractTenantIdFromToken(String token);
}
