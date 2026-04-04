package com.teamnest.teamnestapi.config;

import com.teamnest.teamnestapi.tenant.context.TenantContext;
import jakarta.persistence.EntityManagerFactory;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Session;
import org.jspecify.annotations.NonNull;
import org.springframework.orm.jpa.EntityManagerHolder;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import java.util.UUID;

@Slf4j
public class TenantAwareJpaTransactionManager extends JpaTransactionManager {

  public TenantAwareJpaTransactionManager(EntityManagerFactory emf) {
    super(emf);
  }

  @Override
  protected void doBegin(@NonNull Object transaction, @NonNull TransactionDefinition definition) {
    // 1. Let Spring do its normal transaction setup first
    //    (opens Session, binds it to thread, starts transaction)
    super.doBegin(transaction, definition);

    // 2. Now the Session exists — grab it and enable the filter
    UUID tenantId = TenantContext.getTenantId();

    if (tenantId != null) {
      EntityManagerHolder holder = (EntityManagerHolder)
        TransactionSynchronizationManager
          .getResource(obtainEntityManagerFactory());

      if (holder != null) {
        Session session = holder.getEntityManager().unwrap(Session.class);
        session.enableFilter("tenantFilter")
          .setParameter("tenantId", tenantId);

        log.debug("Tenant filter enabled — tenantId={}", tenantId);
      }
    }
  }

}
