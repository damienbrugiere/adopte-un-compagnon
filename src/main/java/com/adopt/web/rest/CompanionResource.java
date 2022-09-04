package com.adopt.web.rest;

import com.adopt.repository.CompanionRepository;
import com.adopt.service.CompanionService;
import com.adopt.service.dto.CompanionDTO;
import com.adopt.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.adopt.domain.Companion}.
 */
@RestController
@RequestMapping("/api")
public class CompanionResource {

    private final Logger log = LoggerFactory.getLogger(CompanionResource.class);

    private static final String ENTITY_NAME = "companion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CompanionService companionService;

    private final CompanionRepository companionRepository;

    public CompanionResource(CompanionService companionService, CompanionRepository companionRepository) {
        this.companionService = companionService;
        this.companionRepository = companionRepository;
    }

    /**
     * {@code POST  /companions} : Create a new companion.
     *
     * @param companionDTO the companionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new companionDTO, or with status {@code 400 (Bad Request)} if the companion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/companions")
    public ResponseEntity<CompanionDTO> createCompanion(@Valid @RequestBody CompanionDTO companionDTO) throws URISyntaxException {
        log.debug("REST request to save Companion : {}", companionDTO);
        if (companionDTO.getId() != null) {
            throw new BadRequestAlertException("A new companion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CompanionDTO result = companionService.save(companionDTO);
        return ResponseEntity
            .created(new URI("/api/companions/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /companions/:id} : Updates an existing companion.
     *
     * @param id the id of the companionDTO to save.
     * @param companionDTO the companionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated companionDTO,
     * or with status {@code 400 (Bad Request)} if the companionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the companionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/companions/{id}")
    public ResponseEntity<CompanionDTO> updateCompanion(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CompanionDTO companionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Companion : {}, {}", id, companionDTO);
        if (companionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, companionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!companionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CompanionDTO result = companionService.update(companionDTO);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, companionDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /companions/:id} : Partial updates given fields of an existing companion, field will ignore if it is null
     *
     * @param id the id of the companionDTO to save.
     * @param companionDTO the companionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated companionDTO,
     * or with status {@code 400 (Bad Request)} if the companionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the companionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the companionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/companions/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CompanionDTO> partialUpdateCompanion(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CompanionDTO companionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Companion partially : {}, {}", id, companionDTO);
        if (companionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, companionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!companionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CompanionDTO> result = companionService.partialUpdate(companionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, companionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /companions} : get all the companions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of companions in body.
     */
    @GetMapping("/companions")
    public ResponseEntity<List<CompanionDTO>> getAllCompanions(@org.springdoc.api.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of Companions");
        Page<CompanionDTO> page = companionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /companions/:id} : get the "id" companion.
     *
     * @param id the id of the companionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the companionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/companions/{id}")
    public ResponseEntity<CompanionDTO> getCompanion(@PathVariable Long id) {
        log.debug("REST request to get Companion : {}", id);
        Optional<CompanionDTO> companionDTO = companionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(companionDTO);
    }

    /**
     * {@code DELETE  /companions/:id} : delete the "id" companion.
     *
     * @param id the id of the companionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/companions/{id}")
    public ResponseEntity<Void> deleteCompanion(@PathVariable Long id) {
        log.debug("REST request to delete Companion : {}", id);
        companionService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
