package com.teamnest.teamnestapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Tenant/organization information")
public class TenantInfoDto {

  @Schema(description = "Name of the organization", example = "Acme Corp",
      requiredMode = Schema.RequiredMode.REQUIRED)
  @NotBlank(message = "Organization name is required")
  private String organizationName;
}
