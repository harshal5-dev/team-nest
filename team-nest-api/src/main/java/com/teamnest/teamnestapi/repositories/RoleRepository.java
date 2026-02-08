package com.teamnest.teamnestapi.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.teamnest.teamnestapi.models.Role;
import com.teamnest.teamnestapi.models.Scope;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

  Optional<Role> findByNameAndScope(String name, Scope scope);
}
