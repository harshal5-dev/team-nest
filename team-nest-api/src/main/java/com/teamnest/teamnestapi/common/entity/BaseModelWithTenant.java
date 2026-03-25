package com.teamnest.teamnestapi.common.entity;

import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public abstract class BaseModelWithTenant extends BaseModel {

  @Column(name = "tenant_id", nullable = false, updatable = false)
  protected UUID tenantId;
}
