package com.excursionhub.capstone.models.dto;

import com.excursionhub.capstone.models.AttractionTagType;
import com.excursionhub.capstone.models.Review;

import java.util.Set;

public class AttractionDTO {

    private int attractionId;
    private String attractionName;
    private String city;
    private String country;
    private String description;
    private String imageUrl;
    private Set<AttractionTagType> attractionTags;
    private Integer totalReviews;
    private Float avgRating;
    private boolean attractionInWishlist;
    private Review review;

    public AttractionDTO(int attractionId, String attractionName, String description, String imageUrl) {
        this.attractionId = attractionId;
        this.attractionName = attractionName;
        this.description = description;
        this.imageUrl = imageUrl;
    }

    public AttractionDTO(){};

    public int getAttractionId() {
        return attractionId;
    }

    public void setAttractionId(int attractionId) {
        this.attractionId = attractionId;
    }

    public String getAttractionName() {
        return attractionName;
    }

    public void setAttractionName(String attractionName) {
        this.attractionName = attractionName;
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

    public Set<AttractionTagType> getAttractionTags() {
        return attractionTags;
    }

    public void setAttractionTags(Set<AttractionTagType> attractionTags) {
        this.attractionTags = attractionTags;
    }

    public Integer getTotalReviews() {
        return totalReviews;
    }

    public void setTotalReviews(Integer totalReviews) {
        this.totalReviews = totalReviews;
    }

    public Float getAvgRating() {
        return avgRating;
    }

    public void setAvgRating(Float avgRating) {
        this.avgRating = avgRating;
    }

    public boolean isAttractionInWishlist() {
        return attractionInWishlist;
    }

    public void setAttractionInWishlist(boolean attractionInWishlist) {
        this.attractionInWishlist = attractionInWishlist;
    }


}
