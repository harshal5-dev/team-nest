package com.teamnest.teamnestapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class TeamNestApiApplication {

  public static void main(String[] args) {
    SpringApplication.run(TeamNestApiApplication.class, args);
  }

}
