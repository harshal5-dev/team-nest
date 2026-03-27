package com.teamnest.teamnestapi.exceptions;

import org.springframework.http.HttpStatus;
import com.teamnest.teamnestapi.common.enums.ApiErrorMsg;

public class TenantNotResolvedException extends ApiException {
  public TenantNotResolvedException() {
    super(ApiErrorMsg.TENANT_NOT_RESOLVED.getMessage(), HttpStatus.BAD_REQUEST);
  }
}
