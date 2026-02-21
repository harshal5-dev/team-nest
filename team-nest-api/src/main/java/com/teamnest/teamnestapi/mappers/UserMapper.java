package com.teamnest.teamnestapi.mappers;

import java.util.List;
import com.teamnest.teamnestapi.dtos.OwnerInfoDto;
import com.teamnest.teamnestapi.dtos.UserInfoResDto;
import com.teamnest.teamnestapi.models.Status;
import com.teamnest.teamnestapi.models.User;

public final class UserMapper {

  private UserMapper() {}


  public static User toUser(OwnerInfoDto ownerInfoDto) {
    User user = new User();
    user.setFirstName(ownerInfoDto.getFirstName());
    user.setLastName(ownerInfoDto.getLastName());
    user.setEmail(ownerInfoDto.getEmail());
    user.setStatus(Status.ACTIVE);
    return user;
  }

  public static UserInfoResDto toUserInfoResDto(User user) {
    UserInfoResDto resDto = new UserInfoResDto();

    List<String> roles = user.getRoles().stream().map(role -> role.getName()).toList();

    resDto.setId(user.getId());
    resDto.setFirstName(user.getFirstName());
    resDto.setLastName(user.getLastName());
    resDto.setEmail(user.getEmail());
    resDto.setTenantId(user.getTenantId());
    resDto.setRoles(roles);

    return resDto;
  }

}
