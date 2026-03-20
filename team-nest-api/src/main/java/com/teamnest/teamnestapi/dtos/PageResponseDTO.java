package com.teamnest.teamnestapi.dtos;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import org.springframework.data.domain.Page;

@Builder
@Schema(description = "Pagination details for paginated responses")
public class PageResponseDTO {

  @Schema(description = "Current page number (0-based index)", example = "0")
  private int currentPage;
  private int pageSize;
  private long totalElements;
  private int totalPages;
  private boolean first;
  private boolean last;
  private boolean empty;

  public static <T> PageResponseDTO from(Page<T> page) {
    return PageResponseDTO.builder()
      .currentPage(page.getNumber())
      .pageSize(page.getSize())
      .totalElements(page.getTotalElements())
      .totalPages(page.getTotalPages())
      .first(page.isFirst())
      .last(page.isLast())
      .empty(page.isEmpty())
      .build();
  }
}
