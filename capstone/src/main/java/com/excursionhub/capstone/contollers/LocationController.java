package com.excursionhub.capstone.contollers;

import com.excursionhub.capstone.data.AttractionRepository;
import com.excursionhub.capstone.data.ReviewRepository;
import com.excursionhub.capstone.data.WishlistAttractionRepository;
import com.excursionhub.capstone.mapper.AttractionMapper;
import com.excursionhub.capstone.mapper.ReviewMapper;

import com.excursionhub.capstone.models.Attraction;
import com.excursionhub.capstone.models.Location;
import com.excursionhub.capstone.models.Review;
import com.excursionhub.capstone.models.User;
import com.excursionhub.capstone.models.WishlistAttraction;

import com.excursionhub.capstone.models.dto.AttractionDTO;
import com.excursionhub.capstone.models.dto.ReviewDTO;
import com.excursionhub.capstone.services.LocationServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.excursionhub.capstone.services.AttractionServices;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/locationservices")
public class LocationController {

    @Autowired
    private LocationServices locationServices;

    @Autowired
    private AttractionRepository attractionRepository;

    @Autowired
    private AttractionServices attractionServices;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private WishlistAttractionRepository wishlistAttractionRepository;

    @GetMapping("/locations/all")
    public Set<String> listAllCountries() {
        return locationServices.getAllCountries();
    }

    @GetMapping("/locations")
    public List<Location> listAllCities(@RequestParam String country) {
        return locationServices.getLocationsByCountry(country);
    }

    @GetMapping("/{cityId}")
    public Optional<Location> listLocationByCityId(@PathVariable int cityId) {
        return locationServices.getLocationById(cityId);
    }

    @GetMapping("/{cityId}/attractions")
    public List<AttractionDTO> listAttractionsByCityId(@PathVariable int cityId, @RequestParam(required = false) Integer userId) {
        List<Attraction> attractions = attractionRepository.findByLocationId(cityId);
        List<AttractionDTO> attractionDTOs = new ArrayList<>();

        for (Attraction attraction : attractions) {
            Integer totalReviews = reviewRepository.getReviewsCount(attraction.getId());
            Float avgRating = reviewRepository.getAvgRating(attraction.getId());

            AttractionDTO attractionDTO = AttractionMapper.toAttractionDto(attraction,totalReviews,avgRating);


            if (userId != null) {
                Optional<WishlistAttraction> wishlistAttraction = wishlistAttractionRepository.getByUserIdAndAttractionId(userId, attraction.getId());
                if(wishlistAttraction.isPresent()) {
                    attractionDTO.setAttractionInWishlist(true);
                } else {
                    attractionDTO.setAttractionInWishlist(false);
                }
            }
            attractionDTOs.add(attractionDTO);
        }
        return attractionDTOs;
    }

    @GetMapping("/attractions/{attractionId}")
    public Optional<AttractionDTO> listAttractionById(@PathVariable int attractionId) {
        return attractionRepository.findById(attractionId).map(attraction -> {
            Integer totalReviews = reviewRepository.getReviewsCount(attraction.getId());
            Float avgRating = reviewRepository.getAvgRating(attraction.getId());
            return AttractionMapper.toAttractionDto(attraction, totalReviews, avgRating);
        });
    }

    @PostMapping("/attractions/{attractionId}")
    public ResponseEntity<String> postReview(@PathVariable int attractionId, @RequestBody Review review) {
        reviewRepository.save(review);
        return ResponseEntity.ok("Review Posted");
    }

    @GetMapping("/attractions/{attractionId}/reviews")
    public List <ReviewDTO> getReviews(@PathVariable int attractionId) {
    List<Review> reviews = reviewRepository.getByAttractionId(attractionId);
    List<ReviewDTO> reviewDTOS = new ArrayList<>();

    for(Review review : reviews){
        User user = review.getUser();
        String comment = review.getComment();
        float rating = review.getRating();
        ReviewDTO reviewDTO = ReviewMapper.toReviewDTO(review,user,comment,rating);
        reviewDTOS.add(reviewDTO);
    }
    return reviewDTOS;
    }
}
