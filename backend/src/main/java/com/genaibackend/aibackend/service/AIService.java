package com.genaibackend.aibackend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.genaibackend.aibackend.entity.Prompt;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

import java.util.Map;

@Service
public class AIService {

    private static final Logger log = LoggerFactory.getLogger(AIService.class);

    @Value("${GEMINI_API_URL}")
    private String geminiApiUrl;

    @Value("${GEMINI_API_KEY}")
    private String geminiApiKey;

    private final WebClient webClient;
    private final PromptService promptService;
    private final ObjectMapper objectMapper;

    public AIService(WebClient.Builder webClient, PromptService promptService, ObjectMapper objectMapper) {
        this.webClient = webClient.build();
        this.promptService = promptService;
        this.objectMapper = objectMapper;
    }

    public String executeTool(String toolName, String jsonInput) {
        try {
            Prompt prompt = promptService.getActivePrompt(toolName);
            Map<String, String> inputMap = objectMapper.readValue(jsonInput, Map.class);
            String finalPrompt = prompt.getSystemMessage() + "\n\n" +
                    promptService.buildPrompt(prompt.getUserMessage(), inputMap);

            return callGemini(finalPrompt);

        } catch (Exception e) {
            throw new RuntimeException("AI Execution Failed: " + e.getMessage(), e);
        }
    }

    private String callGemini(String text) {
        try {
            //  Construct the Payload
            Map<String, Object> requestBody = Map.of(
                    "contents", new Object[] {
                            Map.of("parts", new Object[] {
                                    Map.of("text", text)
                            })
                    }
            );

            //  DEBUG LOGS (Check these in your console!)
            String fullUrl = geminiApiUrl + geminiApiKey;
            String jsonBody = objectMapper.writeValueAsString(requestBody);

            log.info("--- DEBUG AI REQUEST ---");
            log.info("URL: {}", fullUrl);
            log.info("PAYLOAD: {}", jsonBody);
            log.info("------------------------");

            // Send Request
            String rawResponse = webClient.post()
                    .uri(fullUrl)
                    .header("Content-Type", "application/json")
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return extractTextFromResponse(rawResponse);

        } catch (WebClientResponseException e) {
            // Log the server's error response (Crucial for 400 errors)
            log.error("Gemini Error Body: {}", e.getResponseBodyAsString());
            throw new RuntimeException(e.getStatusText() + " from Gemini", e);
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage(), e);
        }
    }

    private String extractTextFromResponse(String rawJson) {
        try {
            com.fasterxml.jackson.databind.JsonNode root = objectMapper.readTree(rawJson);
            return root.path("candidates").get(0)
                    .path("content")
                    .path("parts").get(0)
                    .path("text").asText();
        } catch (Exception e) {
            return rawJson;
        }
    }
}