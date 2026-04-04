package com.teamnest.teamnestapi.common.entity;

import java.util.UUID;
import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;

@Getter
@Setter
@MappedSuperclass
@FilterDef(name = "tenantFilter", parameters = @ParamDef(name = "tenantId", type = UUID.class))
public abstract class BaseModelWithTenant extends BaseModel {

  @Column(name = "tenant_id", nullable = false, updatable = false)
  protected UUID tenantId;
}
