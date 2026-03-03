package com.teamnest.teamnestapi.dtos;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserReqDto {

  @Valid
  @NotNull(message = "User information is required")
  private UserInfoReqDto userInfo;

  @Valid
  @NotNull(message = "Tenant information is required")
  private TenantInfoDto tenantInfo;
}
