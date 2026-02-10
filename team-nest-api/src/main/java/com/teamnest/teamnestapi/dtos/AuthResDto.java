package com.teamnest.teamnestapi.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AuthResDto {

  private String accessToken;
  private String refreshToken;
  private String tokenType;
  private long expiresIn;
  private long refreshExpiresIn;
}
