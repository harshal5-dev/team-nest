package com.teamnest.teamnestapi.common.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.teamnest.teamnestapi.common.entity.PermissionLookup;

public interface PermissionLookRepository extends JpaRepository<PermissionLookup, UUID> {

}
