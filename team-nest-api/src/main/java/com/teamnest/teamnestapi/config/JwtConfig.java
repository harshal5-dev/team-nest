package com.teamnest.teamnestapi.config;

import java.security.GeneralSecurityException;
import java.security.KeyFactory;
import java.security.MessageDigest;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;

@Configuration
@EnableConfigurationProperties(JwtProperties.class)
public class JwtConfig {

  @Bean
  RSAPublicKey rsaPublicKey(JwtProperties properties) {
    return parsePublicKey(properties.getRsa().getPublicKey());
  }

  @Bean
  RSAPrivateKey rsaPrivateKey(JwtProperties properties) {
    return parsePrivateKey(properties.getRsa().getPrivateKey());
  }

  @Bean
  RSAKey rsaKey(RSAPublicKey publicKey, RSAPrivateKey privateKey) {
    String keyId = computeKeyId(publicKey);
    return new RSAKey.Builder(publicKey).privateKey(privateKey).keyID(keyId).build();
  }

  @Bean
  JWKSet jwkSet(RSAKey rsaKey) {
    return new JWKSet(rsaKey);
  }

  @Bean
  JwtDecoder jwtDecoder(RSAPublicKey publicKey) {
    return NimbusJwtDecoder.withPublicKey(publicKey).build();
  }

  @Bean
  JwtEncoder jwtEncoder(JWKSet jwkSet) {
    JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(jwkSet);
    return new NimbusJwtEncoder(jwkSource);
  }


  private RSAPublicKey parsePublicKey(String pem) {
    if (pem == null || pem.isBlank()) {
      throw new IllegalStateException("APP_JWT_RSA_PUBLIC_KEY must be set");
    }
    try {
      byte[] decoded = decodePem(pem, "PUBLIC KEY");
      X509EncodedKeySpec keySpec = new X509EncodedKeySpec(decoded);
      KeyFactory keyFactory = KeyFactory.getInstance("RSA");
      return (RSAPublicKey) keyFactory.generatePublic(keySpec);
    } catch (GeneralSecurityException ex) {
      throw new IllegalStateException("Invalid RSA public key", ex);
    }
  }

  private RSAPrivateKey parsePrivateKey(String pem) {
    if (pem == null || pem.isBlank()) {
      throw new IllegalStateException("APP_JWT_RSA_PRIVATE_KEY must be set");
    }
    try {
      byte[] decoded = decodePem(pem, "PRIVATE KEY");
      PKCS8EncodedKeySpec keySpec = new PKCS8EncodedKeySpec(decoded);
      KeyFactory keyFactory = KeyFactory.getInstance("RSA");
      return (RSAPrivateKey) keyFactory.generatePrivate(keySpec);
    } catch (GeneralSecurityException ex) {
      throw new IllegalStateException("Invalid RSA private key", ex);
    }
  }

  private byte[] decodePem(String pem, String type) {
    String sanitized =
        pem.replace("\\n", "").replace("\\r", "").replace("-----BEGIN " + type + "-----", "")
            .replace("-----END " + type + "-----", "").replaceAll("\\s", "");
    return Base64.getDecoder().decode(sanitized);
  }

  private String computeKeyId(RSAPublicKey publicKey) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hash = digest.digest(publicKey.getEncoded());
      return Base64.getUrlEncoder().withoutPadding().encodeToString(hash);
    } catch (GeneralSecurityException ex) {
      throw new IllegalStateException("Unable to compute key id", ex);
    }
  }
}
