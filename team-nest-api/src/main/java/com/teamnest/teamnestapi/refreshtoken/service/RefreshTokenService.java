package com.teamnest.teamnestapi.refreshtoken.service;

import com.teamnest.teamnestapi.models.User;
import com.teamnest.teamnestapi.refreshtoken.entity.RefreshToken;

public interface RefreshTokenService {

  String createRefreshToken(User user);

  String updateRefreshToken(RefreshToken existingToken);

  RefreshToken getValidRefreshToken(String rawToken);

  void revokeIfExists(String rawToken);
}
