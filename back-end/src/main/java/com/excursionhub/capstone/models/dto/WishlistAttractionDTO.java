package com.excursionhub.capstone.models.dto;

import java.time.LocalDateTime;

public class WishlistAttractionDTO {

    private int id;
    private AttractionDTO attraction;
    private LocalDateTime createdDateTime;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public AttractionDTO getAttraction() {
        return attraction;
    }

    public void setAttraction(AttractionDTO attraction) {
        this.attraction = attraction;
    }

    public LocalDateTime getCreatedDateTime() {
        return createdDateTime;
    }

    public void setCreatedDateTime(LocalDateTime createdDateTime) {
        this.createdDateTime = createdDateTime;
    }
}
