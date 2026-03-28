package com.teamnest.teamnestapi.role.dto;

import java.util.UUID;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Response DTO for role details")
public class RoleResDTO {

  @Schema(description = "Unique identifier of the role",
      example = "550e8400-e29b-41d4-a716-446655440000")
  private UUID id;

  @Schema(description = "Name of the role", example = "Administrator")
  private String name;

  @Schema(description = "Code of the role", example = "ADMIN")
  private String code;

  @Schema(description = "Description of the role", example = "Full access to all features")
  private String description;

}
