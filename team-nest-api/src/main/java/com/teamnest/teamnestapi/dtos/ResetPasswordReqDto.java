package com.teamnest.teamnestapi.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordReqDto {

  @NotBlank(message = "Reset token is required")
  private String token;

  @NotBlank(message = "New password is required")
  @Size(min = 8, max = 100, message = "New password must be between 8 and 100 characters")
  private String newPassword;
}
