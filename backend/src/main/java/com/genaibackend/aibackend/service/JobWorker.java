package com.genaibackend.aibackend.service;

import com.genaibackend.aibackend.entity.Job;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    @Scheduled(fixedDelay = 2000)
    public void processJobs() {
        List<Job> jobs = jobService.getPendingJobs();
        for (Job job : jobs) {
            processSingleJob(job);
        }
    }

    private void processSingleJob(Job job) {
        log.info("Starting Job: {}", job.getId());

        try {
            job.setStatus(Job.JobStatus.PROCESSING);
            jobService.saveJob(job);

            //  EXECUTE AI (The Magic)
            String aiResponse = aiService.executeTool(job.getToolName(), job.getInputData());

            //  Success Update
            job.setResponseData(aiResponse);
            job.setStatus(Job.JobStatus.COMPLETED);
            job.setCompletedAt(java.time.LocalDateTime.now());

            //  Track Usage (Simple estimation: 1 char ~= 1 token)
            int estimatedTokens = aiResponse.length();
            job.setTokenUsage(estimatedTokens);
            job.setCost(estimatedTokens * 0.0000005); // Dummy cost calc

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