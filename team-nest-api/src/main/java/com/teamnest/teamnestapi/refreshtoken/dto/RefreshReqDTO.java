package com.teamnest.teamnestapi.refreshtoken.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Request to refresh an access token")
public record RefreshReqDTO(@Schema(description = "The refresh token",
    example = "dGhpcyBpcyBhIHJlZnJlc2g...", requiredMode = Schema.RequiredMode.REQUIRED) @NotBlank(
        message = "Refresh token is required") String refreshToken) {
}
