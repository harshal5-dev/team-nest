package com.teamnest.teamnestapi.dtos;

import java.time.Instant;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(description = "Base API response wrapper")
public abstract class AppResDto<T> {

  @Schema(description = "Response message", example = "Operation successful")
  private final String message;

  @Schema(description = "Timestamp of the response", example = "2026-03-03T10:15:30Z")
  private final Instant timestamp;

  public AppResDto(String message) {
    this.message = message;
    this.timestamp = Instant.now();
  }
}
