package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.Attraction;
import com.excursionhub.capstone.models.AttractionTag;
import jakarta.persistence.Embeddable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.io.Serializable;

@Embeddable
public class AttractionTagAttractionId implements Serializable {

    @ManyToOne
    @JoinColumn(name = "attraction_id", nullable = false)
    private Attraction attraction;

    @ManyToOne
    @JoinColumn(name = "attraction_tag_id", nullable = false)
    private AttractionTag attractionTag;

    public Attraction getAttraction() {
        return attraction;
    }

    public void setAttraction(Attraction attraction) {
        this.attraction = attraction;
    }

    public AttractionTag getAttractionTag() {
        return attractionTag;
    }

    public void setAttractionTag(AttractionTag attractionTag) {
        this.attractionTag = attractionTag;
    }
}
