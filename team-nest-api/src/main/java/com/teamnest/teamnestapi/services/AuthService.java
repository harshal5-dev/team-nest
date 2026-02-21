package com.teamnest.teamnestapi.services;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.HexFormat;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.teamnest.teamnestapi.dtos.AuthResDto;
import com.teamnest.teamnestapi.dtos.ForgotPasswordReqDto;
import com.teamnest.teamnestapi.dtos.LoginReqDto;
import com.teamnest.teamnestapi.dtos.ResetPasswordReqDto;
import com.teamnest.teamnestapi.dtos.TenantResDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;
import com.teamnest.teamnestapi.mappers.TenantMapper;
import com.teamnest.teamnestapi.mappers.UserMapper;
import com.teamnest.teamnestapi.models.PasswordResetToken;
import com.teamnest.teamnestapi.models.Status;
import com.teamnest.teamnestapi.models.User;
import com.teamnest.teamnestapi.repositories.PasswordResetTokenRepository;
import com.teamnest.teamnestapi.repositories.UserRepository;
import com.teamnest.teamnestapi.security.AppUserDetails;
import com.teamnest.teamnestapi.security.JwtService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

  private static final SecureRandom SECURE_RANDOM = new SecureRandom();

  @Value("${app.auth.password-reset-token-expiration-minutes:15}")
  private long passwordResetTokenExpirationMinutes;

  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final IUserService userService;
  private final UserRepository userRepository;
  private final PasswordResetTokenRepository passwordResetTokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final IEmailService emailService;
  private final ITenantService tenantService;

  @Override
  public AuthResDto login(LoginReqDto loginReqDto) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword()));

    AppUserDetails userDetails = (AppUserDetails) authentication.getPrincipal();
    User user = userDetails.getUser();

    String accessToken = jwtService.generateAccessToken(user);

    return new AuthResDto(accessToken, "Bearer", jwtService.getAccessTokenTtlSeconds());
  }

  @Transactional
  @Override
  public void forgotPassword(ForgotPasswordReqDto forgotPasswordReqDto) {
    Optional<User> userOptional = userRepository.findByEmail(forgotPasswordReqDto.getEmail());
    if (userOptional.isEmpty()) {
      return;
    }

    User user = userOptional.get();
    if (user.getStatus() != Status.ACTIVE) {
      return;
    }

    Instant now = Instant.now();
    passwordResetTokenRepository.markAllUnusedTokensAsUsedByUserId(user.getId(), now);

    String rawToken = generateSecureToken();
    PasswordResetToken passwordResetToken = new PasswordResetToken();
    passwordResetToken.setUser(user);
    passwordResetToken.setTokenHash(hashToken(rawToken));
    passwordResetToken
        .setExpiresAt(now.plus(Duration.ofMinutes(passwordResetTokenExpirationMinutes)));
    passwordResetTokenRepository.save(passwordResetToken);

    emailService.sendPasswordResetEmail(user.getEmail(), user.getFirstName(), rawToken);
  }

  @Transactional
  @Override
  public void resetPassword(ResetPasswordReqDto resetPasswordReqDto) {
    PasswordResetToken passwordResetToken =
        passwordResetTokenRepository.findByTokenHash(hashToken(resetPasswordReqDto.getToken()))
            .orElseThrow(() -> new IllegalStateException("Reset token is invalid or expired"));

    Instant now = Instant.now();
    if (passwordResetToken.getUsedAt() != null || passwordResetToken.getExpiresAt().isBefore(now)) {
      throw new IllegalStateException("Reset token is invalid or expired");
    }

    User user = passwordResetToken.getUser();
    if (user.getStatus() != Status.ACTIVE) {
      throw new IllegalStateException("User account is inactive");
    }

    user.setPassword(passwordEncoder.encode(resetPasswordReqDto.getNewPassword()));
    userRepository.save(user);
    passwordResetTokenRepository.markAllUnusedTokensAsUsedByUserId(user.getId(), now);
  }

  @Override
  public UserInfoResDto getCurrentUser(Authentication authentication) {
    User user = userService.getUserByEmail(authentication.getName());
    UserInfoResDto userInfoResDto = UserMapper.toUserInfoResDto(user);
    TenantResDto tenantResDto =
        TenantMapper.toTenantResDto(tenantService.getTenantByTenantId(user.getTenantId()));
    userInfoResDto.setTenant(tenantResDto);

    return userInfoResDto;
  }

  @Override
  public void logout(String refreshToken) {}

  private String generateSecureToken() {
    byte[] tokenBytes = new byte[32];
    SECURE_RANDOM.nextBytes(tokenBytes);
    return Base64.getUrlEncoder().withoutPadding().encodeToString(tokenBytes);
  }

  private String hashToken(String token) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));
      return HexFormat.of().formatHex(hash);
    } catch (NoSuchAlgorithmException exception) {
      throw new IllegalStateException("Failed to process reset token", exception);
    }
  }
}
