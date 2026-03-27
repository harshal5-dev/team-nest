package com.teamnest.teamnestapi.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "User profile information for updates")
public class UserInfoReqDTO {

    @Schema(description = "User's first name", example = "John",
            requiredMode = Schema.RequiredMode.REQUIRED)
    @NotBlank(message = "First name is required")
    private String firstName;

    @Schema(description = "User's last name", example = "Doe")
    private String lastName;

    @Schema(description = "URL to the user's avatar image",
            example = "https://example.com/avatar.png")
    private String avatar;
}
