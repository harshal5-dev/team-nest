package com.teamnest.teamnestapi.tenant.mapper;

import com.teamnest.teamnestapi.common.dto.TenantRegistrationResDto;
import com.teamnest.teamnestapi.models.User;
import com.teamnest.teamnestapi.tenant.dto.TenantInfoDto;
import com.teamnest.teamnestapi.tenant.dto.TenantResDto;
import com.teamnest.teamnestapi.tenant.entity.Tenant;

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
