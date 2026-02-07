package com.teamnest.teamnestapi.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "role")
@FilterDef(
  name = "tenantFilter",
  parameters = @ParamDef(name = "tenantId", type = UUID.class)
)
@Filter(
  name = "tenantFilter",
  condition = "tenant_id = :tenantId"
)
public class Role extends BaseModel {

  @Column(name = "name", nullable = false)
  private String name;
}
