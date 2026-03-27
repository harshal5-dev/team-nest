package com.teamnest.teamnestapi.task.repository;

import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.teamnest.teamnestapi.task.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, UUID> {

}
