package com.teamnest.teamnestapi.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.teamnest.teamnestapi.models.Permission;

public interface PermissionService {
  void createDefaultPermissionsForTenant();

  Page<Permission> getPermissions(String name, Pageable pageable);
}
