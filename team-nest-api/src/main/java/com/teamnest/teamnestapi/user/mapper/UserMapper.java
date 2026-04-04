package com.teamnest.teamnestapi.user.mapper;

import java.util.List;

import com.teamnest.teamnestapi.role.entity.Role;
import org.springframework.stereotype.Component;
import com.teamnest.teamnestapi.user.dto.OwnerInfoDTO;
import com.teamnest.teamnestapi.user.dto.UserInfoReqDTO;
import com.teamnest.teamnestapi.user.dto.UserInfoResDTO;
import com.teamnest.teamnestapi.user.entity.User;

@Component
public class UserMapper {


  public User toUser(OwnerInfoDTO ownerInfoDto, User user) {
    user.setFirstName(ownerInfoDto.getFirstName());
    user.setLastName(ownerInfoDto.getLastName());
    user.setEmail(ownerInfoDto.getEmail());
    user.setAvatar(ownerInfoDto.getAvatar());
    return user;
  }

  public void toUser(UserInfoReqDTO userInfoReqDto, User user) {
    user.setFirstName(userInfoReqDto.getFirstName());
    user.setLastName(userInfoReqDto.getLastName());
    user.setAvatar(userInfoReqDto.getAvatar());
  }

  public UserInfoResDTO toUserInfoResDto(User user) {
    UserInfoResDTO resDto = new UserInfoResDTO();

    List<String> roles = user.getRoles().stream().map(Role::getName).toList();

    resDto.setId(user.getId());
    resDto.setFirstName(user.getFirstName());
    resDto.setLastName(user.getLastName());
    resDto.setEmail(user.getEmail());
    resDto.setRoles(roles);
    resDto.setAvatar(user.getAvatar());

    return resDto;
  }

}
