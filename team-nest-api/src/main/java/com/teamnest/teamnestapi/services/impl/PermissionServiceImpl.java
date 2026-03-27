
package com.teamnest.teamnestapi.services.impl;

import java.util.Set;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.teamnest.teamnestapi.common.service.PermissionLookupService;
import com.teamnest.teamnestapi.mappers.PermissionMapper;
import com.teamnest.teamnestapi.models.Permission;
import com.teamnest.teamnestapi.repositories.PermissionRepository;
import com.teamnest.teamnestapi.repositories.PermissionSpecification;
import com.teamnest.teamnestapi.services.PermissionService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PermissionServiceImpl implements PermissionService {
  private final PermissionRepository permissionRepository;
  private final PermissionLookupService permissionLookupService;
  private final PermissionMapper permissionMapper;

  @Override
  public Page<Permission> getPermissions(String name, Pageable pageable) {
    Specification<Permission> spec = PermissionSpecification.buildFilter(name);
    Page<Permission> page = permissionRepository.findAll(spec, pageable);
    return page;
  }

  @Transactional
  @Override
  public void createDefaultPermissionsForTenant() {

    Set<Permission> permissions = permissionLookupService.getAllPermissions().stream()
        .map(permissionMapper::toEntity).collect(Collectors.toSet());
    permissionRepository.saveAll(permissions);
  }
}
