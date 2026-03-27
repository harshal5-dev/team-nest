package com.teamnest.teamnestapi.dtos;

import java.util.List;
import java.util.UUID;
import com.teamnest.teamnestapi.tenant.dto.TenantResDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "User profile information response")
public class UserInfoResDto {

  @Schema(description = "User identifier", example = "660e8400-e29b-41d4-a716-446655440001")
  private UUID id;

  @Schema(description = "User's first name", example = "John")
  private String firstName;

  @Schema(description = "User's last name", example = "Doe")
  private String lastName;

  @Schema(description = "URL to the user's avatar image",
      example = "https://example.com/avatar.png")
  private String avatar;

  @Schema(description = "User's email address", example = "john.doe@example.com")
  private String email;

  @Schema(description = "Tenant/organization the user belongs to")
  private TenantResDto tenant;

  @Schema(description = "List of role names assigned to the user", example = "[\"PLATFORM_ADMIN\"]")
  private List<String> roles;
}
