package com.excursionhub.capstone.mapper;

import com.excursionhub.capstone.models.Review;
import com.excursionhub.capstone.models.User;
import com.excursionhub.capstone.models.dto.ReviewDTO;

public class ReviewMapper {

    public static ReviewDTO toReviewDTO(Review review, User user, String comment, float rating){
        ReviewDTO reviewDTO = new ReviewDTO();
        reviewDTO.setId(review.getId());
        reviewDTO.setUser(review.getUser());
        reviewDTO.setComment(review.getComment());
        reviewDTO.setRating(review.getRating());

        return reviewDTO;
    }
}
