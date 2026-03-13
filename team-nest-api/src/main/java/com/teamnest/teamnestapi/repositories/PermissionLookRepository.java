package com.teamnest.teamnestapi.repositories;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.teamnest.teamnestapi.models.PermissionLookup;

public interface PermissionLookRepository extends JpaRepository<PermissionLookup, UUID> {

}
