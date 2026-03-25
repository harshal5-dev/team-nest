package com.teamnest.teamnestapi.common.response;

import org.springframework.data.domain.Page;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@JsonPropertyOrder({"page", "size", "totalElements", "totalPages", "first", "last", "empty",
    "sortBy"})
@Getter
@Setter
@Schema(
    description = "Metadata about the pagination state of a paginated API response, including current page, total pages, and sorting information.")
public class PaginationMeta {
  @Schema(description = "The current page number (0-indexed).", example = "0")
  private int page;

  @Schema(description = "The number of items per page.", example = "10")
  private int size;

  @Schema(description = "The total number of elements across all pages.", example = "100")
  private long totalElements;

  @Schema(description = "The total number of pages.", example = "10")
  private int totalPages;

  @Schema(description = "Indicates whether this is the first page.", example = "true")
  private boolean first;

  @Schema(description = "Indicates whether this is the last page.", example = "false")
  private boolean last;

  @Schema(description = "Indicates whether the current page is empty.", example = "false")
  private boolean empty;

  @Schema(description = "The field by which the results are sorted.", example = "name")
  private String sortBy;

  public static PaginationMeta from(Page<?> page) {
    String sort = page.getSort().isSorted() ? page.getSort().toString() // e.g. "price: ASC"
        : "unsorted";

    PaginationMeta meta = new PaginationMeta();
    meta.setPage(page.getNumber());
    meta.setSize(page.getSize());
    meta.setTotalElements(page.getTotalElements());
    meta.setTotalPages(page.getTotalPages());
    meta.setFirst(page.isFirst());
    meta.setLast(page.isLast());
    meta.setEmpty(page.isEmpty());
    meta.setSortBy(sort);
    return meta;
  }
}
