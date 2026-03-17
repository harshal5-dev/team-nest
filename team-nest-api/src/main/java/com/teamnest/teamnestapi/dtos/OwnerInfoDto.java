package com.teamnest.teamnestapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Owner/admin user details for tenant registration")
public class OwnerInfoDto {

  @Schema(description = "Owner's first name", example = "John",
      requiredMode = Schema.RequiredMode.REQUIRED)
  @NotBlank(message = "First name is required")
  private String firstName;

  @Schema(description = "Owner's last name", example = "Doe")
  private String lastName;

  @Schema(description = "Owner's email address", example = "john.doe@example.com",
      requiredMode = Schema.RequiredMode.REQUIRED)
  @Email(message = "Invalid email format")
  @NotBlank(message = "Email is required")
  private String email;

  @Schema(description = "Owner's password", example = "StrongP@ss1",
      requiredMode = Schema.RequiredMode.REQUIRED)
  @NotBlank(message = "Password is required")
  private String password;

  @Schema(description = "URL to the owner's avatar image",
      example = "https://example.com/avatar.png")
  private String avatar;
}
