package com.teamnest.teamnestapi.role.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Request DTO for creating or updating a role")
public class RoleReqDTO {

  @Schema(description = "Name of the role", example = "Administrator",
      requiredMode = Schema.RequiredMode.REQUIRED)
  private String name;

  @Schema(description = "Code of the role", example = "ADMIN",
      requiredMode = Schema.RequiredMode.REQUIRED)
  private String code;

  @Schema(description = "Description of the role", example = "Full access to all features")
  private String description;

}
