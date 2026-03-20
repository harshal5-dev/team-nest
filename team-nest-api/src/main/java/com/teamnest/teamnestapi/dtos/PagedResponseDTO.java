package com.teamnest.teamnestapi.dtos;

import lombok.Builder;
import org.springframework.data.domain.Page;

import java.util.List;

@Builder
public class PagedResponseDTO<T> {
  private List<T> content;
  private int currentPage;
  private int pageSize;
  private long totalElements;
  private int totalPages;
  private boolean first;
  private boolean last;
  private boolean empty;

  public static <T> PagedResponseDTO<T> from(Page<T> page) {
    return PagedResponseDTO.<T>builder()
      .content(page.getContent())
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
