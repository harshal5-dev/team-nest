package com.teamnest.teamnestapi.controllers;

import com.teamnest.teamnestapi.dtos.AppResDto;
import com.teamnest.teamnestapi.dtos.SuccessResDto;
import com.teamnest.teamnestapi.dtos.TenantRegistrationReqDto;
import com.teamnest.teamnestapi.dtos.TenantRegistrationResDto;
import com.teamnest.teamnestapi.services.ITenantRegisterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tenants")
@RequiredArgsConstructor
public class TenantController {

  private final ITenantRegisterService tenantRegisterService;


  @PostMapping("/register")
  public ResponseEntity<AppResDto<TenantRegistrationResDto>> registerTenant(
    @Valid @RequestBody TenantRegistrationReqDto tenantRegistrationReqDto) {
      TenantRegistrationResDto tenantRegistrationResDto =
        tenantRegisterService.registerTenant(tenantRegistrationReqDto);
      AppResDto<TenantRegistrationResDto> appResDto =
        new SuccessResDto<>("Tenant registered successfully", tenantRegistrationResDto);

    return ResponseEntity.status(HttpStatus.CREATED).body(appResDto);
  }

}
