package com.teamnest.teamnestapi.dtos;

import java.util.Map;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(description = "Error response returned when an API request fails")
public class ErrorResDto<T> extends AppResDto<T> {

  @Schema(description = "Map of field-level validation errors",
      example = "{\"email\": \"Email is required\"}")
  private Map<String, String> validationErrors;

  @Schema(description = "API path that generated the error", example = "/api/auth/login")
  private final String apiPath;

  public ErrorResDto(String message, String apiPath) {
    super(message);
    this.apiPath = apiPath;
  }

  public ErrorResDto(String message, Map<String, String> validationErrors, String apiPath) {
    super(message);
    this.validationErrors = validationErrors;
    this.apiPath = apiPath;
  }
}
