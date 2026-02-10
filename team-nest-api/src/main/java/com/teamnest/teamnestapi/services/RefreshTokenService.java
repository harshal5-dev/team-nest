package com.teamnest.teamnestapi.services;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Instant;
import java.util.Base64;
import java.util.Optional;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.config.JwtProperties;
import com.teamnest.teamnestapi.models.RefreshToken;
import com.teamnest.teamnestapi.models.User;
import com.teamnest.teamnestapi.repositories.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

  private final RefreshTokenRepository refreshTokenRepository;
  private final JwtProperties jwtProperties;
  private final SecureRandom secureRandom = new SecureRandom();

  public String createRefreshToken(User user) {
    String rawToken = generateRawToken();
    RefreshToken refreshToken = new RefreshToken();
    refreshToken.setUser(user);
    refreshToken.setTokenHash(hashToken(rawToken));
    refreshToken.setExpiresAt(Instant.now().plusMillis(jwtProperties.getRefreshTokenExpirationMs()));
    refreshTokenRepository.save(refreshToken);
    return rawToken;
  }

  public RefreshToken getValidRefreshToken(String rawToken) {
    String tokenHash = hashToken(rawToken);
    RefreshToken refreshToken = refreshTokenRepository.findByTokenHash(tokenHash)
        .orElseThrow(() -> new BadCredentialsException("Invalid refresh token"));

    Instant now = Instant.now();
    if (refreshToken.isRevoked() || refreshToken.isExpired(now)) {
      throw new BadCredentialsException("Refresh token expired or revoked");
    }
    return refreshToken;
  }

  public void revoke(RefreshToken refreshToken) {
    refreshToken.setRevokedAt(Instant.now());
    refreshTokenRepository.save(refreshToken);
  }

  public void revokeIfExists(String rawToken) {
    if (rawToken == null || rawToken.isBlank()) {
      return;
    }
    String tokenHash = hashToken(rawToken);
    Optional<RefreshToken> tokenOpt = refreshTokenRepository.findByTokenHash(tokenHash);
    tokenOpt.ifPresent(this::revoke);
  }

  private String generateRawToken() {
    byte[] randomBytes = new byte[64];
    secureRandom.nextBytes(randomBytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
  }

  private String hashToken(String rawToken) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hash = digest.digest(rawToken.getBytes(StandardCharsets.UTF_8));
      return Base64.getUrlEncoder().withoutPadding().encodeToString(hash);
    } catch (NoSuchAlgorithmException ex) {
      throw new IllegalStateException("SHA-256 not available", ex);
    }
  }
}
