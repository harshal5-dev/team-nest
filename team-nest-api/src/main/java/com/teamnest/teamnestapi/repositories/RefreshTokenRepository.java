package com.teamnest.teamnestapi.repositories;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.teamnest.teamnestapi.models.RefreshToken;
import com.teamnest.teamnestapi.models.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
  Optional<RefreshToken> findByTokenHash(String tokenHash);

  List<RefreshToken> findByUserAndRevokedAtIsNull(User user);

}
