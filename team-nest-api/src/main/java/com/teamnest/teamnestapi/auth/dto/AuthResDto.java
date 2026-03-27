package com.teamnest.teamnestapi.auth.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Schema(description = "Authentication response containing JWT tokens")
public class AuthResDTO {

  @Schema(description = "JWT access token", example = "eyJhbGciOiJSUzI1NiIs...")
  private String accessToken;

  @Schema(description = "JWT refresh token for obtaining new access tokens",
      example = "dGhpcyBpcyBhIHJlZnJlc2g...")
  private String refreshToken;

  @Schema(description = "Token type", example = "Bearer")
  private String tokenType;

  @Schema(description = "Access token expiry time in seconds", example = "900")
  private long expiresIn;

  @Schema(description = "Refresh token expiry time in seconds", example = "2592000")
  private long refreshExpiresIn;
}
