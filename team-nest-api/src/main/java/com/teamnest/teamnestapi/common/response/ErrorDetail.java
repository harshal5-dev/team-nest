package com.teamnest.teamnestapi.common.response;

import org.springframework.validation.FieldError;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(description = "Details about a specific error that occurred during request processing.")
public class ErrorDetail {

  @Schema(description = "The name of the field that caused the error.", example = "email")
  private String field;

  @Schema(description = "The value that was rejected for the field.",
      example = "invalid-email-format")
  private Object rejectedValue;

  @Schema(description = "A message describing the error.", example = "Email format is invalid.")
  private String message;

  public static ErrorDetail of(FieldError fieldError) {
    ErrorDetail errorDetail = new ErrorDetail();
    errorDetail.setField(fieldError.getField());
    errorDetail.setRejectedValue(fieldError.getRejectedValue());
    errorDetail.setMessage(fieldError.getDefaultMessage());
    return errorDetail;
  }
}
