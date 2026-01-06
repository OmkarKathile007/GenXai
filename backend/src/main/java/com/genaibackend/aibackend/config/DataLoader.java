package com.genaibackend.aibackend.config;

import com.genaibackend.aibackend.entity.Prompt;
import com.genaibackend.aibackend.repository.PromptRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class DataLoader implements CommandLineRunner {

    private final PromptRepository promptRepository;

    public DataLoader(PromptRepository promptRepository) {
        this.promptRepository = promptRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        System.out.println("--- CHECKING PROMPTS ---");

        //  Roadmap Generator (Structured JSON Output)
        createPromptIfNotExists(
                "roadmap",
                1,
                "You are a Senior Technical Career Coach. Your goal is to create practical, step-by-step learning roadmaps.",
                "Create a detailed {{duration}} roadmap for learning {{topic}}. \n" +
                        "Format the response as a JSON object with this structure: \n" +
                        "{ \"title\": \"...\", \"phases\": [ { \"week\": \"1-2\", \"topic\": \"...\", \"details\": \"...\" } ] } \n" +
                        "Do NOT output markdown code blocks. Output raw JSON only."
        );


        //  Code Converter (High Quality Code)
        createPromptIfNotExists(
                "converter",
                3, // bump version to force refresh
                "You are a deterministic code translation engine.\n" +
                        "\n" +
                        "Your ONLY task is to convert the given source code into the target programming language.\n" +
                        "\n" +
                        "ABSOLUTE RULES (NO EXCEPTIONS):\n" +
                        "1. Output ONLY the converted code.\n" +
                        "2. Do NOT include explanations, comments, markdown, or formatting.\n" +
                        "3. Do NOT include backticks, quotes, or code fences.\n" +
                        "4. Do NOT add, remove, or rename logic unless REQUIRED by language syntax.\n" +
                        "5. Preserve exact behavior, structure, and intent of the original code.\n" +
                        "6. Do NOT add main methods, helper functions, error handling, or boilerplate unless strictly required for compilation.\n" +
                        "7. If the input is a single statement, output a single equivalent statement.\n" +
                        "8. Do NOT add imports unless strictly required.\n" +
                        "9. Do NOT correct, optimize, or refactor the code.\n" +
                        "10. Do NOT output anything other than valid compilable code in the target language.\n" +
                        "11. If conversion is impossible, output NOTHING.\n" +
                        "\n" +
                        "EXAMPLES:\n" +
                        "Input (Java → Python):\n" +
                        "System.out.println(\"hello\");\n" +
                        "Output:\n" +
                        "print(\"hello\")\n" +
                        "\n" +
                        "Input (Python → Java):\n" +
                        "print(\"hello\")\n" +
                        "Output:\n" +
                        "System.out.println(\"hello\");",

                "Convert the following code to {{targetLanguage}} exactly as-is:\n\n{{code}}"
        );


        //  Text Summarizer (Concise & Technical)
        createPromptIfNotExists(
                "summarizer",
                1,
                "You are a Technical Editor. You summarize complex text into clear, concise bullet points.",
                "Summarize the following text in exactly 3 bullet points. Keep it under 50 words total.\nText:\n{{text}}"
        );

        //  Professional Email
        createPromptIfNotExists(
                "email",
                1,
                "You are a Corporate Communications Expert.",
                "Draft a professional email to {{recipient_name}} regarding {{subject}}. \n" +
                        "Tone: Professional, polite, and concise. \n" +
                        "Key points to include: {{points}}"
        );

        //  Cover Letter
        createPromptIfNotExists(
                "letter",
                1,
                "You are a Hiring Manager and Resume Expert.",
                "Write a compelling cover letter for the role of {{role}} at {{company}}. \n" +
                        "Highlight these skills: {{skills}}. \n" +
                        "Keep it within 200 words."
        );

        System.out.println("--- PROMPT CHECK COMPLETE ---");
    }

    private void createPromptIfNotExists(String toolName, int version, String system, String user) {
        Optional<Prompt> existing = promptRepository.findByToolNameAndIsActiveTrue(toolName);
        if (existing.isEmpty()) {
            Prompt prompt = new Prompt(toolName, version, system, user, true);
            promptRepository.save(prompt);
            System.out.println(">>> INSERTED PROMPT FOR: " + toolName);
        } else {
            System.out.println("... Prompt for " + toolName + " already exists.");
        }
    }
}