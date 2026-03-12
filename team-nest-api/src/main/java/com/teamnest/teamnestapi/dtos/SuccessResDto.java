package com.teamnest.teamnestapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(description = "Successful API response containing data")
public class SuccessResDto<T> extends AppResDto<T> {

  @Schema(description = "Response payload data")
  private final T data;

  public SuccessResDto(String message, T data) {
    super(message);
    this.data = data;
  }
}
