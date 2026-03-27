package com.teamnest.teamnestapi.tenant.mapper;

import org.springframework.stereotype.Component;
import com.teamnest.teamnestapi.tenant.dto.TenantInfoDTO;
import com.teamnest.teamnestapi.tenant.dto.TenantResDTO;
import com.teamnest.teamnestapi.tenant.entity.Tenant;

@Component
public class TenantMapper {

  public Tenant toTenant(TenantInfoDTO tenantInfoDto, Tenant tenant) {
    tenant.setName(tenantInfoDto.getOrganizationName());
    return tenant;
  }

  public TenantResDTO toTenantResDto(Tenant tenant) {
    TenantResDTO resDto = new TenantResDTO();
    resDto.setId(tenant.getId());
    resDto.setName(tenant.getName());
    return resDto;
  }
}
