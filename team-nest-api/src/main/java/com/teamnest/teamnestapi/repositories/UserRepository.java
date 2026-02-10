package com.teamnest.teamnestapi.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.stereotype.Repository;
import com.teamnest.teamnestapi.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
  boolean existsByEmail(String email);

  @EntityGraph(attributePaths = "roles")
  Optional<User> findByEmail(String email);
}
