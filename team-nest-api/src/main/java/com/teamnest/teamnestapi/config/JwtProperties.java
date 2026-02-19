package com.teamnest.teamnestapi.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ConfigurationProperties(prefix = "app.jwt")
public class JwtProperties {

  private String issuer;
  private long accessTokenExpirationMs;
  private final Rsa rsa = new Rsa();
  private final Cookie cookie = new Cookie();


  @Getter
  @Setter
  public static class Rsa {
    private String publicKey;
    private String privateKey;
  }


  @Getter
  @Setter
  public static class Cookie {
    private String accessTokenName;
    private boolean secure;
    private String sameSite;
    private String path;
    private String domain;
  }

}
