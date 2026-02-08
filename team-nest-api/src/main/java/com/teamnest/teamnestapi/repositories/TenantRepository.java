package com.teamnest.teamnestapi.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.teamnest.teamnestapi.models.Tenant;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, Long> {
  boolean existsByName(String name);
}
