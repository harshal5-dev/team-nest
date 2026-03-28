package com.teamnest.teamnestapi.role.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import com.teamnest.teamnestapi.role.dto.RoleReqDTO;
import com.teamnest.teamnestapi.role.entity.Role;

public interface RoleService {

  Page<Role> getRoles(String name, Pageable pageable);

  Role getDefaultRole();

  Role create(RoleReqDTO roleReqDTO);
}
