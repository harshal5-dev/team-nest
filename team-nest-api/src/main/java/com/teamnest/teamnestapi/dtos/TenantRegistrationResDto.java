package com.teamnest.teamnestapi.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TenantRegistrationResDto {
  private long tenantId;
  private String organizationName;
  private long ownerId;
  private String ownerName;
  private String ownerEmail;
}
