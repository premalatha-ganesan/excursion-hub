package com.excursionhub.capstone.models.dto;

import java.util.List;

public class TravelPackageDTO {

    private Integer packageId;
    private String packageName;
    private String description;
    private List<AttractionDTO> attractionDTOs;

    public TravelPackageDTO() {

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

    public List<AttractionDTO> getAttractionDTOs() {
        return attractionDTOs;
    }

    public void setAttractionDTOs(List<AttractionDTO> attractionDTOs) {
        this.attractionDTOs = attractionDTOs;
    }
}
