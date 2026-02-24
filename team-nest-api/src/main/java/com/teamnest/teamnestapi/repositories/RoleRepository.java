package com.teamnest.teamnestapi.repositories;

import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.teamnest.teamnestapi.models.Role;
import com.teamnest.teamnestapi.models.RoleScope;

@Repository
public interface RoleRepository extends JpaRepository<Role, UUID> {

  Optional<Role> findByCodeAndScope(String code, RoleScope scope);
}
