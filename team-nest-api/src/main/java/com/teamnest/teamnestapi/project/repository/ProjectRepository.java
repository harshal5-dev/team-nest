package com.teamnest.teamnestapi.project.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.teamnest.teamnestapi.project.entity.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, UUID> {

}
