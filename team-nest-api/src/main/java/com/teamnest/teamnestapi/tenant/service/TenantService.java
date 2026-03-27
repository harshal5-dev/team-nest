package com.teamnest.teamnestapi.tenant.service;

import java.util.UUID;
import com.teamnest.teamnestapi.tenant.dto.TenantInfoDto;
import com.teamnest.teamnestapi.tenant.entity.Tenant;

public interface TenantService {

  Tenant getTenantByTenantId(UUID tenantId);

  Tenant createTenant(Tenant tenant);

  Tenant save(Tenant tenant);

  Tenant updateTenant(UUID tenantId, TenantInfoDto tenantInfoDto);
}
