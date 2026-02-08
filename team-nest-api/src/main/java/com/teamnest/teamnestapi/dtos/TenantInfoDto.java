package com.teamnest.teamnestapi.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TenantInfoDto {

  @NotBlank(message = "Organization name is required")
  private String organizationName;
}
