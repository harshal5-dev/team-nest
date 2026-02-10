package com.teamnest.teamnestapi.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "app.jwt")
public class JwtProperties {

  private String issuer;
  private long accessTokenExpirationMs;
  private long refreshTokenExpirationMs;
  private final Rsa rsa = new Rsa();
  private final Cookie cookie = new Cookie();

  public String getIssuer() {
    return issuer;
  }

  public void setIssuer(String issuer) {
    this.issuer = issuer;
  }

  public long getAccessTokenExpirationMs() {
    return accessTokenExpirationMs;
  }

  public void setAccessTokenExpirationMs(long accessTokenExpirationMs) {
    this.accessTokenExpirationMs = accessTokenExpirationMs;
  }

  public long getRefreshTokenExpirationMs() {
    return refreshTokenExpirationMs;
  }

  public void setRefreshTokenExpirationMs(long refreshTokenExpirationMs) {
    this.refreshTokenExpirationMs = refreshTokenExpirationMs;
  }

  public Rsa getRsa() {
    return rsa;
  }

  public Cookie getCookie() {
    return cookie;
  }

  public static class Rsa {
    private String publicKey;
    private String privateKey;

    public String getPublicKey() {
      return publicKey;
    }

    public void setPublicKey(String publicKey) {
      this.publicKey = publicKey;
    }

    public String getPrivateKey() {
      return privateKey;
    }

    public void setPrivateKey(String privateKey) {
      this.privateKey = privateKey;
    }
  }

  public static class Cookie {
    private String accessTokenName;
    private String refreshTokenName;
    private boolean secure;
    private String sameSite;
    private String path;
    private String domain;

    public String getAccessTokenName() {
      return accessTokenName;
    }

    public void setAccessTokenName(String accessTokenName) {
      this.accessTokenName = accessTokenName;
    }

    public String getRefreshTokenName() {
      return refreshTokenName;
    }

    public void setRefreshTokenName(String refreshTokenName) {
      this.refreshTokenName = refreshTokenName;
    }

    public boolean isSecure() {
      return secure;
    }

    public void setSecure(boolean secure) {
      this.secure = secure;
    }

    public String getSameSite() {
      return sameSite;
    }

    public void setSameSite(String sameSite) {
      this.sameSite = sameSite;
    }

    public String getPath() {
      return path;
    }

    public void setPath(String path) {
      this.path = path;
    }

    public String getDomain() {
      return domain;
    }

    public void setDomain(String domain) {
      this.domain = domain;
    }
  }
}
