package com.teamnest.teamnestapi.dtos;

import lombok.Getter;

import java.util.Map;

@Getter
public class ErrorResDto<T> extends AppResDto<T> {
  private Map<String, String> validationErrors;
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
