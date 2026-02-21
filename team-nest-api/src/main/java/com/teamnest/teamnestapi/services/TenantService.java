package com.teamnest.teamnestapi.services;

import java.util.UUID;
import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.exceptions.ResourceNotFoundException;
import com.teamnest.teamnestapi.exceptions.TenantNameAlreadyExistsException;
import com.teamnest.teamnestapi.models.Tenant;
import com.teamnest.teamnestapi.repositories.TenantRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TenantService implements ITenantService {

  private final TenantRepository tenantRepository;

  @Override
  public Tenant createTenant(Tenant tenant) {
    if (tenantRepository.existsByName(tenant.getName())) {
      throw new TenantNameAlreadyExistsException(
          "Tenant name '" + tenant.getName() + "' already exists.");
    }

    return tenantRepository.save(tenant);
  }

  @Override
  public Tenant getTenantByTenantId(UUID tenantId) {
    return tenantRepository.findByTenantId(tenantId).orElseThrow(
        () -> new ResourceNotFoundException("Tenant with ID '" + tenantId + "' not found."));
  }

}
