package com.teamnest.teamnestapi.mappers;

import com.teamnest.teamnestapi.dtos.OwnerInfoDto;
import com.teamnest.teamnestapi.models.Status;
import com.teamnest.teamnestapi.models.User;

public final class UserMapper {

  private UserMapper() {}


  public static User toUser(OwnerInfoDto ownerInfoDto) {
    User user = new User();
    user.setName(ownerInfoDto.getFullName());
    user.setEmail(ownerInfoDto.getEmail());
    user.setStatus(Status.ACTIVE);
    return user;
  }

}
