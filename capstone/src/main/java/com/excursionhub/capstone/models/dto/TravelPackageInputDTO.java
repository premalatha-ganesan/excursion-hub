package com.excursionhub.capstone.models.dto;

import java.util.List;

public class TravelPackageInputDTO {

    private Integer packageId;
    private String packageName;
    private String description;
    private List<Integer> attractionIds;

    public TravelPackageInputDTO() {
    }

    public Integer getPackageId() {
        return packageId;
    }

    public void setPackageId(Integer packageId) {
        this.packageId = packageId;
    }

    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<Integer> getAttractionIds() {
        return attractionIds;
    }

    public void setAttractionIds(List<Integer> attractionIds) {
        this.attractionIds = attractionIds;
    }
}

