package com.teamnest.teamnestapi.user.exception;

import org.springframework.http.HttpStatus;
import com.teamnest.teamnestapi.common.enums.ApiErrorMsg;
import com.teamnest.teamnestapi.exceptions.ApiException;

public class UserAlreadyExistsException extends ApiException {
  public UserAlreadyExistsException(String email) {
    super(String.format(ApiErrorMsg.USER_ALREADY_EXISTS.getMessage(), email), HttpStatus.CONFLICT);
  }
}
