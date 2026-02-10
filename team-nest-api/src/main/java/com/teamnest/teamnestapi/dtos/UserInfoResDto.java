package com.teamnest.teamnestapi.dtos;

import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserInfoResDto {

  private Long id;
  private String name;
  private String email;
  private UUID tenantId;
  private List<String> roles;
}
