package com.teamnest.teamnestapi.permission.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.teamnest.teamnestapi.permission.entity.Permission;

public interface PermissionRepository
    extends JpaRepository<Permission, UUID>, JpaSpecificationExecutor<Permission> {
}
