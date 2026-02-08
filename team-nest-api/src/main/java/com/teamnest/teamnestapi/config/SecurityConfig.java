package com.teamnest.teamnestapi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfigurationSource;
import com.teamnest.teamnestapi.exceptions.CustomAccessDeniedHandler;
import com.teamnest.teamnestapi.exceptions.CustomBasicAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

  private final CorsConfigurationSource corsConfigurationSource;

  @Bean
  SecurityFilterChain defaultSecurityFilterChain(HttpSecurity httpSecurity) throws Exception {

    httpSecurity
        .sessionManagement(smc -> smc.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
    httpSecurity.cors(cors -> cors.configurationSource(corsConfigurationSource));
    httpSecurity.csrf(AbstractHttpConfigurer::disable);
    httpSecurity.authorizeHttpRequests(authorizeRequests -> authorizeRequests
        .requestMatchers("/api/tenants/register").permitAll().anyRequest().authenticated());
    httpSecurity.exceptionHandling(ehc -> ehc.accessDeniedHandler(new CustomAccessDeniedHandler())
        .authenticationEntryPoint(new CustomBasicAuthenticationEntryPoint()));
    // httpSecurity.addFilterBefore(new JWTTokenValidatorFilter(jwtTokenProvider,
    // userDetailsService),
    // UsernamePasswordAuthenticationFilter.class);

    return httpSecurity.build();
  }

  @Bean
  PasswordEncoder passwordEncoder() {
    return PasswordEncoderFactories.createDelegatingPasswordEncoder();
  }

}
