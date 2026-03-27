package com.teamnest.teamnestapi.role.service;

import com.teamnest.teamnestapi.role.entity.Role;

public interface RoleService {

  Role getDefaultRole();

  Role createRole(Role role);
}
