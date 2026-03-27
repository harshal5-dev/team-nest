package com.teamnest.teamnestapi.auth.service;

import org.springframework.security.core.Authentication;
import com.teamnest.teamnestapi.auth.dto.AuthResDTO;
import com.teamnest.teamnestapi.auth.dto.ForgotPasswordReqDto;
import com.teamnest.teamnestapi.auth.dto.LoginReqDTO;
import com.teamnest.teamnestapi.auth.dto.RefreshReqDto;
import com.teamnest.teamnestapi.auth.dto.ResetPasswordReqDto;
import com.teamnest.teamnestapi.auth.dto.UpdatePasswordReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;

public interface AuthService {

  AuthResDTO login(LoginReqDTO loginReqDto);

  AuthResDTO refresh(RefreshReqDto refreshReqDto);

  void forgotPassword(ForgotPasswordReqDto forgotPasswordReqDto);

  void resetPassword(ResetPasswordReqDto resetPasswordReqDto);

  UserInfoResDto getCurrentUser(Authentication authentication);

  UserInfoResDto updateUserInfo(UserInfoReqDto userInfoReqDto, Authentication authentication);

  void logout(String refreshToken);

  void updatePassword(UpdatePasswordReqDto updatePasswordReqDto, Authentication authentication);

}
