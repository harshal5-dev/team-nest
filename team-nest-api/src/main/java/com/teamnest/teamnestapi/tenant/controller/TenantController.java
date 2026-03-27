package com.teamnest.teamnestapi.tenant.controller;

import java.util.UUID;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.teamnest.teamnestapi.common.response.AppApiResponse;
import com.teamnest.teamnestapi.common.response.ResponseBuilder;
import com.teamnest.teamnestapi.tenant.dto.TenantInfoDTO;
import com.teamnest.teamnestapi.tenant.dto.TenantResDTO;
import com.teamnest.teamnestapi.tenant.entity.Tenant;
import com.teamnest.teamnestapi.tenant.mapper.TenantMapper;
import com.teamnest.teamnestapi.tenant.service.TenantService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/api/v1/tenants")
@RequiredArgsConstructor
@Tag(name = "Tenants", description = "Endpoints for tenant management operations")
public class TenantController {

  private final TenantService tenantService;

  @Operation(summary = "Update tenant information",
      description = "Update the information of an existing tenant/organization. Requires tenant ID and updated tenant details.")
  @ApiResponses(
      value = {@ApiResponse(responseCode = "200", description = "Tenant updated successfully"),
          @ApiResponse(responseCode = "400", description = "Validation error",
              content = @Content(schema = @Schema(implementation = AppApiResponse.class))),
          @ApiResponse(responseCode = "401", description = "Not authenticated",
              content = @Content(schema = @Schema(implementation = AppApiResponse.class)))})
  @PutMapping("/{id}")
  public ResponseEntity<AppApiResponse<TenantResDTO>> updateTenant(@PathVariable UUID id,
      @Valid @RequestBody TenantInfoDTO tenantInfoDto, HttpServletRequest request) {
    Tenant updatedTenant = tenantService.updateTenant(id, tenantInfoDto);
    TenantResDTO tenantResDto = TenantMapper.toTenantResDto(updatedTenant);

    return ResponseBuilder.ok(tenantResDto, "Tenant updated successfully", request);
  }


}
