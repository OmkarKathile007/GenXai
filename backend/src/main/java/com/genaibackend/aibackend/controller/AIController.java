package com.genaibackend.aibackend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.genaibackend.aibackend.entity.Job;
import com.genaibackend.aibackend.service.JobService;
import com.genaibackend.aibackend.service.JobWorker;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AIController {

    private final JobService jobService;
    private final JobWorker jobWorker;
    private final ObjectMapper objectMapper;

    // Inject JobWorker in the constructor
    public AIController(JobService jobService, JobWorker jobWorker, ObjectMapper objectMapper) {
        this.jobService = jobService;
        this.jobWorker = jobWorker;
        this.objectMapper = objectMapper;
    }

    // HELPER METHOD (DRY Principle)
    // Handles creating the job AND triggering the worker instantly
    private ResponseEntity<Map<String, String>> createAndTriggerJob(String toolName, Map<String, Object> payload) {
        try {
            //  Convert Payload to JSON String
            String jsonInput = objectMapper.writeValueAsString(payload);

            //  Create Job in Database (Status: PENDING)
            String jobId = jobService.createJob(toolName, jsonInput);

            //  EVENT TRIGGER: Wake up the worker immediately! (No waiting 2s)
            jobWorker.triggerJobProcessing();

            //  Return Job ID to client
            return ResponseEntity.accepted().body(Map.of(
                    "jobId", jobId,
                    "status", "CREATED",
                    "message", "Request queued. Poll /api/ai/job/" + jobId
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    //  ENDPOINTS

    @PostMapping("/roadmap")
    public ResponseEntity<Map<String, String>> generateRoadmap(@RequestBody Map<String, Object> payload) {
        return createAndTriggerJob("roadmap", payload);
    }

    @PostMapping("/summarize")
    public ResponseEntity<Map<String, String>> summarizeText(@RequestBody Map<String, Object> payload) {
        return createAndTriggerJob("summarizer", payload);
    }

    @PostMapping("/convert")
    public ResponseEntity<Map<String, String>> convertCode(@RequestBody Map<String, Object> payload) {
        return createAndTriggerJob("converter", payload);
    }

    @PostMapping("/email")
    public ResponseEntity<Map<String, String>> generateEmail(@RequestBody Map<String, Object> payload) {
        return createAndTriggerJob("email", payload);
    }

    @PostMapping("/letter")
    public ResponseEntity<Map<String, String>> generateLetter(@RequestBody Map<String, Object> payload) {
        return createAndTriggerJob("letter", payload);
    }

    @PostMapping("/text")
    public ResponseEntity<Map<String, String>> improveText(@RequestBody Map<String, Object> payload) {
        return createAndTriggerJob("improver", payload);
    }

    // STATUS CHECK ENDPOINT ---
    @GetMapping("/job/{jobId}")
    public ResponseEntity<Job> getJobStatus(@PathVariable String jobId) {
        return ResponseEntity.ok(jobService.getJob(jobId));
    }
}