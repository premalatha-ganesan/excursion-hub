package com.excursionhub.capstone.models;


import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "attraction_tag")
public class AttractionTag {

    @TableGenerator(name = "yourTableGenerator", allocationSize = 1, initialValue = 1)
    @Id
    @GeneratedValue(strategy= GenerationType.TABLE, generator="yourTableGenerator")
    private int attractionTagId;

    @ManyToMany(mappedBy = "attractionTags")
    private List<Attraction> attractions;

    @Enumerated(EnumType.STRING)
    private AttractionTagType attractionTagType;

    public int getAttractionTagId() {
        return attractionTagId;
    }

    public void setAttractionTagId(int attractionTagId) {
        this.attractionTagId = attractionTagId;
    }

    public List<Attraction> getAttractions() {
        return attractions;
    }

    public void setAttractions(List<Attraction> attractions) {
        this.attractions = attractions;
    }

    public AttractionTagType getAttractionTagType() {
        return attractionTagType;
    }

    public void setAttractionTagType(AttractionTagType attractionTagType) {
        this.attractionTagType = attractionTagType;
    }
}
