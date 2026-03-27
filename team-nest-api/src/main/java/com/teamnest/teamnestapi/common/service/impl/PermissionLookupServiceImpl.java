package com.teamnest.teamnestapi.common.service.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.common.entity.PermissionLookup;
import com.teamnest.teamnestapi.common.repository.PermissionLookRepository;
import com.teamnest.teamnestapi.common.service.PermissionLookupService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PermissionLookupServiceImpl implements PermissionLookupService {

  private final PermissionLookRepository permissionLookRepository;

  @Override
  public List<PermissionLookup> getAllPermissions() {
    return permissionLookRepository.findAll();
  }
}
