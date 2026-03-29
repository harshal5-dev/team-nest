package com.teamnest.teamnestapi.exception;

import org.springframework.http.HttpStatus;
import lombok.Getter;

@Getter
public class ApiException extends RuntimeException {
  private final HttpStatus statusCode;

  public ApiException(String message, HttpStatus statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

}
