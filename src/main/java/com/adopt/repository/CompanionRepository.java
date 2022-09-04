package com.adopt.repository;

import com.adopt.domain.Companion;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Companion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanionRepository extends JpaRepository<Companion, Long> {}
