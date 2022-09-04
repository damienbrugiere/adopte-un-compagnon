package com.adopt.service;

import com.adopt.service.dto.CompanionDTO;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link com.adopt.domain.Companion}.
 */
public interface CompanionService {
    /**
     * Save a companion.
     *
     * @param companionDTO the entity to save.
     * @return the persisted entity.
     */
    CompanionDTO save(CompanionDTO companionDTO);

    /**
     * Updates a companion.
     *
     * @param companionDTO the entity to update.
     * @return the persisted entity.
     */
    CompanionDTO update(CompanionDTO companionDTO);

    /**
     * Partially updates a companion.
     *
     * @param companionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CompanionDTO> partialUpdate(CompanionDTO companionDTO);

    /**
     * Get all the companions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CompanionDTO> findAll(Pageable pageable);

    /**
     * Get the "id" companion.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CompanionDTO> findOne(Long id);

    /**
     * Delete the "id" companion.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
