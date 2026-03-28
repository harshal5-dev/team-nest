package com.teamnest.teamnestapi.role.mapper;

import java.util.UUID;
import org.springframework.stereotype.Component;
import com.teamnest.teamnestapi.role.dto.RoleReqDTO;
import com.teamnest.teamnestapi.role.dto.RoleResDTO;
import com.teamnest.teamnestapi.role.entity.Role;
import com.teamnest.teamnestapi.tenant.context.TenantContext;

@Component
public class RoleMapper {


  public RoleResDTO toDTO(Role role) {
    RoleResDTO dto = new RoleResDTO();
    dto.setId(role.getId());
    dto.setName(role.getName());
    dto.setCode(role.getCode());
    dto.setDescription(role.getDescription());
    return dto;
  }

  public Role toEntity(RoleReqDTO dto, Role role) {
    UUID tenantId = TenantContext.getTenantId();
    role.setName(dto.getName());
    role.setCode(dto.getCode());
    role.setTenantId(tenantId);
    role.setDescription(dto.getDescription());
    return role;
  }

}
