package com.teamnest.teamnestapi.models;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import com.teamnest.teamnestapi.common.entity.BaseModelWithTenant;
import com.teamnest.teamnestapi.tenant.context.TenantContext;
import com.teamnest.teamnestapi.tenant.exception.TenantNotResolvedException;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
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
    uniqueConstraints = {@UniqueConstraint(columnNames = {"name", "tenant_id"}),
        @UniqueConstraint(columnNames = {"code", "tenant_id"})},
    indexes = {@Index(name = "idx_permissions_tenant_id", columnList = "tenant_id")})
@FilterDef(name = "tenantFilter", parameters = @ParamDef(name = "tenantId", type = UUID.class))
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId")
public class Permission extends BaseModelWithTenant {

  @Column(name = "name", nullable = false, length = 100)
  private String name;

  @Column(name = "code", nullable = false, length = 100)
  private String code;

  @Column(name = "module", length = 100)
  @Enumerated(EnumType.STRING)
  private PermissionModule moduleKey;

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
