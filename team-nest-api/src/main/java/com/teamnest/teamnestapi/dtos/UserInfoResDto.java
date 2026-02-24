package com.teamnest.teamnestapi.dtos;

import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInfoResDto {
  private UUID id;
  private String firstName;
  private String lastName;
  private String email;
  private TenantResDto tenant;
  private List<String> roles;
}
