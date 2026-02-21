package com.teamnest.teamnestapi.services;

import java.util.UUID;
import com.teamnest.teamnestapi.models.Tenant;

public interface ITenantService {

  Tenant getTenantByTenantId(UUID tenantId);

  Tenant createTenant(Tenant tenant);
}
