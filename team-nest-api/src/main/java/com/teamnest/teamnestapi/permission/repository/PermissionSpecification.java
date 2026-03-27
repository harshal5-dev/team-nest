package com.teamnest.teamnestapi.permission.repository;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;
import com.teamnest.teamnestapi.permission.entity.Permission;

public class PermissionSpecification {

  private PermissionSpecification() {
    // Private constructor to prevent instantiation
  }

  /**
   * Filter by name — case-insensitive partial match (SQL LIKE '%value%')
   */
  public static Specification<Permission> hasName(String name) {
    return (root, query, criteriaBuilder) -> {
      if (!StringUtils.hasText(name))
        return null; // null = "no filter"
      return criteriaBuilder.like(criteriaBuilder.lower(root.get("name")),
          "%" + name.toLowerCase() + "%");
    };
  }

  public static Specification<Permission> buildFilter(String name) {
    return Specification.where(hasName(name));
  }

}
