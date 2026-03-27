package com.teamnest.teamnestapi.common.service;

import com.teamnest.teamnestapi.common.dto.TenantRegistrationReqDto;
import com.teamnest.teamnestapi.common.dto.TenantRegistrationResDto;

public interface TenantRegisterService {

  TenantRegistrationResDto registerTenant(TenantRegistrationReqDto tenantRegistrationReqDto);
}
