package com.teamnest.teamnestapi.models;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import com.teamnest.teamnestapi.contexts.TenantContext;
import com.teamnest.teamnestapi.exceptions.TenantNotResolvedException;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
@Table(name = "projects")
@FilterDef(name = "tenantFilter", parameters = @ParamDef(name = "tenantId", type = UUID.class))
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId")
public class Project extends BaseModel {

  @Column(name = "name", nullable = false, length = 250)
  private String name;

  @Column(name = "description", length = 500)
  private String description;

  @Enumerated(EnumType.STRING)
  @Column(name = "project_status", nullable = false, length = 20)
  private ProjectStatus projectStatus = ProjectStatus.TODO;

  @ManyToMany(cascade = {CascadeType.REMOVE})
  @JoinTable(name = "projects_users", joinColumns = @JoinColumn(name = "project_id"),
      inverseJoinColumns = @JoinColumn(name = "user_id"))
  private List<User> users = new ArrayList<>();

  @OneToMany(mappedBy = "project")
  List<Task> tasks = new ArrayList<>();

  @PrePersist
  public void assignTenant() {
    if (TenantContext.getTenantId() == null) {
      throw new TenantNotResolvedException();
    }
    this.tenantId = TenantContext.getTenantId();
  }
}
