package com.teamnest.teamnestapi.exceptions;

import org.springframework.http.HttpStatus;
import lombok.Getter;

@Getter
public class ApiException extends RuntimeException {
  private HttpStatus statusCode;

  public ApiException(String message, HttpStatus statusCode) {
    super(message);
    this.statusCode = statusCode;
  }

}
