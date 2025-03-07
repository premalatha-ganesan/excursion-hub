package com.excursionhub.capstone.mapper;

import com.excursionhub.capstone.models.Attraction;
import com.excursionhub.capstone.models.WishlistAttraction;
import com.excursionhub.capstone.models.dto.AttractionDTO;
import com.excursionhub.capstone.models.dto.WishlistAttractionDTO;

public class WishlistMapper {

    public static WishlistAttractionDTO toWishlistDTO(WishlistAttraction wishlistAttraction) {
        WishlistAttractionDTO wishlistAttractionDTO = new WishlistAttractionDTO();
        wishlistAttractionDTO.setId(wishlistAttraction.getId());
        wishlistAttractionDTO.setCreatedDateTime(wishlistAttraction.getCreatedAt());
        Attraction dbAttraction = wishlistAttraction.getAttraction();
        AttractionDTO attractionDTO = AttractionMapper.toAttractionDto(dbAttraction, null, null);
        wishlistAttractionDTO.setAttraction(attractionDTO);

        return wishlistAttractionDTO;
    }
}
