package com.teamnest.teamnestapi.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "permissions_lookup")
public class PermissionLookup extends BaseModel {

  @Column(name = "name", nullable = false, unique = true, length = 100)
  private String name;

  @Column(name = "key", nullable = false, unique = true, length = 100)
  private String key;

  @Column(name = "module", length = 100)
  @Enumerated(EnumType.STRING)
  private PermissionModule moduleKey;

}
