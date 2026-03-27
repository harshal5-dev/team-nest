package com.teamnest.teamnestapi.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Request to reset a password using a reset token")
public record ResetPasswordReqDTO(
    @Schema(description = "Password reset token received via email",
        requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank(
            message = "Reset token is required") String token,
    @Schema(description = "New password (8-15 characters)", example = "NewStr0ng!", minLength = 8,
        maxLength = 15, requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank(
            message = "New password is required") @Size(min = 8, max = 15,
                message = "New password must be between 8 and 15 characters") String newPassword) {
}
