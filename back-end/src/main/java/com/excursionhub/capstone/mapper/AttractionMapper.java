package com.excursionhub.capstone.mapper;

import com.excursionhub.capstone.models.Attraction;
import com.excursionhub.capstone.models.AttractionTag;
import com.excursionhub.capstone.models.AttractionTagType;
import com.excursionhub.capstone.models.dto.AttractionDTO;

import java.util.HashSet;
import java.util.Set;

public class AttractionMapper {

    public static AttractionDTO toAttractionDto(Attraction attraction, Integer totalReviews, Float avgRating) {
        AttractionDTO attractionDTO = new AttractionDTO();
        attractionDTO.setAttractionId(attraction.getId());
        attractionDTO.setAttractionName(attraction.getName());
        attractionDTO.setDescription(attraction.getDescription());
        attractionDTO.setCity(attraction.getLocation().getCity());
        attractionDTO.setCountry(attraction.getLocation().getCountry());
        attractionDTO.setImageUrl(attraction.getImageUrl());
        attractionDTO.setTotalReviews(totalReviews);
        attractionDTO.setAvgRating(avgRating);

        Set<AttractionTagType> tagTypes = new HashSet<>();
        for (AttractionTag tag : attraction.getAttractionTags()) {
            tagTypes.add(tag.getAttractionTagType());
        }
        attractionDTO.setAttractionTags(tagTypes);

        return attractionDTO;
    }
}
