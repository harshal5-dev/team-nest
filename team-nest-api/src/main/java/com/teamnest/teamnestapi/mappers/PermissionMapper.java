package com.teamnest.teamnestapi.mappers;

import java.util.UUID;

import com.teamnest.teamnestapi.contexts.TenantContext;
import org.springframework.stereotype.Component;

import com.teamnest.teamnestapi.models.Permission;
import com.teamnest.teamnestapi.models.PermissionLookup;

@Component
public class PermissionMapper {

  public Permission toEntity(PermissionLookup lookup) {
    UUID tenantId = TenantContext.getTenantId();

    Permission permission = new Permission();
    permission.setName(lookup.getName());
    permission.setCode(lookup.getKey());
    permission.setModuleKey(lookup.getModuleKey());
    permission.setTenantId(tenantId);
    return permission;
  }

}
