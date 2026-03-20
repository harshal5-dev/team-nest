package com.teamnest.teamnestapi.dtos;

import java.util.List;
import org.springframework.data.domain.Page;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;

@Getter
@Schema(description = "Successful API response containing data")
public class SuccessResDto<T> extends AppResDto<T> {

  @Schema(description = "Response payload data")
  private final T data;

  @Schema(description = "Indicates if the response is paginated", example = "false")
  private boolean isPagination = false;

  @Schema(description = "Pagination details if the response is paginated")
  private PageResponseDTO pagination;

  public SuccessResDto(String message, T data) {
    super(message);
    this.data = data;
  }

  public static <T> SuccessResDto<List<T>> from(String message, Page<T> page) {
    SuccessResDto<List<T>> res = new SuccessResDto<>(message, page.toList());
    res.isPagination = true;
    res.pagination = PageResponseDTO.from(page);
    return res;
  }

}
