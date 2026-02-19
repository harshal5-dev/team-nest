package com.teamnest.teamnestapi.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.oauth2.server.resource.web.BearerTokenResolver;
import org.springframework.security.oauth2.server.resource.web.authentication.BearerTokenAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;
import com.teamnest.teamnestapi.exceptions.CustomAccessDeniedHandler;
import com.teamnest.teamnestapi.exceptions.CustomBasicAuthenticationEntryPoint;
import com.teamnest.teamnestapi.filters.TenantFilter;
import com.teamnest.teamnestapi.security.AppUsernamePwdAuthenticationProvider;
import com.teamnest.teamnestapi.security.CookieOrHeaderBearerTokenResolver;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

  private final CorsConfigurationSource corsConfigurationSource;

  @Bean
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity httpSecurity,
      BearerTokenResolver bearerTokenResolver, TenantFilter tenantFilter) throws Exception {

    httpSecurity
        .sessionManagement(smc -> smc.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    httpSecurity.cors(cors -> cors.configurationSource(corsConfigurationSource));
    httpSecurity.csrf(AbstractHttpConfigurer::disable);
    httpSecurity
        .authorizeHttpRequests(authorizeRequests -> authorizeRequests
            .requestMatchers("/api/auth/register", "/api/auth/login", "/api/auth/refresh",
                "/api/auth/logout", "/.well-known/jwks.json")
            .permitAll().anyRequest().authenticated());
    httpSecurity.exceptionHandling(ehc -> ehc.accessDeniedHandler(new CustomAccessDeniedHandler())
        .authenticationEntryPoint(new CustomBasicAuthenticationEntryPoint()));
    httpSecurity.oauth2ResourceServer(oauth2 -> oauth2.bearerTokenResolver(bearerTokenResolver)
        .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())));
    httpSecurity.addFilterAfter(tenantFilter, BearerTokenAuthenticationFilter.class);

    return httpSecurity.build();
  }

  @Bean
  AuthenticationManager authenticationManager(UserDetailsService userDetailsService,
      PasswordEncoder passwordEncoder) throws Exception {
    AppUsernamePwdAuthenticationProvider provider =
        new AppUsernamePwdAuthenticationProvider(userDetailsService, passwordEncoder);
    ProviderManager providerManager = new ProviderManager(provider);
    providerManager.setEraseCredentialsAfterAuthentication(true);

    return providerManager;
  }


  @Bean
  PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

  @Bean
  JwtAuthenticationConverter jwtAuthenticationConverter() {
    JwtGrantedAuthoritiesConverter converter = new JwtGrantedAuthoritiesConverter();
    converter.setAuthorityPrefix("ROLE_");
    converter.setAuthoritiesClaimName("roles");
    JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
    jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(converter);
    return jwtAuthenticationConverter;
  }

  @Bean
  BearerTokenResolver bearerTokenResolver(JwtProperties properties) {
    return new CookieOrHeaderBearerTokenResolver(properties);
  }

  @Bean
  FilterRegistrationBean<TenantFilter> tenantFilterRegistration(TenantFilter tenantFilter) {
    FilterRegistrationBean<TenantFilter> registration = new FilterRegistrationBean<>(tenantFilter);
    registration.setEnabled(false);
    return registration;
  }

}
