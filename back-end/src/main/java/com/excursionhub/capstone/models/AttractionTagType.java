package com.excursionhub.capstone.models;

import com.fasterxml.jackson.annotation.JsonCreator;

import java.util.HashMap;
import java.util.Map;

public enum AttractionTagType {
    ART("Art"),
    OUTDOOR("Outdoor"),
    ADVENTURE("Adventure"),
    PHOTOGRAPHY("Photography"),
    EDUCATION("Education"),
    FAMILY("Family"),
    SCIENCE("Science"),
    SCENIC("Scenic"),
    WALKING("Walking"),
    ENTERTAINMENT("Entertainment"),
    THEATRE("Theatre"),
    MUSEUM("Museum"),
    CULTURE("Culture"),
    EDUCATIONAL("Educational"),
    MEMORIAL("Memorial"),
    LANDMARK("Landmark"),
    NATURE("Nature"),
    MONUMENT("Monument"),
    SHOPPING("Shopping"),
    ARCHITECTURE("Architecture"),
    ZOO("Zoo"),
    SKYSCRAPER("Skyscraper"),
    NIGHTLIFE("Nightlife"),
    HISTORY("History"),
    SEASONAL("Seasonal"),
    FOOD("Food"),
    BEACH("Beach");

    private final String displayName;

    private final Map<String, AttractionTagType> allTypes = new HashMap<>();

    AttractionTagType(String displayName) {
        this.displayName = displayName;
        allTypes.put(displayName, this);
    }

    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator
    public AttractionTagType getTagType(String tagType) {
        return allTypes.get(tagType);
    }
}
