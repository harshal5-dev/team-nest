package com.teamnest.teamnestapi.tenant.filter;

import java.io.IOException;
import java.util.UUID;

import com.teamnest.teamnestapi.security.service.JwtService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import lombok.RequiredArgsConstructor;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import com.teamnest.teamnestapi.tenant.context.TenantContext;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class TenantFilter extends OncePerRequestFilter {

  private final JwtService jwtService;
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
         UUID tenantId = jwtService.extractTenantIdFromToken(jwtAuth.getToken().getTokenValue());
          if (tenantId != null) {
            TenantContext.setTenant(tenantId);
          }
        }
      }

      filterChain.doFilter(request, response);
    } finally {
      TenantContext.clear();
    }
  }
}
