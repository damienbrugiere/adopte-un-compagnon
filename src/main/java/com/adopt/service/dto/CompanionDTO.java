package com.adopt.service.dto;

import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;
import javax.validation.constraints.*;

/**
 * A DTO for the {@link com.adopt.domain.Companion} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CompanionDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    @Lob
    private byte[] photo;

    private String photoContentType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getPhoto() {
        return photo;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return photoContentType;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CompanionDTO)) {
            return false;
        }

        CompanionDTO companionDTO = (CompanionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, companionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CompanionDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", photo='" + getPhoto() + "'" +
            "}";
    }
}
