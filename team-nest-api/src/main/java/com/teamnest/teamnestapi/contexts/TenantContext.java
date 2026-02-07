package com.teamnest.teamnestapi.contexts;

import java.util.UUID;

public final class TenantContext {

  private static final ThreadLocal<UUID> TENANT = new ThreadLocal<>();

  public static void setTenant(UUID tenantId) {
    TENANT.set(tenantId);
  }

  public static UUID getTenantId() {
    return TENANT.get();
  }

  public static void clear() {
    TENANT.remove();
  }

}
