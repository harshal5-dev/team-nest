package com.teamnest.teamnestapi.dtos;

import lombok.Getter;

@Getter
public class SuccessResDto<T> extends AppResDto<T> {
  private final T data;

  public SuccessResDto(String message, T data) {
    super(message);
    this.data = data;
  }
}
