package com.teamnest.teamnestapi.role.repository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import com.teamnest.teamnestapi.role.entity.Role;

public final class RoleSpecification {

  private RoleSpecification() {
    // Private constructor to prevent instantiation
  }

  /**
   * Filter by name — case-insensitive partial match (SQL LIKE '%value%')
   */
  public static Specification<Role> hasName(String name) {
    return (root, query, criteriaBuilder) -> {
      if (!StringUtils.hasText(name))
        return null; // null = "no filter"
      return criteriaBuilder.like(criteriaBuilder.lower(root.get("name")),
          "%" + name.toLowerCase() + "%");
    };
  }

  public static Specification<Role> buildFilter(String name) {
    return Specification.where(hasName(name));
  }

}
