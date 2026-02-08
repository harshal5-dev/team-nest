package com.teamnest.teamnestapi.mappers;

import com.teamnest.teamnestapi.models.Role;
import com.teamnest.teamnestapi.models.Scope;

public final class RoleMapper {

  private RoleMapper() {}

  public static Role toRole(String name) {
    Role role = new Role();
    role.setName(name);
    role.setScope(Scope.PLATFORM);
    return role;
  }

}
