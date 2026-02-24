package com.teamnest.teamnestapi.dtos;

import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TenantRegistrationResDto {
  private UUID tenantId;
  private String organizationName;
  private UUID ownerId;
  private String ownerFirstName;
  private String ownerLastName;
  private String ownerEmail;
}
