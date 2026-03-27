package com.teamnest.teamnestapi.common.controller;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nimbusds.jose.jwk.JWKSet;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@Tag(name = "JWKS", description = "JSON Web Key Set endpoint for JWT token verification")
public class JwksController {

  private final JWKSet jwkSet;

  @Operation(summary = "Get JSON Web Key Set",
      description = "Returns the public keys used to verify JWT tokens issued by this server. "
          + "This endpoint follows the JWKS standard (RFC 7517).")
  @ApiResponse(responseCode = "200", description = "JWKS returned successfully")
  @SecurityRequirement(name = "")
  @GetMapping("/.well-known/jwks.json")
  public Map<String, Object> keys() {
    return jwkSet.toPublicJWKSet().toJSONObject();
  }
}
