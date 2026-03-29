package com.teamnest.teamnestapi.role.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.teamnest.teamnestapi.common.response.AppApiResponse;
import com.teamnest.teamnestapi.common.response.PaginatedResponse;
import com.teamnest.teamnestapi.common.response.ResponseBuilder;
import com.teamnest.teamnestapi.role.dto.RoleReqDTO;
import com.teamnest.teamnestapi.role.dto.RoleResDTO;
import com.teamnest.teamnestapi.role.mapper.RoleMapper;
import com.teamnest.teamnestapi.role.service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@Tag(name = "Role V1", description = "APIs for managing roles within the application.")
@RequestMapping("/api/v1/roles")
public class RoleController {

  private final RoleService roleService;
  private final RoleMapper roleMapper;

  @GetMapping
  @Operation(summary = "List roles with pagination, sorting, and filtering",
      description = "Retrieve a paginated list of roles with optional filtering by name and sorting capabilities.")
  @ApiResponses(value = {@ApiResponse(responseCode = "200",
      description = "Successfully retrieved paginated list of roles")})
  public ResponseEntity<PaginatedResponse<RoleResDTO>> getAllRoles(
      @Parameter(description = "Partial name match (case-insensitive)") @RequestParam(
          required = false) String name,
      @Parameter(description = "Pagination and sorting parameters") @PageableDefault(size = 10,
          sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable,
      HttpServletRequest request) {

    Page<RoleResDTO> page =
        roleService.getRoles(name, pageable).map(role -> roleMapper.toDTO(role));

    return ResponseBuilder.paginated(page, "roles fetched successfully", request);
  }

  @PostMapping
  @Operation(summary = "Create a new role",
      description = "Create a new role with the provided details. The request body must include the name and code of the role.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "201", description = "Role created successfully"),
          @ApiResponse(responseCode = "400", description = "Invalid input data")})
  public ResponseEntity<AppApiResponse<RoleResDTO>> createRole(
      @Valid @RequestBody RoleReqDTO roleReqDTO, HttpServletRequest request) {
    RoleResDTO roleResDTO = roleMapper.toDTO(roleService.create(roleReqDTO));
    return ResponseBuilder.created(roleResDTO, "Role created successfully", request);
  }



}
