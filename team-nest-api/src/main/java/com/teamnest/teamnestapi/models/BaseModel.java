package com.teamnest.teamnestapi.models;

import com.teamnest.teamnestapi.contexts.TenantContext;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;
import java.util.UUID;

@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
public abstract class BaseModel {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name = "tenant_id", nullable = false, updatable = false)
  protected UUID tenantId;

  @CreatedDate
  @Column(name = "created_at", nullable = false, updatable = false)
  private Instant createdAt;

  @LastModifiedDate
  @Column(name = "last_modified_at", nullable = false)
  private Instant lastModifiedAt;

  @Enumerated(EnumType.STRING)
  @Column(name = "state", nullable = false)
  private State state = State.ACTIVE;

  @PrePersist
  public void assignTenant() {
    this.tenantId = TenantContext.getTenantId();
  }
}
