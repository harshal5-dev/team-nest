package com.teamnest.teamnestapi.services;

import java.util.Optional;
import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.mappers.RoleMapper;
import com.teamnest.teamnestapi.models.Role;
import com.teamnest.teamnestapi.models.Scope;
import com.teamnest.teamnestapi.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleService implements IRoleService {

  private final RoleRepository roleRepository;

  @Override
  public Role getDefaultRole() {
    Optional<Role> defaultRoleOpt =
        roleRepository.findByNameAndScope("PLATFORM_ADMIN", Scope.PLATFORM);

    return defaultRoleOpt.orElseGet(() -> {
      Role defaultRole = RoleMapper.toRole();
      return roleRepository.save(defaultRole);
    });
  }

  @Override
  public Role createRole(Role role) {
    return roleRepository.save(role);
  }

}
