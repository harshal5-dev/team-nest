package com.teamnest.teamnestapi.services;

import org.springframework.security.core.Authentication;
import com.teamnest.teamnestapi.dtos.ForgotPasswordReqDto;
import com.teamnest.teamnestapi.dtos.RefreshReqDto;
import com.teamnest.teamnestapi.dtos.ResetPasswordReqDto;
import com.teamnest.teamnestapi.dtos.UpdatePasswordReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;
import com.teamnest.teamnestapi.security.dto.AuthResDto;
import com.teamnest.teamnestapi.security.dto.LoginReqDto;

public interface IAuthService {

  AuthResDto login(LoginReqDto loginReqDto);

  AuthResDto refresh(RefreshReqDto refreshReqDto);

  void forgotPassword(ForgotPasswordReqDto forgotPasswordReqDto);

  void resetPassword(ResetPasswordReqDto resetPasswordReqDto);

  UserInfoResDto getCurrentUser(Authentication authentication);

  UserInfoResDto updateUserInfo(UserInfoReqDto userInfoReqDto, Authentication authentication);

  void logout(String refreshToken);

  void updatePassword(UpdatePasswordReqDto updatePasswordReqDto, Authentication authentication);

}
