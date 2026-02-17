package com.teamnest.teamnestapi.models;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import com.teamnest.teamnestapi.contexts.TenantContext;
import com.teamnest.teamnestapi.exceptions.TenantNotResolvedException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "permissions",
    uniqueConstraints = @UniqueConstraint(columnNames = {"name", "tenant_id"}))
@FilterDef(name = "tenantFilter", parameters = @ParamDef(name = "tenantId", type = UUID.class))
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId OR tenant_id IS NULL")
public class Permission extends BaseModel {

  @Column(name = "name", nullable = false, length = 100)
  private String name;

  @ManyToMany(mappedBy = "permissions")
  private Set<Role> roles = new HashSet<>();

  @PrePersist
  public void assignTenant() {
    if (TenantContext.getTenantId() == null) {
      throw new TenantNotResolvedException();
    }
    this.tenantId = TenantContext.getTenantId();
  }

}
