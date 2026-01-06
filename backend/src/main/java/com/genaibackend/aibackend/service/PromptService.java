package com.genaibackend.aibackend.service;

import com.genaibackend.aibackend.entity.Prompt;
import com.genaibackend.aibackend.repository.PromptRepository;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PromptService {

    private final PromptRepository promptRepository;

    public PromptService(PromptRepository promptRepository) {
        this.promptRepository = promptRepository;
    }

    public Prompt getActivePrompt(String toolName) {
        return promptRepository.findByToolNameAndIsActiveTrue(toolName)
                .orElseThrow(() -> new RuntimeException("No active prompt found for tool: " + toolName));
    }

    // Helper to replace {{key}} with value
    public String buildPrompt(String template, Map<String, String> variables) {
        String result = template;
        for (Map.Entry<String, String> entry : variables.entrySet()) {
            result = result.replace("{{" + entry.getKey() + "}}", entry.getValue());
        }
        return result;
    }
}