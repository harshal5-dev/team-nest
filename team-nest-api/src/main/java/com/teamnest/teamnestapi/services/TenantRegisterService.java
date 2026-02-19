package com.teamnest.teamnestapi.services;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.teamnest.teamnestapi.contexts.TenantContext;
import com.teamnest.teamnestapi.dtos.TenantRegistrationReqDto;
import com.teamnest.teamnestapi.dtos.TenantRegistrationResDto;
import com.teamnest.teamnestapi.mappers.TenantMapper;
import com.teamnest.teamnestapi.mappers.UserMapper;
import com.teamnest.teamnestapi.models.Tenant;
import com.teamnest.teamnestapi.models.User;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TenantRegisterService implements ITenantRegisterService {

  private final ITenantService tenantService;
  private final IUserService userService;
  private final IEmailService emailService;


  @Transactional
  @Override
  public TenantRegistrationResDto registerTenant(
      TenantRegistrationReqDto tenantRegistrationReqDto) {
    Tenant tenant = TenantMapper.toTenant(tenantRegistrationReqDto.getTenantInfo());
    Tenant savedTenant = tenantService.createTenant(tenant);
    TenantContext.setTenant(savedTenant.getTenantId());

    try {
      User user = UserMapper.toUser(tenantRegistrationReqDto.getOwnerInfo());
      user.setTenantId(savedTenant.getTenantId());
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
