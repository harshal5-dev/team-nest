package com.teamnest.teamnestapi.services.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.teamnest.teamnestapi.contexts.TenantContext;
import com.teamnest.teamnestapi.dtos.TenantRegistrationReqDto;
import com.teamnest.teamnestapi.dtos.TenantRegistrationResDto;
import com.teamnest.teamnestapi.mappers.TenantMapper;
import com.teamnest.teamnestapi.mappers.UserMapper;
import com.teamnest.teamnestapi.models.Tenant;
import com.teamnest.teamnestapi.models.User;
import com.teamnest.teamnestapi.services.IEmailService;
import com.teamnest.teamnestapi.services.IPermissionService;
import com.teamnest.teamnestapi.services.ITenantRegisterService;
import com.teamnest.teamnestapi.services.ITenantService;
import com.teamnest.teamnestapi.services.IUserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TenantRegisterService implements ITenantRegisterService {

  private final ITenantService tenantService;
  private final IUserService userService;
  private final IEmailService emailService;
  private final IPermissionService permissionService;


  @Transactional
  @Override
  public TenantRegistrationResDto registerTenant(
      TenantRegistrationReqDto tenantRegistrationReqDto) {
    Tenant tenant = TenantMapper.toTenant(tenantRegistrationReqDto.getTenantInfo(), new Tenant());
    Tenant savedTenant = tenantService.createTenant(tenant);
    TenantContext.setTenant(savedTenant.getId());

    try {
      permissionService.createDefaultPermissionsForTenant();

      User user = UserMapper.toUser(tenantRegistrationReqDto.getOwnerInfo(), new User());
      user.setTenantId(savedTenant.getId());
      String rawPassword = tenantRegistrationReqDto.getOwnerInfo().getPassword();
      user.setPassword(rawPassword);
      User savedUser = userService.createUser(user);

      emailService.sendWelcomeEmail(savedUser.getEmail(), savedUser.getFirstName());

      return TenantMapper.toTenantRegistrationResDto(savedTenant, savedUser);
    } catch (Exception e) {
      throw new RuntimeException("Failed to register tenant: " + e.getMessage());
    } finally {
      TenantContext.clear();
    }
  }
}
