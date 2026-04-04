package com.teamnest.teamnestapi.security.service.impl;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.security.jwt.JwtProperties;
import com.teamnest.teamnestapi.security.service.JwtService;
import com.teamnest.teamnestapi.user.entity.User;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtServiceImpl implements JwtService {

  private final JwtEncoder jwtEncoder;
  private final JwtDecoder jwtDecoder;
  private final JwtProperties properties;

  @Override
  public String generateAccessToken(User user) {
    Instant now = Instant.now();
    List<String> roles = user.getRoles().stream().map(
        role -> role.getName().startsWith("ROLE_") ? role.getName().substring(5) : role.getName())
        .toList();

    JwtClaimsSet.Builder claimsBuilder =
        JwtClaimsSet.builder().issuer(properties.getIssuer()).subject(user.getEmail()).issuedAt(now)
            .expiresAt(now.plusMillis(properties.getAccessTokenExpirationMs()))
            .id(UUID.randomUUID().toString()).claim("roles", roles).claim("userId", user.getId());

    if (user.getTenantId() != null) {
      claimsBuilder.claim("tenantId", user.getTenantId().toString());
    }

    return jwtEncoder.encode(JwtEncoderParameters.from(claimsBuilder.build())).getTokenValue();
  }

  @Override
  public long getAccessTokenTtlSeconds() {
    return properties.getAccessTokenExpirationMs() / 1000;
  }

  @Override
  public long getRefreshTokenTtlSeconds() {
    return properties.getRefreshTokenExpirationMs() / 1000;
  }

  @Override
  public UUID extractTenantIdFromToken(String token) {
    try {
      Jwt jwt = jwtDecoder.decode(token);
      Object tenantClaim = jwt.getClaims().get("tenantId");
      if (tenantClaim instanceof String tenantIdStr) {
        return UUID.fromString(tenantIdStr);
      }
    } catch (JwtException | IllegalArgumentException ignored) {
      // Ignore invalid token or tenant_id format and return null
    }
    return null;
  }

}
