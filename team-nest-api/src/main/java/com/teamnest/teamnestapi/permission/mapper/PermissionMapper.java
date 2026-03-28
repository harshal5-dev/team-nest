package com.teamnest.teamnestapi.permission.mapper;

import java.util.UUID;
import org.springframework.stereotype.Component;
import com.teamnest.teamnestapi.common.entity.PermissionLookup;
import com.teamnest.teamnestapi.permission.dto.PermissionResDTO;
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

  public PermissionResDTO toDTO(Permission permission) {
    PermissionResDTO dto = new PermissionResDTO();
    dto.setId(permission.getId());
    dto.setName(permission.getName());
    dto.setCode(permission.getCode());
    dto.setModule(permission.getModuleKey() != null ? permission.getModuleKey().name() : null);
    return dto;
  }

}
