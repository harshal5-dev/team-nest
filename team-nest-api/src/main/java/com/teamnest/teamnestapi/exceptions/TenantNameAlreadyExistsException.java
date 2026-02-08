package com.teamnest.teamnestapi.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.CONFLICT)
public class TenantNameAlreadyExistsException extends RuntimeException {
  public TenantNameAlreadyExistsException(String message) {
    super(message);
  }
}
