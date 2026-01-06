package com.genaibackend.aibackend.repository;

import com.genaibackend.aibackend.entity.Prompt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PromptRepository extends JpaRepository<Prompt, Long> {
    // Fetch the currently active prompt for a specific tool
    Optional<Prompt> findByToolNameAndIsActiveTrue(String toolName);
}