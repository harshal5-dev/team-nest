package com.teamnest.teamnestapi.models;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import com.teamnest.teamnestapi.contexts.TenantContext;
import com.teamnest.teamnestapi.exceptions.TenantNotResolvedException;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "users")
@FilterDef(name = "tenantFilter", parameters = @ParamDef(name = "tenantId", type = UUID.class))
@Filter(name = "tenantFilter", condition = "tenantId = :tenantId")
public class User extends BaseModel {

  @Column(name = "first_name", nullable = false, length = 100)
  private String firstName;

  @Column(name = "last_name", nullable = false, length = 100)
  private String lastName;

  @Column(name = "email", nullable = false, unique = true, length = 250)
  private String email;

  @Column(name = "password", nullable = false, length = 250)
  private String password;

  @OneToMany(mappedBy = "assignedUser")
  private List<Task> tasks = new ArrayList<>();

  @ManyToMany(cascade = {CascadeType.REMOVE})
  @JoinTable(name = "users_roles", joinColumns = @JoinColumn(name = "user_id"),
      inverseJoinColumns = @JoinColumn(name = "role_id"))
  private Set<Role> roles = new HashSet<>();

  @ManyToMany(mappedBy = "users")
  private List<Project> projects = new ArrayList<>();

  @PrePersist
  public void assignTenant() {
    if (TenantContext.getTenantId() == null) {
      throw new TenantNotResolvedException();
    }
    this.tenantId = TenantContext.getTenantId();
  }
}
