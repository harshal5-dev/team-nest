package com.teamnest.teamnestapi.tenant.dto;

import java.util.UUID;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Tenant information")
public class TenantResDto {

  @Schema(description = "Tenant identifier", example = "550e8400-e29b-41d4-a716-446655440000")
  private UUID id;

  @Schema(description = "Tenant/organization name", example = "Acme Corp")
  private String name;
}
