package com.teamnest.teamnestapi.tenant.service.impl;

import java.util.UUID;
import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.exceptions.ResourceNotFoundException;
import com.teamnest.teamnestapi.tenant.dto.TenantInfoDTO;
import com.teamnest.teamnestapi.tenant.entity.Tenant;
import com.teamnest.teamnestapi.tenant.exception.TenantNameAlreadyExistsException;
import com.teamnest.teamnestapi.tenant.mapper.TenantMapper;
import com.teamnest.teamnestapi.tenant.repository.TenantRepository;
import com.teamnest.teamnestapi.tenant.service.TenantService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TenantServiceImpl implements TenantService {

  private final TenantRepository tenantRepository;
  private final TenantMapper tenantMapper;

  @Override
  public Tenant createTenant(Tenant tenant) {
    if (tenantRepository.existsByName(tenant.getName())) {
      throw new TenantNameAlreadyExistsException(tenant.getName());
    }

    return tenantRepository.save(tenant);
  }

  @Override
  public Tenant getTenantByTenantId(UUID tenantId) {
    return tenantRepository.findById(tenantId).orElseThrow(
        () -> new ResourceNotFoundException("Tenant with ID '" + tenantId + "' not found."));
  }

  @Override
  public Tenant save(Tenant tenant) {
    return tenantRepository.save(tenant);
  }

  @Override
  public Tenant updateTenant(UUID tenantId, TenantInfoDTO tenantInfoDto) {
    Tenant tenant = getTenantByTenantId(tenantId);
    tenantMapper.toTenant(tenantInfoDto, tenant);
    return tenantRepository.save(tenant);
  }
}
