package com.teamnest.teamnestapi.tenant.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.teamnest.teamnestapi.tenant.entity.Tenant;

@Repository
public interface TenantRepository extends JpaRepository<Tenant, UUID> {

  boolean existsByName(String name);
}
