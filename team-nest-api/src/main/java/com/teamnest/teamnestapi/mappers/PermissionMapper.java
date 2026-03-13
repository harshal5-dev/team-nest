package com.teamnest.teamnestapi.mappers;

import java.util.UUID;
import com.teamnest.teamnestapi.models.Permission;
import com.teamnest.teamnestapi.models.PermissionLookup;

public final class PermissionMapper {

  private PermissionMapper() {}

  public static Permission toPermission(PermissionLookup lookup, UUID tenantId) {
    Permission permission = new Permission();
    permission.setName(lookup.getName());
    permission.setCode(lookup.getKey());
    permission.setTenantId(tenantId);
    return permission;
  }

}
