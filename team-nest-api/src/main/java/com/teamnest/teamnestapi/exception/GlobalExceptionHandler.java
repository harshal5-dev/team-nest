package com.teamnest.teamnestapi.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import com.teamnest.teamnestapi.common.enums.ApiErrorMsg;
import com.teamnest.teamnestapi.common.response.AppApiResponse;
import com.teamnest.teamnestapi.common.response.ResponseBuilder;
import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<AppApiResponse<Void>> handleValidation(MethodArgumentNotValidException ex,
      HttpServletRequest request) {
    return ResponseBuilder.validationError(ex.getBindingResult(), request);
  }

  @ExceptionHandler(ApiException.class)
  public ResponseEntity<AppApiResponse<Void>> handleApiException(ApiException ex,
      HttpServletRequest request) {
    return ResponseBuilder.error(ex.getMessage(), ex.getStatusCode(), request);
  }

  @ExceptionHandler(HttpMessageNotReadableException.class)
  public ResponseEntity<AppApiResponse<Void>> handleUnreadableBody(
      HttpMessageNotReadableException ex, HttpServletRequest request) {

    return ResponseBuilder.error(ApiErrorMsg.INVALID_REQUEST_BODY.getMessage(),
        HttpStatus.BAD_REQUEST, request);
  }

  @ExceptionHandler(MethodArgumentTypeMismatchException.class)
  public ResponseEntity<AppApiResponse<Void>> handleTypeMismatch(
      MethodArgumentTypeMismatchException ex, HttpServletRequest request) {
    String message = String.format("Parameter '%s' should be of type '%s'", ex.getName(),
        ex.getRequiredType() != null ? ex.getRequiredType().getSimpleName() : "unknown");

    return ResponseBuilder.error(message, HttpStatus.BAD_REQUEST, request);
  }

  @ExceptionHandler(AuthenticationException.class)
  public ResponseEntity<AppApiResponse<Void>> handleAuthenticationException(
      AuthenticationException ex, HttpServletRequest request) {
    return ResponseBuilder.unauthorized(ApiErrorMsg.UNAUTHORIZED.getMessage(), request);
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<AppApiResponse<Void>> handleAccessDenied(AccessDeniedException ex,
      HttpServletRequest request) {

    return ResponseBuilder.error(ApiErrorMsg.FORBIDDEN.getMessage(), HttpStatus.FORBIDDEN, request);
  }

  // @ExceptionHandler(UsernameNotFoundException.class)
  // public ResponseEntity<ErrorResDto<Void>> handleUsernameNotFoundException(
  // UsernameNotFoundException exception, WebRequest webRequest) {
  // ErrorResDto<Void> errorResponseDTO =
  // new ErrorResDto<>(exception.getMessage(), webRequest.getDescription(false));
  // return new ResponseEntity<>(errorResponseDTO, HttpStatus.NOT_FOUND);
  // }

  // @ExceptionHandler(BadCredentialsException.class)
  // public ResponseEntity<ErrorResDto<Void>> handleBadCredentialsException(
  // BadCredentialsException exception, WebRequest webRequest) {
  // ErrorResDto<Void> errorResponseDTO =
  // new ErrorResDto<>(exception.getMessage(), webRequest.getDescription(false));
  // return new ResponseEntity<>(errorResponseDTO, HttpStatus.UNAUTHORIZED);
  // }

  @ExceptionHandler(RuntimeException.class)
  public ResponseEntity<AppApiResponse<Void>> handleRuntimeException(RuntimeException exception,
      HttpServletRequest request) {
    return ResponseBuilder.error(ApiErrorMsg.INTERNAL_SERVER_ERROR.getMessage(),
        HttpStatus.INTERNAL_SERVER_ERROR, request);
  }

  @ExceptionHandler(Exception.class)
  public ResponseEntity<AppApiResponse<Void>> handleGenericException(Exception ex,
      HttpServletRequest request) {

    return ResponseBuilder.error(ApiErrorMsg.INTERNAL_SERVER_ERROR.getMessage(),
        HttpStatus.INTERNAL_SERVER_ERROR, request);
  }

}
