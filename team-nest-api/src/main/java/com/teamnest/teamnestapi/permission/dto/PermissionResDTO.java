package com.teamnest.teamnestapi.permission.dto;

import java.util.UUID;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Response DTO for permission details")
public class PermissionResDTO {

  @Schema(description = "Unique identifier of the permission",
      example = "550e8400-e29b-41d4-a716-446655440000")
  private UUID id;

  @Schema(description = "Name of the permission", example = "Create User")
  private String name;

  @Schema(description = "Code of the permission", example = "CREATE_USER")
  private String code;

  @Schema(description = "Module to which the permission belongs", example = "User")
  private String module;

}
