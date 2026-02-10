package com.teamnest.teamnestapi.services;

import java.util.List;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.dtos.AuthResDto;
import com.teamnest.teamnestapi.dtos.LoginReqDto;
import com.teamnest.teamnestapi.dtos.RefreshReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;
import com.teamnest.teamnestapi.models.RefreshToken;
import com.teamnest.teamnestapi.models.User;
import com.teamnest.teamnestapi.security.AppUserDetails;
import com.teamnest.teamnestapi.security.JwtService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final RefreshTokenService refreshTokenService;
  private final IUserService userService;

  public AuthResDto login(LoginReqDto loginReqDto) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword()));

    AppUserDetails userDetails = (AppUserDetails) authentication.getPrincipal();
    User user = userDetails.getUser();

    String accessToken = jwtService.generateAccessToken(user);
    String refreshToken = refreshTokenService.createRefreshToken(user);

    return new AuthResDto(accessToken, refreshToken, "Bearer", jwtService.getAccessTokenTtlSeconds(),
        jwtService.getRefreshTokenTtlSeconds());
  }

  public AuthResDto refresh(RefreshReqDto refreshReqDto) {
    RefreshToken existingToken = refreshTokenService.getValidRefreshToken(
        refreshReqDto.getRefreshToken());

    User user = existingToken.getUser();
    refreshTokenService.revoke(existingToken);

    String accessToken = jwtService.generateAccessToken(user);
    String newRefreshToken = refreshTokenService.createRefreshToken(user);

    return new AuthResDto(accessToken, newRefreshToken, "Bearer", jwtService.getAccessTokenTtlSeconds(),
        jwtService.getRefreshTokenTtlSeconds());
  }

  public UserInfoResDto getCurrentUser(Authentication authentication) {
    User user = userService.getUserByEmail(authentication.getName());
    List<String> roles = user.getRoles().stream()
        .map(role -> role.getName())
        .toList();

    return new UserInfoResDto(user.getId(), user.getName(), user.getEmail(), user.getTenantId(), roles);
  }

  public void logout(String refreshToken) {
    refreshTokenService.revokeIfExists(refreshToken);
  }
}
