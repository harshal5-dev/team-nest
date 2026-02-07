package com.teamnest.teamnestapi.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "project")
@FilterDef(
  name = "tenantFilter",
  parameters = @ParamDef(name = "tenantId", type = UUID.class)
)
@Filter(
  name = "tenantFilter",
  condition = "tenant_id = :tenantId"
)
public class Project extends BaseModel {

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "description", length = 500)
  private String description;

  @OneToMany(mappedBy = "project", fetch = FetchType.LAZY)
  List<Task> tasks = new ArrayList<>();

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
    name = "projects_users",
    joinColumns = @JoinColumn(name = "project_id"),
    inverseJoinColumns = @JoinColumn(name = "user_id")
  )
  private List<User> users = new ArrayList<>();
}
