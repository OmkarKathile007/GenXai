package com.genaibackend.aibackend.entity;



import jakarta.persistence.*;

@Entity
@Table(name = "prompts")
public class Prompt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String toolName; // e.g., "roadmap"

    private int version;

    @Column(columnDefinition = "TEXT")
    private String systemMessage; // Context for the AI (e.g., "You are a senior engineer...")

    @Column(columnDefinition = "TEXT")
    private String userMessage;

    private boolean isActive;

    public Prompt() {}

    public Prompt(String toolName, int version, String systemMessage, String userMessage, boolean isActive) {
        this.toolName = toolName;
        this.version = version;
        this.systemMessage = systemMessage;
        this.userMessage = userMessage;
        this.isActive = isActive;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getToolName() { return toolName; }
    public void setToolName(String toolName) { this.toolName = toolName; }

    public int getVersion() { return version; }
    public void setVersion(int version) { this.version = version; }

    public String getSystemMessage() { return systemMessage; }
    public void setSystemMessage(String systemMessage) { this.systemMessage = systemMessage; }

    public String getUserMessage() { return userMessage; }
    public void setUserMessage(String userMessage) { this.userMessage = userMessage; }

    public boolean isActive() { return isActive; }
    public void setActive(boolean active) { isActive = active; }
}
