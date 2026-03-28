package com.teamnest.teamnestapi.role.repository;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import com.teamnest.teamnestapi.role.entity.Role;
import com.teamnest.teamnestapi.role.entity.RoleScope;

@Repository
public interface RoleRepository extends JpaRepository<Role, UUID>, JpaSpecificationExecutor<Role> {

  Optional<Role> findByCodeAndScope(String code, RoleScope scope);
}
