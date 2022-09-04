package com.adopt.service.mapper;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class CompanionMapperTest {

    private CompanionMapper companionMapper;

    @BeforeEach
    public void setUp() {
        companionMapper = new CompanionMapperImpl();
    }
}
