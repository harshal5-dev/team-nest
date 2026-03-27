package com.teamnest.teamnestapi.tenant.exception;

import org.springframework.http.HttpStatus;
import com.teamnest.teamnestapi.common.enums.ApiErrorMsg;
import com.teamnest.teamnestapi.exception.ApiException;

public class TenantNameAlreadyExistsException extends ApiException {
  public TenantNameAlreadyExistsException(String tenantName) {
    super(String.format(ApiErrorMsg.TENANT_NAME_ALREADY_EXISTS.getMessage(), tenantName),
        HttpStatus.CONFLICT);
  }
}
