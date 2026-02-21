package com.teamnest.teamnestapi.services;

import org.springframework.security.core.Authentication;
import com.teamnest.teamnestapi.dtos.AuthResDto;
import com.teamnest.teamnestapi.dtos.ForgotPasswordReqDto;
import com.teamnest.teamnestapi.dtos.LoginReqDto;
import com.teamnest.teamnestapi.dtos.ResetPasswordReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;

public interface IAuthService {

  AuthResDto login(LoginReqDto loginReqDto);

  void forgotPassword(ForgotPasswordReqDto forgotPasswordReqDto);

  void resetPassword(ResetPasswordReqDto resetPasswordReqDto);

  UserInfoResDto getCurrentUser(Authentication authentication);

  void logout(String refreshToken);

}
