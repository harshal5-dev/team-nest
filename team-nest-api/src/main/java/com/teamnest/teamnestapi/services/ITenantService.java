package com.teamnest.teamnestapi.services;

import com.teamnest.teamnestapi.models.Tenant;

public interface ITenantService {
  Tenant createTenant(Tenant tenant);
}
