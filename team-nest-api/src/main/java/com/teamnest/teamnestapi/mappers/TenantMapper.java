package com.teamnest.teamnestapi.mappers;

import com.teamnest.teamnestapi.dtos.TenantInfoDto;
import com.teamnest.teamnestapi.dtos.TenantRegistrationResDto;
import com.teamnest.teamnestapi.dtos.TenantResDto;
import com.teamnest.teamnestapi.models.Tenant;
import com.teamnest.teamnestapi.models.User;

public final class TenantMapper {

  private TenantMapper() {}

  public static Tenant toTenant(TenantInfoDto tenantInfoDto, Tenant tenant) {
    tenant.setName(tenantInfoDto.getOrganizationName());
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
    resDto.setId(tenant.getId());
    resDto.setName(tenant.getName());
    return resDto;
  }
}
