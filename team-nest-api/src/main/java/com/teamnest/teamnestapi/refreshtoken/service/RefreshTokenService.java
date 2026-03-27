package com.teamnest.teamnestapi.refreshtoken.service;

import com.teamnest.teamnestapi.refreshtoken.entity.RefreshToken;
import com.teamnest.teamnestapi.user.entity.User;

public interface RefreshTokenService {

  String createRefreshToken(User user);

  String updateRefreshToken(RefreshToken existingToken);

  RefreshToken getValidRefreshToken(String rawToken);

  void revokeIfExists(String rawToken);
}
