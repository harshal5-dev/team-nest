package com.teamnest.teamnestapi.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

import java.util.*;

@Getter
@Setter
@Entity
@Table(name = "users")
@FilterDef(
  name = "tenantFilter",
  parameters = @ParamDef(name = "tenantId", type = UUID.class)
)
@Filter(
  name = "tenantFilter",
  condition = "tenantId = :tenantId"
)
public class User extends BaseModel {

  @Column(name = "name", nullable = false)
  private String name;

  @Column(name = "email", nullable = false, unique = true)
  private String email;

  @Column(name = "password", nullable = false)
  private String password;

  @OneToMany(mappedBy = "assignedUser", fetch = FetchType.LAZY)
  private List<Task> tasks = new ArrayList<>();

  @ManyToMany(fetch = FetchType.LAZY)
  @JoinTable(
    name = "users_roles",
    joinColumns = @JoinColumn(name = "user_id"),
    inverseJoinColumns = @JoinColumn(name = "role_id")
  )
  private Set<Role> roles = new HashSet<>();
}
