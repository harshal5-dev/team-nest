package com.teamnest.teamnestapi.models;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import com.teamnest.teamnestapi.common.entity.BaseModel;
import com.teamnest.teamnestapi.tenant.context.TenantContext;
import com.teamnest.teamnestapi.tenant.exception.TenantNotResolvedException;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "roles",
    uniqueConstraints = {@UniqueConstraint(columnNames = {"name", "tenant_id"}),
        @UniqueConstraint(columnNames = {"code", "tenant_id"})},
    indexes = {@Index(name = "idx_roles_tenant_id", columnList = "tenant_id")})
@FilterDef(name = "tenantFilter", parameters = @ParamDef(name = "tenantId", type = UUID.class))
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId")
public class Role extends BaseModel {

  @Column(name = "name", nullable = false, length = 100)
  private String name;

  @Column(name = "code", length = 100, nullable = false)
  private String code;

  @Column(name = "tenant_id", unique = true, updatable = false)
  private UUID tenantId;

  @Enumerated(EnumType.STRING)
  @Column(name = "scope", nullable = false, length = 20)
  private RoleScope scope = RoleScope.TENANT;

  @ManyToMany(cascade = {CascadeType.REMOVE})
  @JoinTable(name = "roles_permissions", joinColumns = @JoinColumn(name = "role_id"),
      inverseJoinColumns = @JoinColumn(name = "permission_id"))
  private Set<Permission> permissions = new HashSet<>();

  @ManyToMany(mappedBy = "roles")
  private Set<User> users = new HashSet<>();

  @PrePersist
  public void assignTenant() {
    UUID tenantId = TenantContext.getTenantId();
    if (tenantId == null) {
      throw new TenantNotResolvedException();
    }
    this.tenantId = tenantId;
  }
}
