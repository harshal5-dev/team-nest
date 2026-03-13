package com.teamnest.teamnestapi.services;

import java.util.List;
import com.teamnest.teamnestapi.models.PermissionLookup;

public interface IPermissionLookupService {

  List<PermissionLookup> getAllPermissions();

}
