package com.teamnest.teamnestapi.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "task")
@FilterDef(
  name = "tenantFilter",
  parameters = @ParamDef(name = "tenantFilter", type = UUID.class)
)
@Filter(
  name = "tenantFilter",
  condition = "tenant_id = :tenantId"
)
public class Task extends BaseModel {

  @Column(name = "title", nullable = false)
  private String title;

  @Column(name = "description", length = 1000)
    private String description;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "assigned_user_id")
  private User assignedUser;

  @ManyToOne(fetch =  FetchType.LAZY)
  @JoinColumn(name = "project_id")
  private Project project;
}
