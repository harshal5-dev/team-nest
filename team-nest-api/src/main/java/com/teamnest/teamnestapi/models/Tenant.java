package com.teamnest.teamnestapi.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "tenants")
public class Tenant extends BaseModel {

  @Column(name = "name", nullable = false, unique = true, length = 150)
  private String name;
}
