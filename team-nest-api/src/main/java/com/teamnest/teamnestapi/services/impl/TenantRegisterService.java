package com.teamnest.teamnestapi.services.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.teamnest.teamnestapi.common.dto.TenantRegistrationReqDto;
import com.teamnest.teamnestapi.common.dto.TenantRegistrationResDto;
import com.teamnest.teamnestapi.contexts.TenantContext;
import com.teamnest.teamnestapi.mappers.UserMapper;
import com.teamnest.teamnestapi.models.User;
import com.teamnest.teamnestapi.services.IEmailService;
import com.teamnest.teamnestapi.services.ITenantRegisterService;
import com.teamnest.teamnestapi.services.IUserService;
import com.teamnest.teamnestapi.services.PermissionService;
import com.teamnest.teamnestapi.tenant.entity.Tenant;
import com.teamnest.teamnestapi.tenant.mapper.TenantMapper;
import com.teamnest.teamnestapi.tenant.service.TenantService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TenantRegisterService implements ITenantRegisterService {

  private final TenantService tenantService;
  private final IUserService userService;
  private final IEmailService emailService;
  private final PermissionService permissionService;

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
