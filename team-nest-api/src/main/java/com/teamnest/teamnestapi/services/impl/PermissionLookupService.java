package com.teamnest.teamnestapi.services.impl;

import java.util.List;
import org.springframework.stereotype.Service;
import com.teamnest.teamnestapi.models.PermissionLookup;
import com.teamnest.teamnestapi.repositories.PermissionLookRepository;
import com.teamnest.teamnestapi.services.IPermissionLookupService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PermissionLookupService implements IPermissionLookupService {

  private final PermissionLookRepository permissionLookRepository;

  @Override
  public List<PermissionLookup> getAllPermissions() {
    return permissionLookRepository.findAll();
  }
}
