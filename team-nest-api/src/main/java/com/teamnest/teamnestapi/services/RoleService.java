package com.teamnest.teamnestapi.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.exceptions.ResourceNotFoundException;
import com.teamnest.teamnestapi.models.Role;
import com.teamnest.teamnestapi.models.RoleScope;
import com.teamnest.teamnestapi.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {

  @Value("${app.role.default.code}")
  private String defaultRoleCode;

  private final RoleRepository roleRepository;

  @Override
  public Role getDefaultRole() {
    return roleRepository.findByCodeAndScope(defaultRoleCode, RoleScope.PLATFORM)
        .orElseThrow(() -> new ResourceNotFoundException("Default role not found"));
  }

  @Override
  public Role createRole(Role role) {
    return roleRepository.save(role);
  }

}
