package com.teamnest.teamnestapi.services;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.dtos.AuthResDto;
import com.teamnest.teamnestapi.dtos.LoginReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;
import com.teamnest.teamnestapi.mappers.UserMapper;
import com.teamnest.teamnestapi.models.User;
import com.teamnest.teamnestapi.security.AppUserDetails;
import com.teamnest.teamnestapi.security.JwtService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService implements IAuthService {

  private final AuthenticationManager authenticationManager;
  private final JwtService jwtService;
  private final IUserService userService;

  @Override
  public AuthResDto login(LoginReqDto loginReqDto) {
    Authentication authentication = authenticationManager.authenticate(
        new UsernamePasswordAuthenticationToken(loginReqDto.getEmail(), loginReqDto.getPassword()));

    AppUserDetails userDetails = (AppUserDetails) authentication.getPrincipal();
    User user = userDetails.getUser();

    String accessToken = jwtService.generateAccessToken(user);

    return new AuthResDto(accessToken, "Bearer", jwtService.getAccessTokenTtlSeconds());
  }

  @Override
  public UserInfoResDto getCurrentUser(Authentication authentication) {
    User user = userService.getUserByEmail(authentication.getName());

    return UserMapper.toUserInfoResDto(user);
  }

  @Override
  public void logout(String refreshToken) {}

}
