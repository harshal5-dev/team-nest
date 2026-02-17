package com.teamnest.teamnestapi.models;

import java.time.Instant;
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
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tasks")
@FilterDef(name = "tenantFilter", parameters = @ParamDef(name = "tenantId", type = UUID.class))
@Filter(name = "tenantFilter", condition = "tenant_id = :tenantId")
public class Task extends BaseModel {

  @Column(name = "title", nullable = false, length = 250)
  private String title;

  @Column(name = "description", length = 1000)
  private String description;

  @Column(name = "due_date")
  private Instant dueDate;

  @Enumerated(EnumType.STRING)
  @Column(name = "task_status", nullable = false, length = 20)
  private TaskStatus taskStatus = TaskStatus.TODO;

  @ManyToOne
  @JoinColumn(name = "assigned_user_id", nullable = true)
  private User assignedUser;

  @ManyToOne
  @JoinColumn(name = "project_id", nullable = false)
  private Project project;

  @PrePersist
  public void assignTenant() {
    if (TenantContext.getTenantId() == null) {
      throw new TenantNotResolvedException();
    }
    this.tenantId = TenantContext.getTenantId();
  }
}
