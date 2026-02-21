package com.teamnest.teamnestapi.mappers;

import java.util.UUID;
import com.teamnest.teamnestapi.dtos.TenantInfoDto;
import com.teamnest.teamnestapi.dtos.TenantRegistrationResDto;
import com.teamnest.teamnestapi.dtos.TenantResDto;
import com.teamnest.teamnestapi.models.Status;
import com.teamnest.teamnestapi.models.Tenant;
import com.teamnest.teamnestapi.models.User;

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
    resDto.setOwnerFirstName(user.getFirstName());
    resDto.setOwnerLastName(user.getLastName());
    return resDto;
  }

  public static TenantResDto toTenantResDto(Tenant tenant) {
    TenantResDto resDto = new TenantResDto();
    resDto.setTenantId(tenant.getTenantId());
    resDto.setName(tenant.getName());
    return resDto;
  }
}
