package com.teamnest.teamnestapi.dtos;

import jakarta.validation.constraints.NotBlank;

public record RefreshReqDto(@NotBlank(message = "Refresh token is required") String refreshToken) {

}
