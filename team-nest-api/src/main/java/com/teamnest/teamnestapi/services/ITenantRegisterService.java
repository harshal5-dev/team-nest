package com.teamnest.teamnestapi.services;

import com.teamnest.teamnestapi.common.dto.TenantRegistrationReqDto;
import com.teamnest.teamnestapi.common.dto.TenantRegistrationResDto;

public interface ITenantRegisterService {

  TenantRegistrationResDto registerTenant(TenantRegistrationReqDto tenantRegistrationReqDto);
}
