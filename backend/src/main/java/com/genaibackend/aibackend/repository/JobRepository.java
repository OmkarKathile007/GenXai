package com.genaibackend.aibackend.repository;




import com.genaibackend.aibackend.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;


import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, String> {
    // Find jobs that are waiting to be processed
//    List<Job> findByStatus(Job.JobStatus status);
    long countByCreatedAtAfter(LocalDateTime date);

    List<Job> findByStatusOrderByCreatedAtAsc(Job.JobStatus status);
}
