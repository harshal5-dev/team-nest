package com.teamnest.teamnestapi.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TenantRegistrationReqDto {

  @Valid
  @NotNull(message = "Owner information is required")
  private OwnerInfoDto ownerInfo;

  @Valid
  @NotNull(message = "Tenant information is required")
  private TenantInfoDto tenantInfo;
}
