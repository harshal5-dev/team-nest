package com.teamnest.teamnestapi.services;

import com.teamnest.teamnestapi.models.Role;

public interface IRoleService {

  Role getDefaultRole();

  Role createRole(Role role);
}
