package com.teamnest.teamnestapi.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ResetPasswordReqDto(@NotBlank(message = "Reset token is required") String token,
    @NotBlank(message = "New password is required") @Size(min = 8, max = 15,
        message = "New password must be between 8 and 15 characters") String newPassword) {
}
