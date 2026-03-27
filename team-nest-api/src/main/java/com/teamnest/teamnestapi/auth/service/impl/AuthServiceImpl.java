package com.teamnest.teamnestapi.auth.service.impl;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.time.Duration;
import java.time.Instant;
import java.util.Base64;
import java.util.HexFormat;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.teamnest.teamnestapi.auth.dto.AuthResDTO;
import com.teamnest.teamnestapi.auth.dto.LoginReqDTO;
import com.teamnest.teamnestapi.auth.service.AuthService;
import com.teamnest.teamnestapi.common.enums.Status;
import com.teamnest.teamnestapi.common.service.EmailService;
import com.teamnest.teamnestapi.refreshtoken.dto.RefreshReqDTO;
import com.teamnest.teamnestapi.refreshtoken.entity.RefreshToken;
import com.teamnest.teamnestapi.refreshtoken.service.RefreshTokenService;
import com.teamnest.teamnestapi.repositories.PasswordResetTokenRepository;
import com.teamnest.teamnestapi.security.dto.UserDetailsDTO;
import com.teamnest.teamnestapi.security.service.JwtService;
import com.teamnest.teamnestapi.tenant.dto.TenantResDTO;
import com.teamnest.teamnestapi.tenant.mapper.TenantMapper;
import com.teamnest.teamnestapi.tenant.service.TenantService;
import com.teamnest.teamnestapi.user.dto.ForgotPasswordReqDTO;
import com.teamnest.teamnestapi.user.dto.ResetPasswordReqDTO;
import com.teamnest.teamnestapi.user.dto.UpdatePasswordReqDTO;
import com.teamnest.teamnestapi.user.dto.UserInfoReqDTO;
import com.teamnest.teamnestapi.user.dto.UserInfoResDTO;
import com.teamnest.teamnestapi.user.entity.PasswordResetToken;
import com.teamnest.teamnestapi.user.entity.User;
import com.teamnest.teamnestapi.user.mapper.UserMapper;
import com.teamnest.teamnestapi.user.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

  private static final SecureRandom SECURE_RANDOM = new SecureRandom();

  @Value("${app.auth.password-reset-token-expiration-minutes}")
  private long passwordResetTokenExpirationMinutes;

  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final UserService userService;
  private final PasswordResetTokenRepository passwordResetTokenRepository;
  private final PasswordEncoder passwordEncoder;
  private final EmailService emailService;
  private final TenantService tenantService;
  private final RefreshTokenService refreshTokenService;
  private final TenantMapper tenantMapper;
  private final UserMapper userMapper;

  @Override
  public AuthResDTO login(LoginReqDTO loginReqDTO) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginReqDTO.email(), loginReqDTO.password()));

    UserDetailsDTO userDetails = (UserDetailsDTO) authentication.getPrincipal();
    assert userDetails != null;
    User user = userDetails.getUser();

    String accessToken = jwtService.generateAccessToken(user);
    String refreshToken = refreshTokenService.createRefreshToken(user);

    return new AuthResDTO(accessToken, refreshToken, "Bearer",
        jwtService.getAccessTokenTtlSeconds(), jwtService.getRefreshTokenTtlSeconds());
  }

  @Transactional
  @Override
  public AuthResDTO refresh(RefreshReqDTO refreshReqDto) {
    RefreshToken existingToken =
        refreshTokenService.getValidRefreshToken(refreshReqDto.refreshToken());

    User user = existingToken.getUser();

    String accessToken = jwtService.generateAccessToken(user);
    String newRefreshToken = refreshTokenService.updateRefreshToken(existingToken);

    return new AuthResDTO(accessToken, newRefreshToken, "Bearer",
        jwtService.getAccessTokenTtlSeconds(), jwtService.getRefreshTokenTtlSeconds());
  }


  @Transactional
  @Override
  public void forgotPassword(ForgotPasswordReqDTO forgotPasswordReqDto) {
    User user = userService.getUserByEmail(forgotPasswordReqDto.email());
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
  public void resetPassword(ResetPasswordReqDTO resetPasswordReqDto) {
    PasswordResetToken passwordResetToken =
        passwordResetTokenRepository.findByTokenHash(hashToken(resetPasswordReqDto.token()))
            .orElseThrow(() -> new IllegalStateException("Reset token is invalid or expired"));

    Instant now = Instant.now();
    if (passwordResetToken.getUsedAt() != null || passwordResetToken.getExpiresAt().isBefore(now)) {
      throw new IllegalStateException("Reset token is invalid or expired");
    }

    User user = passwordResetToken.getUser();
    if (user.getStatus() != Status.ACTIVE) {
      throw new IllegalStateException("User account is inactive");
    }

    user.setPassword(passwordEncoder.encode(resetPasswordReqDto.newPassword()));
    userService.save(user);
    passwordResetTokenRepository.markAllUnusedTokensAsUsedByUserId(user.getId(), now);
  }

  @Override
  public UserInfoResDTO getCurrentUser(Authentication authentication) {
    User user = userService.getUserByEmail(authentication.getName());
    UserInfoResDTO userInfoResDto = userMapper.toUserInfoResDto(user);
    TenantResDTO tenantResDto =
        tenantMapper.toTenantResDto(tenantService.getTenantByTenantId(user.getTenantId()));
    userInfoResDto.setTenant(tenantResDto);

    return userInfoResDto;
  }

  @Override
  public void logout(String refreshToken) {
    refreshTokenService.revokeIfExists(refreshToken);
  }


  @Transactional
  @Override
  public UserInfoResDTO updateUserInfo(UserInfoReqDTO userInfoReqDto,
      Authentication authentication) {
    User user = userService.getUserByEmail(authentication.getName());
    userMapper.toUser(userInfoReqDto, user);

    userService.save(user);
    return userMapper.toUserInfoResDto(user);
  }

  @Transactional
  @Override
  public void updatePassword(UpdatePasswordReqDTO updatePasswordReqDto,
      Authentication authentication) {
    User user = userService.getUserByEmail(authentication.getName());
    if (!passwordEncoder.matches(updatePasswordReqDto.currentPassword(), user.getPassword())) {
      throw new IllegalArgumentException("Current password is incorrect");
    }
    user.setPassword(passwordEncoder.encode(updatePasswordReqDto.newPassword()));
    userService.save(user);
  }

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
