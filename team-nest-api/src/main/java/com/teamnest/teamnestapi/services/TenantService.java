package com.teamnest.teamnestapi.services;

import com.teamnest.teamnestapi.exceptions.TenantNameAlreadyExistsException;
import com.teamnest.teamnestapi.models.Tenant;
import com.teamnest.teamnestapi.repositories.TenantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TenantService implements ITenantService {

  private final TenantRepository tenantRepository;

  @Override
  public Tenant createTenant(Tenant tenant) {
    if (tenantRepository.existsByName(tenant.getName())) {
      throw new TenantNameAlreadyExistsException("Tenant name '" + tenant.getName() + "' already exists.");
    }

    return tenantRepository.save(tenant);
  }

}
