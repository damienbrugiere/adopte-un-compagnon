package com.adopt.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import com.adopt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CompanionDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CompanionDTO.class);
        CompanionDTO companionDTO1 = new CompanionDTO();
        companionDTO1.setId(1L);
        CompanionDTO companionDTO2 = new CompanionDTO();
        assertThat(companionDTO1).isNotEqualTo(companionDTO2);
        companionDTO2.setId(companionDTO1.getId());
        assertThat(companionDTO1).isEqualTo(companionDTO2);
        companionDTO2.setId(2L);
        assertThat(companionDTO1).isNotEqualTo(companionDTO2);
        companionDTO1.setId(null);
        assertThat(companionDTO1).isNotEqualTo(companionDTO2);
    }
}
