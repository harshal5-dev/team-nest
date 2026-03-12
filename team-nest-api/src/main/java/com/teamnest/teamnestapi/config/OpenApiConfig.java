package com.teamnest.teamnestapi.config;

import java.util.List;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenApiConfig {

  @Bean
  OpenAPI customOpenAPI() {
    final String bearerSchemeName = "Bearer Authentication";
    final String cookieSchemeName = "Cookie Authentication";

    return new OpenAPI()
        .info(new Info().title("TeamNest API")
            .description("TeamNest is a multi-tenant project management platform. "
                + "This API provides endpoints for authentication, tenant management, "
                + "user management, projects, and tasks.")
            .version("1.0.0").contact(new Contact().name("TeamNest").email("support@teamnest.com"))
            .license(new License().name("MIT License").url("https://opensource.org/licenses/MIT")))
        .servers(List
            .of(new Server().url("http://localhost:8080").description("Local Development Server")))
        .addSecurityItem(
            new SecurityRequirement().addList(bearerSchemeName).addList(cookieSchemeName))
        .components(new Components().addSecuritySchemes(bearerSchemeName,
            new SecurityScheme().name(bearerSchemeName).type(SecurityScheme.Type.HTTP)
                .scheme("bearer").bearerFormat("JWT").description("Enter your JWT access token"))
            .addSecuritySchemes(cookieSchemeName,
                new SecurityScheme().name("tn_access_token").type(SecurityScheme.Type.APIKEY)
                    .in(SecurityScheme.In.COOKIE)
                    .description("JWT access token sent as an HTTP-only cookie")));
  }
}
