package com.teamnest.teamnestapi.config;

import jakarta.persistence.EntityManagerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
public class JpaConfig {
  @Bean
  public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
    // Replace Spring's default JpaTransactionManager with our tenant-aware one
    return new TenantAwareJpaTransactionManager(emf);
  }
}
