package com.teamnest.teamnestapi.exceptions;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.jspecify.annotations.NonNull;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import com.teamnest.teamnestapi.dtos.ErrorResDto;

@RestControllerAdvice
@Order(5)
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
      @NonNull HttpHeaders headers, @NonNull HttpStatusCode status, WebRequest request) {
    Map<String, String> validationErrors = new HashMap<>();
    List<ObjectError> errors = ex.getBindingResult().getAllErrors();

    errors.forEach((error) -> {
      String fieldName = ((FieldError) error).getField();
      String validationMsg = error.getDefaultMessage();
      validationErrors.put(fieldName, validationMsg);
    });
    ErrorResDto<Void> errorResponseDTO =
        new ErrorResDto<>("Validation Failed", validationErrors, request.getDescription(false));

    return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<ErrorResDto<Void>> handleRuntimeException(RuntimeException exception,
      WebRequest webRequest) {
    ErrorResDto<Void> errorResponseDTO =
        new ErrorResDto<>(exception.getMessage(), webRequest.getDescription(false));
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<ErrorResDto<Void>> handleGlobalException(Exception exception,
      WebRequest webRequest) {
    ErrorResDto<Void> errorResponseDTO =
        new ErrorResDto<>(exception.getMessage(), webRequest.getDescription(false));
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  @ExceptionHandler(IllegalStateException.class)
  public ResponseEntity<ErrorResDto<Void>> handleIllegalStateException(
      IllegalStateException exception, WebRequest webRequest) {
    ErrorResDto<Void> errorResponseDTO =
        new ErrorResDto<>(exception.getMessage(), webRequest.getDescription(false));
    return new ResponseEntity<>(errorResponseDTO, HttpStatus.BAD_REQUEST);
  }

}
