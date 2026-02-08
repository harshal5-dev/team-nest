package com.teamnest.teamnestapi.dtos;

import java.time.Instant;
import lombok.Getter;

@Getter
public abstract class AppResDto<T> {
  private final String message;
  private final Instant timestamp;

  public AppResDto(String message) {
    this.message = message;
    this.timestamp = Instant.now();
  }
}
