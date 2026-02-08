package com.teamnest.teamnestapi.models;

import java.util.UUID;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import com.teamnest.teamnestapi.contexts.TenantContext;
import com.teamnest.teamnestapi.exceptions.TenantNotResolvedException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "role", uniqueConstraints = @UniqueConstraint(columnNames = {"name", "tenant_id"}))
@FilterDef(name = "tenantFilter", parameters = @ParamDef(name = "tenantId", type = UUID.class))
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId OR tenant_id IS NULL")
public class Role extends BaseModel {

  @Column(name = "name", nullable = false)
  private String name;

  @Enumerated(EnumType.STRING)
  @Column(name = "scope", nullable = false)
  private Scope scope;

  @PrePersist
  public void assignTenant() {
    if (scope == Scope.PLATFORM) {
      this.tenantId = null;
      return;
    }

    UUID tenantId = TenantContext.getTenantId();
    if (tenantId == null) {
      throw new TenantNotResolvedException();
    }
    this.tenantId = tenantId;
  }
}
