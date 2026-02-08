package com.teamnest.teamnestapi.exceptions;

import com.teamnest.teamnestapi.dtos.ErrorResDto;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
@Order(1)
public class BusinessExceptionHandler {

  @ExceptionHandler(TenantNameAlreadyExistsException.class)
  public ResponseEntity<ErrorResDto<Void>> handleResourceNotFoundException(
    TenantNameAlreadyExistsException exception, WebRequest webRequest) {
    ErrorResDto<Void> errorResponseDTO =
      new ErrorResDto<>(exception.getMessage(), webRequest.getDescription(false));
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.CONFLICT);
  }

  @ExceptionHandler(TenantNotResolvedException.class)
  public ResponseEntity<ErrorResDto<Void>> handleResourceNotFoundException(
    TenantNotResolvedException exception, WebRequest webRequest) {
    ErrorResDto<Void> errorResponseDTO =
      new ErrorResDto<>(exception.getMessage(), webRequest.getDescription(false));
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(UserAlreadyExistsException.class)
  public ResponseEntity<ErrorResDto<Void>> handleResourceNotFoundException(
    UserAlreadyExistsException exception, WebRequest webRequest) {
    ErrorResDto<Void> errorResponseDTO =
      new ErrorResDto<>(exception.getMessage(), webRequest.getDescription(false));
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.CONFLICT);
  }

}
