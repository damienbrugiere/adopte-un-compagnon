package com.adopt.service.impl;

import com.adopt.domain.Companion;
import com.adopt.repository.CompanionRepository;
import com.adopt.service.CompanionService;
import com.adopt.service.dto.CompanionDTO;
import com.adopt.service.mapper.CompanionMapper;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Companion}.
 */
@Service
@Transactional
public class CompanionServiceImpl implements CompanionService {

    private final Logger log = LoggerFactory.getLogger(CompanionServiceImpl.class);

    private final CompanionRepository companionRepository;

    private final CompanionMapper companionMapper;

    public CompanionServiceImpl(CompanionRepository companionRepository, CompanionMapper companionMapper) {
        this.companionRepository = companionRepository;
        this.companionMapper = companionMapper;
    }

    @Override
    public CompanionDTO save(CompanionDTO companionDTO) {
        log.debug("Request to save Companion : {}", companionDTO);
        Companion companion = companionMapper.toEntity(companionDTO);
        companion = companionRepository.save(companion);
        return companionMapper.toDto(companion);
    }

    @Override
    public CompanionDTO update(CompanionDTO companionDTO) {
        log.debug("Request to update Companion : {}", companionDTO);
        Companion companion = companionMapper.toEntity(companionDTO);
        companion = companionRepository.save(companion);
        return companionMapper.toDto(companion);
    }

    @Override
    public Optional<CompanionDTO> partialUpdate(CompanionDTO companionDTO) {
        log.debug("Request to partially update Companion : {}", companionDTO);

        return companionRepository
            .findById(companionDTO.getId())
            .map(existingCompanion -> {
                companionMapper.partialUpdate(existingCompanion, companionDTO);

                return existingCompanion;
            })
            .map(companionRepository::save)
            .map(companionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CompanionDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Companions");
        return companionRepository.findAll(pageable).map(companionMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CompanionDTO> findOne(Long id) {
        log.debug("Request to get Companion : {}", id);
        return companionRepository.findById(id).map(companionMapper::toDto);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Companion : {}", id);
        companionRepository.deleteById(id);
    }
}
