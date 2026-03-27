package com.teamnest.teamnestapi.tenant.exception;

import org.springframework.http.HttpStatus;
import com.teamnest.teamnestapi.common.enums.ApiErrorMsg;
import com.teamnest.teamnestapi.exceptions.ApiException;

public class TenantNotResolvedException extends ApiException {
  public TenantNotResolvedException() {
    super(ApiErrorMsg.TENANT_NOT_RESOLVED.getMessage(), HttpStatus.BAD_REQUEST);
  }
}
