package com.teamnest.teamnestapi.exceptions;

import java.io.IOException;
import java.time.LocalDateTime;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomBasicAuthenticationEntryPoint implements AuthenticationEntryPoint {

  @Override
  public void commence(HttpServletRequest request, HttpServletResponse response,
      AuthenticationException authException) throws IOException {

    // Log the authentication failure without stack trace
    log.warn("Authentication failed for request: {} - {}", request.getRequestURI(),
        authException.getMessage());

    response.setStatus(HttpStatus.UNAUTHORIZED.value());
    response.setContentType("application/json;charset=UTF-8");

    String message = authException.getMessage() != null ? authException.getMessage()
        : "Authentication is required to access this resource";
    String path = request.getRequestURI();

    String jsonResponse = String.format(
        "{\"apiPath\": \"%s\",  \"message\": \"%s\", \"validationErrors\": {}, \"timestamp\": \"%s\"}",
        path, message, null, LocalDateTime.now());

    response.getWriter().write(jsonResponse);
  }
}
