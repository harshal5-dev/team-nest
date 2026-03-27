package com.teamnest.teamnestapi.refreshtoken.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import com.teamnest.teamnestapi.refreshtoken.entity.RefreshToken;
import com.teamnest.teamnestapi.user.entity.User;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, UUID> {
  Optional<RefreshToken> findByTokenHash(String tokenHash);

  List<RefreshToken> findByUserAndRevokedAtIsNull(User user);

}
