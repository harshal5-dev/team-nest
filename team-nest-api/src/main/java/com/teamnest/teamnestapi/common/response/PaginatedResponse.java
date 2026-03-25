package com.teamnest.teamnestapi.common.response;

import java.time.Instant;
import java.util.List;
import org.springframework.data.domain.Page;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Schema(
    description = "Standard API response wrapper for paginated endpoints, providing consistent structure for success responses with pagination metadata.")
public class PaginatedResponse<T> {

  @Schema(description = "A human-readable message providing more details about the API response.",
      example = "Request processed successfully.")
  private String message;

  @Schema(description = "The timestamp when the API response was generated.",
      example = "2023-10-01T12:00:00Z")
  private Instant timestamp = Instant.now();

  @Schema(description = "The path of the API endpoint that was called.", example = "/api/users")
  private String path;

  @Schema(description = "The version of the API that was called.", example = "1.0")
  private String apiVersion = "1.0";

  @Schema(description = "The list of items returned by the API call.")
  private List<T> data;

  @Schema(description = "Metadata about the pagination of the results.")
  private PaginationMeta pagination;

  public static <T> PaginatedResponse<T> of(String message, String path, Page<T> page) {
    PaginatedResponse<T> response = new PaginatedResponse<>();
    response.setMessage(message);
    response.setPath(path);
    response.setData(page.getContent());
    response.setPagination(PaginationMeta.from(page));
    return response;
  }
}
