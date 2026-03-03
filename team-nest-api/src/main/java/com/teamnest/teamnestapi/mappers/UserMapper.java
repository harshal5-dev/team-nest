package com.teamnest.teamnestapi.mappers;

import java.util.List;
import com.teamnest.teamnestapi.dtos.OwnerInfoDto;
import com.teamnest.teamnestapi.dtos.UserInfoReqDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;
import com.teamnest.teamnestapi.models.User;

public final class UserMapper {

  private UserMapper() {}


  public static User toUser(OwnerInfoDto ownerInfoDto, User user) {
    user.setFirstName(ownerInfoDto.getFirstName());
    user.setLastName(ownerInfoDto.getLastName());
    user.setEmail(ownerInfoDto.getEmail());
    user.setAvatar(ownerInfoDto.getAvatar());
    return user;
  }

  public static User toUser(UserInfoReqDto userInfoReqDto, User user) {
    user.setFirstName(userInfoReqDto.getFirstName());
    user.setLastName(userInfoReqDto.getLastName());
    user.setAvatar(userInfoReqDto.getAvatar());
    return user;
  }

  public static UserInfoResDto toUserInfoResDto(User user) {
    UserInfoResDto resDto = new UserInfoResDto();

    List<String> roles = user.getRoles().stream().map(role -> role.getName()).toList();

    resDto.setId(user.getId());
    resDto.setFirstName(user.getFirstName());
    resDto.setLastName(user.getLastName());
    resDto.setEmail(user.getEmail());
    resDto.setRoles(roles);
    resDto.setAvatar(user.getAvatar());

    return resDto;
  }

}
