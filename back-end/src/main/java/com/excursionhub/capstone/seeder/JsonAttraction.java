package com.excursionhub.capstone.seeder;

import java.util.Set;

public class JsonAttraction {
    private String name;
    private String description;
    private String imageUrl;
    private String city;
    private String country;
    private Set<String> attractionTags;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public Set<String> getAttractionTags() {
        return attractionTags;
    }

    public void setAttractionTags(Set<String> attractionTags) {
        this.attractionTags = attractionTags;
    }
}
