package com.teamnest.teamnestapi.common.dto;

import java.util.UUID;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Response after successful tenant registration")
public class TenantRegistrationResDto {

  @Schema(description = "Unique tenant identifier",
      example = "550e8400-e29b-41d4-a716-446655440000")
  private UUID tenantId;

  @Schema(description = "Organization name", example = "Acme Corp")
  private String organizationName;

  @Schema(description = "Owner user identifier", example = "660e8400-e29b-41d4-a716-446655440001")
  private UUID ownerId;

  @Schema(description = "Owner's first name", example = "John")
  private String ownerFirstName;

  @Schema(description = "Owner's last name", example = "Doe")
  private String ownerLastName;

  @Schema(description = "Owner's email address", example = "john.doe@example.com")
  private String ownerEmail;
}
