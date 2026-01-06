package com.genaibackend.aibackend.service;

import com.genaibackend.aibackend.entity.Job;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class JobWorker {

    private static final Logger log = LoggerFactory.getLogger(JobWorker.class);

    private final JobService jobService;
    private final AIService aiService;

    public JobWorker(JobService jobService, AIService aiService) {
        this.jobService = jobService;
        this.aiService = aiService;
    }

    // 1. EVENT TRIGGER: Called immediately by the Controller when a user submits data.
    // @Async ensures this runs in a separate thread so the user gets an instant "Job Created" response.
    @Async
    public void triggerJobProcessing() {
        processPendingJobs();
    }

    // 2. SAFETY NET: Runs once every 5 minutes to pick up any jobs that might have stuck during a restart.
    // 300000ms = 5 minutes.
    @Scheduled(fixedDelay = 300000)
    public void cleanupStrandedJobs() {
        processPendingJobs();
    }

    private void processPendingJobs() {
        List<Job> jobs = jobService.getPendingJobs();
        if (jobs.isEmpty()) return; // Don't log if nothing to do

        log.info("Worker Woken Up: Found {} jobs", jobs.size());
        for (Job job : jobs) {
            processSingleJob(job);
        }
    }

    private void processSingleJob(Job job) {
        log.info("Starting Job: {}", job.getId());

        try {
            job.setStatus(Job.JobStatus.PROCESSING);
            jobService.saveJob(job);

            // EXECUTE AI
            String aiResponse = aiService.executeTool(job.getToolName(), job.getInputData());

            // Success Update
            job.setResponseData(aiResponse);
            job.setStatus(Job.JobStatus.COMPLETED);
            job.setCompletedAt(java.time.LocalDateTime.now());

            // Simple Token Estimation
            int estimatedTokens = aiResponse != null ? aiResponse.length() : 0;
            job.setTokenUsage(estimatedTokens);
            job.setCost(estimatedTokens * 0.0000005); 

            jobService.saveJob(job);
            log.info("Job {} SUCCESS. Tokens: {}", job.getId(), estimatedTokens);

        } catch (Exception e) {
            log.error("Job {} FAILED", job.getId(), e);
            job.setResponseData("Error: " + e.getMessage());
            job.setStatus(Job.JobStatus.FAILED);
            jobService.saveJob(job);
        }
    }
}