package com.teamnest.teamnestapi.services.impl;

import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.contexts.TenantContext;
import com.teamnest.teamnestapi.mappers.PermissionMapper;
import com.teamnest.teamnestapi.models.Permission;
import com.teamnest.teamnestapi.repositories.PermissionRepository;
import com.teamnest.teamnestapi.services.IPermissionLookupService;
import com.teamnest.teamnestapi.services.IPermissionService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PermissionService implements IPermissionService {

  private final PermissionRepository permissionRepository;
  private final IPermissionLookupService permissionLookupService;

  @Transactional
  @Override
  public void createDefaultPermissionsForTenant() {
    UUID tenantId = TenantContext.getTenantId();

    Set<Permission> permissions = permissionLookupService.getAllPermissions().stream()
        .map(lookup -> PermissionMapper.toPermission(lookup, tenantId)).collect(Collectors.toSet());
    permissionRepository.saveAll(permissions);
  }

}
