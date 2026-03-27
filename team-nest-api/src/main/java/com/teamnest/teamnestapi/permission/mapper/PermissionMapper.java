package com.teamnest.teamnestapi.permission.mapper;

import java.util.UUID;
import org.springframework.stereotype.Component;
import com.teamnest.teamnestapi.common.entity.PermissionLookup;
import com.teamnest.teamnestapi.permission.entity.Permission;
import com.teamnest.teamnestapi.tenant.context.TenantContext;

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
