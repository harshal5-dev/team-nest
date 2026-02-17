package com.teamnest.teamnestapi.mappers;

import com.teamnest.teamnestapi.models.Role;
import com.teamnest.teamnestapi.models.RoleScope;

public final class RoleMapper {

  private RoleMapper() {}

  public static Role toDefaultRole(String roleName) {
    Role role = new Role();
    role.setName(roleName);
    role.setScope(RoleScope.PLATFORM);
    return role;
  }

}
