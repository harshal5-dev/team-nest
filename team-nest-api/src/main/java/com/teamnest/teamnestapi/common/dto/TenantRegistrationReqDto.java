package com.teamnest.teamnestapi.common.dto;

import com.teamnest.teamnestapi.dtos.OwnerInfoDto;
import com.teamnest.teamnestapi.tenant.dto.TenantInfoDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Request to register a new tenant with an owner account")
public class TenantRegistrationReqDto {

  @Schema(description = "Owner/admin user details", requiredMode = Schema.RequiredMode.REQUIRED)
  @Valid
  @NotNull(message = "Owner information is required")
  private OwnerInfoDto ownerInfo;

  @Schema(description = "Tenant organization details", requiredMode = Schema.RequiredMode.REQUIRED)
  @Valid
  @NotNull(message = "Tenant information is required")
  private TenantInfoDTO tenantInfo;
}
