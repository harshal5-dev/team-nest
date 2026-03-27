package com.teamnest.teamnestapi.security;

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
import com.teamnest.teamnestapi.models.User;
import com.teamnest.teamnestapi.security.jwt.JwtProperties;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService implements IJwtService {

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
            .id(UUID.randomUUID().toString()).claim("roles", roles).claim("user_id", user.getId());

    if (user.getTenantId() != null) {
      claimsBuilder.claim("tenant_id", user.getTenantId().toString());
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
      Object tenantClaim = jwt.getClaims().get("tenant_id");
      if (tenantClaim instanceof String tenantIdStr) {
        return UUID.fromString(tenantIdStr);
      }
    } catch (JwtException | IllegalArgumentException ignored) {
      // Ignore invalid token or tenant_id format and return null
    }
    return null;
  }

}
