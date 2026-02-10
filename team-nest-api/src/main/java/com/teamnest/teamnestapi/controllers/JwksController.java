package com.teamnest.teamnestapi.controllers;

import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nimbusds.jose.jwk.JWKSet;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class JwksController {

  private final JWKSet jwkSet;

  @GetMapping("/.well-known/jwks.json")
  public Map<String, Object> keys() {
    return jwkSet.toPublicJWKSet().toJSONObject();
  }
}
