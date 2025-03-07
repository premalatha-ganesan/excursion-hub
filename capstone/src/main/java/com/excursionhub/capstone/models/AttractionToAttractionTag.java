package com.excursionhub.capstone.models;

import com.excursionhub.capstone.data.AttractionTagAttractionId;
import jakarta.persistence.*;

@Entity
@Table(name = "attraction_to_attraction_tag")
public class AttractionToAttractionTag {

    @EmbeddedId
    private AttractionTagAttractionId attractionTagAttractionId;

    public AttractionTagAttractionId getAttractionTagAttractionId() {
        return attractionTagAttractionId;
    }

    public void setAttractionTagAttractionId(AttractionTagAttractionId attractionTagAttractionId) {
        this.attractionTagAttractionId = attractionTagAttractionId;
    }
}
