package com.teamnest.teamnestapi.role.service.impl;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.exception.ResourceNotFoundException;
import com.teamnest.teamnestapi.role.entity.Role;
import com.teamnest.teamnestapi.role.entity.RoleScope;
import com.teamnest.teamnestapi.role.repository.RoleRepository;
import com.teamnest.teamnestapi.role.service.RoleService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

  @Value("${app.role.default.code}")
  private String defaultRoleCode;

  private final RoleRepository roleRepository;

  @Override
  public Role getDefaultRole() {
    Role defaultRole = roleRepository.findByCodeAndScope(defaultRoleCode, RoleScope.PLATFORM)
        .orElseThrow(() -> new ResourceNotFoundException("Default role not found"));
    return defaultRole;
  }

  @Override
  public Role createRole(Role role) {
    return roleRepository.save(role);
  }

}
