
package com.genaibackend.aibackend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.genaibackend.aibackend.entity.Job;
import com.genaibackend.aibackend.service.JobService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin
public class AIController {

    private final JobService jobService;
    private final ObjectMapper objectMapper;

    public AIController(JobService jobService, ObjectMapper objectMapper) {
        this.jobService = jobService;
        this.objectMapper = objectMapper;
    }

    // --- NEW ASYNC ENDPOINT ---
    @PostMapping("/roadmap")
    public ResponseEntity<Map<String, String>> generateRoadmap(@RequestBody Map<String, Object> payload) {
        try {

            //  Convert Payload to JSON String for storage
            String jsonInput = objectMapper.writeValueAsString(payload);

            //  Create Job (Returns ID instantly)
            String jobId = jobService.createJob("roadmap", jsonInput);

            //  Return Job ID to client
            return ResponseEntity.accepted().body(Map.of(
                    "jobId", jobId,
                    "status", "CREATED",
                    "message", "Request queued. Poll /api/ai/job/" + jobId + " for results."
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/summarize")
    public ResponseEntity<Map<String,String>> summarizeText(@RequestBody Map<String,Object> payload){
        try{
            String jsonInput=objectMapper.writeValueAsString(payload);

            String jobId=jobService.createJob("summarizer",jsonInput);

            return ResponseEntity.accepted().body(Map.of(
                    "jobId",jobId,
                    "status","CREATED",
                    "message","Request queued. Poll /api/ai/job/ "+jobId+" for results."

            ));

        }catch (Exception e){
            return ResponseEntity.internalServerError().body(Map.of("error",e.getMessage()));
        }
    }

    // --- CODE CONVERTER ---
    @PostMapping("/convert")
    public ResponseEntity<Map<String, String>> convertCode(@RequestBody Map<String, Object> payload) {
        try {
            String jsonInput = objectMapper.writeValueAsString(payload);


            String jobId = jobService.createJob("converter", jsonInput);

            return ResponseEntity.accepted().body(Map.of(
                    "jobId", jobId,
                    "status", "CREATED",
                    "message", "Conversion queued. Poll /api/ai/job/" + jobId + " for results."
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    // --- EMAIL GENERATOR ---
    @PostMapping("/email")
    public ResponseEntity<Map<String, String>> generateEmail(@RequestBody Map<String, Object> payload) {
        try {
            String jsonInput = objectMapper.writeValueAsString(payload);

            // Tool name must match DB: "email"
            String jobId = jobService.createJob("email", jsonInput);

            return ResponseEntity.accepted().body(Map.of(
                    "jobId", jobId,
                    "status", "CREATED",
                    "message", "Email generation queued. Poll /api/ai/job/" + jobId + " for results."
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    // --- COVER LETTER ---
    @PostMapping("/letter")
    public ResponseEntity<Map<String, String>> generateLetter(@RequestBody Map<String, Object> payload) {
        try {
            String jsonInput = objectMapper.writeValueAsString(payload);

            // Tool name must match DB: "letter"
            String jobId = jobService.createJob("letter", jsonInput);

            return ResponseEntity.accepted().body(Map.of(
                    "jobId", jobId,
                    "status", "CREATED",
                    "message", "Letter generation queued. Poll /api/ai/job/" + jobId + " for results."
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }
    @PostMapping("/text")
    public ResponseEntity<Map<String, String>> improveText(@RequestBody Map<String, Object> payload) {
        try {
            String jsonInput = objectMapper.writeValueAsString(payload);

            // Tool name must match DB: "improver"
            String jobId = jobService.createJob("improver", jsonInput);

            return ResponseEntity.accepted().body(Map.of(
                    "jobId", jobId,
                    "status", "CREATED",
                    "message", "Text improvement queued. Poll /api/ai/job/" + jobId + " for results."
            ));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", e.getMessage()));
        }
    }

    // --- STATUS CHECK ENDPOINT ---
    @GetMapping("/job/{jobId}")
    public ResponseEntity<Job> getJobStatus(@PathVariable String jobId) {
        return ResponseEntity.ok(jobService.getJob(jobId));
    }
}
