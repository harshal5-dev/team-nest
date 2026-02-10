package com.teamnest.teamnestapi.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RefreshReqDto {

  @NotBlank(message = "Refresh token is required")
  private String refreshToken;
}
