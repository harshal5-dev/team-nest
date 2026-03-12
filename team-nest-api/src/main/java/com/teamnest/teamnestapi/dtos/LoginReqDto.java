package com.teamnest.teamnestapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "User login credentials")
public record LoginReqDto(
    @Schema(description = "User email address", example = "user@example.com",
        requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank(
            message = "Email is required") @Email(message = "Email must be valid") String email,
    @Schema(description = "User password", example = "StrongP@ss1",
        requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank(
            message = "Password is required") String password) {
}
