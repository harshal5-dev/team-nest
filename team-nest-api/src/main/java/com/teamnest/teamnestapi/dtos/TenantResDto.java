package com.teamnest.teamnestapi.dtos;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TenantResDto {
  private UUID tenantId;
  private String name;
}
