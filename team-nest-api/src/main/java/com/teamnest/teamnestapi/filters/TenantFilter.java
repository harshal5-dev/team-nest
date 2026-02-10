package com.teamnest.teamnestapi.filters;

import java.io.IOException;
import java.util.UUID;
import org.hibernate.Session;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.teamnest.teamnestapi.contexts.TenantContext;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class TenantFilter extends OncePerRequestFilter {

  @PersistenceContext
  private EntityManager entityManager;

  @Override
  protected void doFilterInternal(@NonNull HttpServletRequest request,
      @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
      throws ServletException, IOException {
    try {
      if (TenantContext.getTenantId() == null) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof JwtAuthenticationToken jwtAuth) {
          Object tenantClaim = jwtAuth.getToken().getClaims().get("tenant_id");
          if (tenantClaim instanceof UUID tenantId) {
            TenantContext.setTenant(tenantId);
          } else if (tenantClaim instanceof String tenantIdStr) {
            try {
              TenantContext.setTenant(UUID.fromString(tenantIdStr));
            } catch (IllegalArgumentException ignored) {
              // Ignore invalid tenant id format and continue without tenant context
            }
          }
        }
      }

      UUID tenantId = TenantContext.getTenantId();

      if (tenantId != null) {
        Session session = entityManager.unwrap(Session.class);
        session.enableFilter("tenantFilter").setParameter("tenantId", tenantId);
      }

      filterChain.doFilter(request, response);
    } finally {
      TenantContext.clear();
    }
  }
}
