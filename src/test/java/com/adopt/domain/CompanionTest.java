package com.adopt.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.adopt.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CompanionTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Companion.class);
        Companion companion1 = new Companion();
        companion1.setId(1L);
        Companion companion2 = new Companion();
        companion2.setId(companion1.getId());
        assertThat(companion1).isEqualTo(companion2);
        companion2.setId(2L);
        assertThat(companion1).isNotEqualTo(companion2);
        companion1.setId(null);
        assertThat(companion1).isNotEqualTo(companion2);
    }
}
