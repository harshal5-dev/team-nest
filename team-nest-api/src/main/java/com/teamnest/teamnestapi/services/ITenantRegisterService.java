package com.teamnest.teamnestapi.services;

import com.teamnest.teamnestapi.dtos.TenantRegistrationReqDto;
import com.teamnest.teamnestapi.dtos.TenantRegistrationResDto;

public interface ITenantRegisterService {

  TenantRegistrationResDto registerTenant(TenantRegistrationReqDto tenantRegistrationReqDto);
}
