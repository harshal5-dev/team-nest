package com.teamnest.teamnestapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Request to initiate a password reset")
public record ForgotPasswordReqDto(@Schema(description = "Email address of the account",
    example = "user@example.com", requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank(
        message = "Email is required") @Email(message = "Email must be valid") String email) {
}
