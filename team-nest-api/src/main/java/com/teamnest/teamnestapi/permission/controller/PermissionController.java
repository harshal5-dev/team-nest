package com.teamnest.teamnestapi.permission.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.teamnest.teamnestapi.common.response.PaginatedResponse;
import com.teamnest.teamnestapi.common.response.ResponseBuilder;
import com.teamnest.teamnestapi.permission.dto.PermissionResDTO;
import com.teamnest.teamnestapi.permission.mapper.PermissionMapper;
import com.teamnest.teamnestapi.permission.service.PermissionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;



@RestController
@RequestMapping("/api/v1/permissions")
@RequiredArgsConstructor
@Tag(name = "Permission V1", description = "APIs for managing permissions within the application.")
public class PermissionController {

  private final PermissionService permissionService;
  private final PermissionMapper permissionMapper;

  @GetMapping
  @Operation(summary = "List permissions with pagination, sorting, and filtering",
      description = "Retrieve a paginated list of permissions with optional filtering by name and sorting capabilities.")
  @ApiResponse(responseCode = "200",
      description = "Successfully retrieved paginated list of permissions")
  public ResponseEntity<PaginatedResponse<PermissionResDTO>> getAllPermissions(
      @Parameter(description = "Partial name match (case-insensitive)") @RequestParam(
          required = false) String name,
      @Parameter(description = "Pagination and sorting parameters") @PageableDefault(size = 10,
          sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
      HttpServletRequest request) {

    Page<PermissionResDTO> page = permissionService.getPermissions(name, pageable)
        .map(permission -> permissionMapper.toDTO(permission));

    return ResponseBuilder.paginated(page, "permissions fetched successfully", request);
  }
}
