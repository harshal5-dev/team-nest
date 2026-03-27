package com.teamnest.teamnestapi.exceptions;

import org.springframework.http.HttpStatus;
import com.teamnest.teamnestapi.common.enums.ApiErrorMsg;

public class TenantNameAlreadyExistsException extends ApiException {
  public TenantNameAlreadyExistsException(String tenantName) {
    super(String.format(ApiErrorMsg.TENANT_NAME_ALREADY_EXISTS.getMessage(), tenantName),
        HttpStatus.CONFLICT);
  }
}
