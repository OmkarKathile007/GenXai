package com.genaibackend.aibackend.repository;

import com.genaibackend.aibackend.entity.Roadmap;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RoadmapRepository extends JpaRepository<Roadmap, String> {
    // Find all roadmaps belonging to a specific user
    List<Roadmap> findByUserIdOrderByCreatedAtDesc(Long userId);
}