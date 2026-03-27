package com.teamnest.teamnestapi.permission.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.teamnest.teamnestapi.permission.entity.Permission;

public interface PermissionService {
  void createDefaultPermissionsForTenant();

  Page<Permission> getPermissions(String name, Pageable pageable);
}
