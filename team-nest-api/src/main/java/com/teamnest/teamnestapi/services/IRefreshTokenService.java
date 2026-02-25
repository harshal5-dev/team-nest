package com.teamnest.teamnestapi.services;

import com.teamnest.teamnestapi.models.RefreshToken;
import com.teamnest.teamnestapi.models.User;

public interface IRefreshTokenService {

  String createRefreshToken(User user);

  String updateRefreshToken(RefreshToken existingToken);

  RefreshToken getValidRefreshToken(String rawToken);

  void revokeIfExists(String rawToken);
}
