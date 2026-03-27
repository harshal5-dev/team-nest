package com.teamnest.teamnestapi.common.mapper;

import org.springframework.stereotype.Component;
import com.teamnest.teamnestapi.common.dto.TenantRegistrationResDto;
import com.teamnest.teamnestapi.tenant.entity.Tenant;
import com.teamnest.teamnestapi.user.entity.User;

@Component
public class CommonMapper {


  public TenantRegistrationResDto toTenantRegistrationResDto(Tenant tenant, User user) {
    TenantRegistrationResDto resDto = new TenantRegistrationResDto();
    resDto.setTenantId(tenant.getId());
    resDto.setOrganizationName(tenant.getName());
    resDto.setOwnerEmail(user.getEmail());
    resDto.setOwnerId(user.getId());
    resDto.setOwnerFirstName(user.getFirstName());
    resDto.setOwnerLastName(user.getLastName());
    return resDto;
  }

}
