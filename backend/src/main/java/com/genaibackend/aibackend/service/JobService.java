package com.genaibackend.aibackend.service;

import com.genaibackend.aibackend.entity.Job;
import com.genaibackend.aibackend.repository.JobRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;

    // Explicit Constructor for Dependency Injection
    public JobService(JobRepository jobRepository) {
        this.jobRepository = jobRepository;
    }

    public String createJob(String toolName, String inputData) {

        // SAFETY CHECK: Simple Rate Limiter
        // implemented a sliding window rate limiter to control costs."
        LocalDateTime twentyFourHoursAgo = LocalDateTime.now().minusDays(1);
        long jobsToday = jobRepository.countByCreatedAtAfter(twentyFourHoursAgo);

        if (jobsToday >= 50) {
            throw new RuntimeException("Daily quota exceeded. Please try again tomorrow.");
        }
        Job job = new Job();
        job.setToolName(toolName);
        job.setInputData(inputData);
        job.setStatus(Job.JobStatus.CREATED);

        return jobRepository.save(job).getId();
    }

    public List<Job> getPendingJobs() {
//        return jobRepository.findByStatus(Job.JobStatus.CREATED);
        return jobRepository.findByStatusOrderByCreatedAtAsc(Job.JobStatus.CREATED);
    }

    public void saveJob(Job job) {
        jobRepository.save(job);
    }

    public Job getJob(String id) {
        return jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));
    }
}