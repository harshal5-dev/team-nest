package com.teamnest.teamnestapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Request to update the current user's password")
public record UpdatePasswordReqDto(
    @Schema(description = "Current password for verification", example = "OldP@ss123",
        requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank(
            message = "Current password is required") String currentPassword,
    @Schema(description = "New password to set", example = "NewStr0ng!",
        requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank(
            message = "New password is required") String newPassword) {
}
