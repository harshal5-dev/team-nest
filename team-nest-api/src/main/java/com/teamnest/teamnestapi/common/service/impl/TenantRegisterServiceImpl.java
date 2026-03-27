package com.teamnest.teamnestapi.common.service.impl;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.teamnest.teamnestapi.common.dto.TenantRegistrationReqDto;
import com.teamnest.teamnestapi.common.dto.TenantRegistrationResDto;
import com.teamnest.teamnestapi.common.mapper.CommonMapper;
import com.teamnest.teamnestapi.common.service.EmailService;
import com.teamnest.teamnestapi.common.service.TenantRegisterService;
import com.teamnest.teamnestapi.services.PermissionService;
import com.teamnest.teamnestapi.tenant.context.TenantContext;
import com.teamnest.teamnestapi.tenant.entity.Tenant;
import com.teamnest.teamnestapi.tenant.mapper.TenantMapper;
import com.teamnest.teamnestapi.tenant.service.TenantService;
import com.teamnest.teamnestapi.user.entity.User;
import com.teamnest.teamnestapi.user.mapper.UserMapper;
import com.teamnest.teamnestapi.user.service.UserService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TenantRegisterServiceImpl implements TenantRegisterService {

  private final TenantService tenantService;
  private final UserService userService;
  private final EmailService emailService;
  private final PermissionService permissionService;
  private final CommonMapper commonMapper;
  private final TenantMapper tenantMapper;
  private final UserMapper userMapper;

  @Transactional
  @Override
  public TenantRegistrationResDto registerTenant(
      TenantRegistrationReqDto tenantRegistrationReqDto) {
    Tenant tenant = tenantMapper.toTenant(tenantRegistrationReqDto.getTenantInfo(), new Tenant());
    Tenant savedTenant = tenantService.createTenant(tenant);
    TenantContext.setTenant(savedTenant.getId());

    try {
      permissionService.createDefaultPermissionsForTenant();

      User user = userMapper.toUser(tenantRegistrationReqDto.getOwnerInfo(), new User());
      user.setTenantId(savedTenant.getId());
      String rawPassword = tenantRegistrationReqDto.getOwnerInfo().getPassword();
      user.setPassword(rawPassword);
      User savedUser = userService.createUser(user);

      emailService.sendWelcomeEmail(savedUser.getEmail(), savedUser.getFirstName());

      return commonMapper.toTenantRegistrationResDto(savedTenant, savedUser);
    } catch (Exception e) {
      throw new RuntimeException("Failed to register tenant: " + e.getMessage());
    } finally {
      TenantContext.clear();
    }
  }
}
