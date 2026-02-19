package com.teamnest.teamnestapi.services;

import org.springframework.security.core.Authentication;
import com.teamnest.teamnestapi.dtos.AuthResDto;
import com.teamnest.teamnestapi.dtos.LoginReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;

public interface IAuthService {

  AuthResDto login(LoginReqDto loginReqDto);

  UserInfoResDto getCurrentUser(Authentication authentication);

  void logout(String refreshToken);

}
