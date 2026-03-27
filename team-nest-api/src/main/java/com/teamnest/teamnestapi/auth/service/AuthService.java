package com.teamnest.teamnestapi.auth.service;

import org.springframework.security.core.Authentication;
import com.teamnest.teamnestapi.auth.dto.AuthResDto;
import com.teamnest.teamnestapi.auth.dto.ForgotPasswordReqDto;
import com.teamnest.teamnestapi.auth.dto.LoginReqDto;
import com.teamnest.teamnestapi.auth.dto.RefreshReqDto;
import com.teamnest.teamnestapi.auth.dto.ResetPasswordReqDto;
import com.teamnest.teamnestapi.auth.dto.UpdatePasswordReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;

public interface AuthService {

  AuthResDto login(LoginReqDto loginReqDto);

  AuthResDto refresh(RefreshReqDto refreshReqDto);

  void forgotPassword(ForgotPasswordReqDto forgotPasswordReqDto);

  void resetPassword(ResetPasswordReqDto resetPasswordReqDto);

  UserInfoResDto getCurrentUser(Authentication authentication);

  UserInfoResDto updateUserInfo(UserInfoReqDto userInfoReqDto, Authentication authentication);

  void logout(String refreshToken);

  void updatePassword(UpdatePasswordReqDto updatePasswordReqDto, Authentication authentication);

}
