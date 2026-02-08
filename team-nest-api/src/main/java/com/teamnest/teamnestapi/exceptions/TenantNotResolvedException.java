package com.teamnest.teamnestapi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TenantNotResolvedException extends RuntimeException {
  public TenantNotResolvedException() {
    super("Tenant could not be resolved from the request");
  }
}
