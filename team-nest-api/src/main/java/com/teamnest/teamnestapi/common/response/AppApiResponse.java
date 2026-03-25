package com.teamnest.teamnestapi.common.response;

import java.time.Instant;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({"message", "timestamp", "requestId", "path", "apiVersion", "data", "errors"})
@Getter
@Setter
@Schema(description = "Standard API response wrapper for all endpoints, providing consistent structure for success and error responses.")
public class AppApiResponse<T> {

    @Schema(description = "A human-readable message providing more details about the API response.",
            example = "Request processed successfully.")
    private String message;

    @Schema(description = "The timestamp when the API response was generated.",
            example = "2023-10-01T12:00:00Z")
    private Instant timestamp = Instant.now();

    @Schema(description = "The path of the API endpoint that generated this response.",
            example = "/api/users")
    private String path;

    @Schema(description = "The version of the API.", example = "1.0")
    private String apiVersion = "1.0";

    @Schema(description = "The data returned by the API call.")
    private T data;

    @Schema(description = "A list of error details, if the API call resulted in errors.")
    private List<ErrorDetail> errors;

    public static <T> AppApiResponse<T> success(String message, String path, T data) {
        AppApiResponse<T> response = new AppApiResponse<>();
        response.setMessage(message);
        response.setPath(path);
        response.setData(data);
        return response;
    }

    public static <T> AppApiResponse<T> error(String message, String path,
            List<ErrorDetail> errors) {
        AppApiResponse<T> response = new AppApiResponse<>();
        response.setMessage(message);
        response.setPath(path);
        response.setErrors(errors);
        return response;
    }
}
