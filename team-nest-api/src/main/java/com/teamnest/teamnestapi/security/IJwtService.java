package com.teamnest.teamnestapi.security;

import com.teamnest.teamnestapi.models.User;

public interface IJwtService {
  String generateAccessToken(User user);

  long getAccessTokenTtlSeconds();
}
