package com.teamnest.teamnestapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Request to update user profile and tenant information")
public class UpdateUserReqDto {

  @Schema(description = "Updated user profile information",
      requiredMode = Schema.RequiredMode.REQUIRED)
  @Valid
  @NotNull(message = "User information is required")
  private UserInfoReqDto userInfo;

  @Schema(description = "Updated tenant/organization information",
      requiredMode = Schema.RequiredMode.REQUIRED)
  @Valid


  @NotNull(message = "Tenant information is required")
  private TenantInfoDto tenantInfo;
}
