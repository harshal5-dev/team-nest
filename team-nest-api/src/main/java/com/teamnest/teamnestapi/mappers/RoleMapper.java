package com.teamnest.teamnestapi.mappers;

import com.teamnest.teamnestapi.models.Role;
import com.teamnest.teamnestapi.models.Scope;

public final class RoleMapper {

  private RoleMapper() {}

  public static Role toRole() {
    Role role = new Role();
    role.setName("PLATFORM_ADMIN");
    role.setScope(Scope.PLATFORM);
    return role;
  }

}
