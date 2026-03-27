package com.teamnest.teamnestapi.common.enums;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ApiErrorMsg {
  // General error messages
  INVALID_REQUEST("Invalid request data."), RESOURCE_NOT_FOUND(
      "Requested resource not found."), UNAUTHORIZED("Unauthorized access."), FORBIDDEN(
          "Forbidden access."), INTERNAL_SERVER_ERROR(
              "An unexpected error occurred on the server."), VALIDATION_ERROR(
                  "Validation failed. Please check the errors field."), INVALID_REQUEST_BODY(
                      "Request body is missing or contains invalid JSON."),

  // Additional error messages for tenant-related issues

  TENANT_NAME_ALREADY_EXISTS("Tenant name %s already exists."), TENANT_NOT_RESOLVED(
      "Tenant could not be resolved from the request."),

  // Additional error messages for user-related issues
  USER_ALREADY_EXISTS("User with email '%s' already exists.");

  private final String message;
}
