package com.teamnest.teamnestapi.dtos;

import jakarta.validation.constraints.NotBlank;

public record UpdatePasswordReqDto(
    @NotBlank(message = "Current password is required") String currentPassword,
    @NotBlank(message = "New password is required") String newPassword) {

}
