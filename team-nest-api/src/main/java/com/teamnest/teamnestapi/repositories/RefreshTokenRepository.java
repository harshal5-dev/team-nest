package com.teamnest.teamnestapi.repositories;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import com.teamnest.teamnestapi.models.RefreshToken;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
  Optional<RefreshToken> findByTokenHash(String tokenHash);
}
