package com.teamnest.teamnestapi.common.service;

import java.util.List;
import com.teamnest.teamnestapi.common.entity.PermissionLookup;

public interface PermissionLookupService {

  List<PermissionLookup> getAllPermissions();

}
