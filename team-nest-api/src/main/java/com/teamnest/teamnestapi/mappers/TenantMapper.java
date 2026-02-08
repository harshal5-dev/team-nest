package com.teamnest.teamnestapi.mappers;

import com.teamnest.teamnestapi.dtos.TenantInfoDto;
import com.teamnest.teamnestapi.dtos.TenantRegistrationResDto;
import com.teamnest.teamnestapi.models.Status;
import com.teamnest.teamnestapi.models.Tenant;
import com.teamnest.teamnestapi.models.User;

import java.util.UUID;

public final class TenantMapper {

  private TenantMapper() {}

  public static Tenant toTenant(TenantInfoDto tenantInfoDto) {
    Tenant tenant = new Tenant();
    tenant.setName(tenantInfoDto.getOrganizationName());
    tenant.setTenantId(UUID.randomUUID());
    tenant.setStatus(Status.ACTIVE);
    return tenant;
  }

  public static TenantRegistrationResDto toTenantRegistrationResDto(Tenant tenant, User user) {
    TenantRegistrationResDto resDto = new TenantRegistrationResDto();
    resDto.setTenantId(tenant.getId());
    resDto.setOrganizationName(tenant.getName());
    resDto.setOwnerEmail(user.getEmail());
    resDto.setOwnerId(user.getId());
    resDto.setOwnerName(user.getName());
    return resDto;
  }
}
