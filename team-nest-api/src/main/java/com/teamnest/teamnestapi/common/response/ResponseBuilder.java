package com.teamnest.teamnestapi.common.response;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import jakarta.servlet.http.HttpServletRequest;

public final class ResponseBuilder {

  private ResponseBuilder() {
    // Private constructor to prevent instantiation
  }

  public static <T> ResponseEntity<AppApiResponse<T>> success(T data, String message,
      HttpStatus status, HttpServletRequest request) {
    AppApiResponse<T> response = AppApiResponse.success(message, request.getRequestURI(), data);
    return ResponseEntity.status(status).body(response);
  }

  public static <T> ResponseEntity<AppApiResponse<T>> ok(T data, String message,
      HttpServletRequest request) {
    return success(data, message, HttpStatus.OK, request);
  }

  public static <T> ResponseEntity<AppApiResponse<T>> created(T data, String message,
      HttpServletRequest request) {
    return success(data, message, HttpStatus.CREATED, request);
  }

  public static ResponseEntity<AppApiResponse<Void>> noContent(String message,
      HttpServletRequest request) {
    return success(null, message, HttpStatus.NO_CONTENT, request);
  }

  public static <T> ResponseEntity<PaginatedResponse<T>> paginated(Page<T> page, String message,
      HttpServletRequest request) {
    PaginatedResponse<T> response = PaginatedResponse.of(message, request.getRequestURI(), page);
    return ResponseEntity.ok(response);
  }

  public static <T> ResponseEntity<AppApiResponse<T>> error(String message, HttpStatus status,
      HttpServletRequest request) {

    AppApiResponse<T> response = AppApiResponse.error(message, request.getRequestURI(), null);
    return ResponseEntity.status(status).body(response);
  }

  public static <T> ResponseEntity<AppApiResponse<T>> validationError(BindingResult bindingResult,
      HttpServletRequest request) {

    List<ErrorDetail> fieldErrors =
        bindingResult.getFieldErrors().stream().map(ErrorDetail::of).collect(Collectors.toList());

    AppApiResponse<T> response = AppApiResponse.error(
        "Validation failed. Please check the errors field.", request.getRequestURI(), fieldErrors);

    return ResponseEntity.status(HttpStatus.UNPROCESSABLE_CONTENT).body(response);
  }

  public static <T> ResponseEntity<AppApiResponse<T>> notFound(String message,
      HttpServletRequest request) {
    return error(message, HttpStatus.NOT_FOUND, request);
  }

  public static <T> ResponseEntity<AppApiResponse<T>> conflict(String message,
      HttpServletRequest request) {
    return error(message, HttpStatus.CONFLICT, request);
  }

  public static <T> ResponseEntity<AppApiResponse<T>> unauthorized(String message,
      HttpServletRequest request) {
    return error(message, HttpStatus.UNAUTHORIZED, request);
  }
}
