package com.teamnest.teamnestapi.auth.service;

import org.springframework.security.core.Authentication;
import com.teamnest.teamnestapi.auth.dto.AuthResDTO;
import com.teamnest.teamnestapi.auth.dto.LoginReqDTO;
import com.teamnest.teamnestapi.refreshtoken.dto.RefreshReqDTO;
import com.teamnest.teamnestapi.user.dto.ForgotPasswordReqDTO;
import com.teamnest.teamnestapi.user.dto.ResetPasswordReqDTO;
import com.teamnest.teamnestapi.user.dto.UpdatePasswordReqDTO;
import com.teamnest.teamnestapi.user.dto.UserInfoReqDTO;
import com.teamnest.teamnestapi.user.dto.UserInfoResDTO;

public interface AuthService {

  AuthResDTO login(LoginReqDTO loginReqDto);

  AuthResDTO refresh(RefreshReqDTO refreshReqDto);

  void forgotPassword(ForgotPasswordReqDTO forgotPasswordReqDto);

  void resetPassword(ResetPasswordReqDTO resetPasswordReqDto);

  UserInfoResDTO getCurrentUser(Authentication authentication);

  UserInfoResDTO updateUserInfo(UserInfoReqDTO userInfoReqDto, Authentication authentication);

  void logout(String refreshToken);

  void updatePassword(UpdatePasswordReqDTO updatePasswordReqDto, Authentication authentication);

}
