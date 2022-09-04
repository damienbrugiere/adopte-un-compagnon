package com.adopt.service.mapper;

import com.adopt.domain.Companion;
import com.adopt.service.dto.CompanionDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Companion} and its DTO {@link CompanionDTO}.
 */
@Mapper(componentModel = "spring")
public interface CompanionMapper extends EntityMapper<CompanionDTO, Companion> {}
