package com.excursionhub.capstone.contollers;

import com.excursionhub.capstone.data.AttractionRepository;
import com.excursionhub.capstone.data.ReviewRepository;
import com.excursionhub.capstone.data.UserRepository;
import com.excursionhub.capstone.data.WishlistAttractionRepository;
import com.excursionhub.capstone.errors.DataNotFoundException;
import com.excursionhub.capstone.mapper.AttractionMapper;
import com.excursionhub.capstone.models.WishlistAttraction;
import com.excursionhub.capstone.models.dto.WishlistAttractionDTO;
import com.excursionhub.capstone.services.WishlistServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/wishlistservices")
public class WishlistController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WishlistAttractionRepository wishlistAttractionRepository;

    @Autowired
    private AttractionRepository attractionRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private WishlistServices wishlistServices;

    @GetMapping("/wishlistAttraction")
    public ResponseEntity<List<WishlistAttractionDTO>> getWishlistAttractions(@RequestParam int userId) {
        List<WishlistAttraction> wishlistAttractions = wishlistAttractionRepository.getWishlistByUserId(userId);

        List<WishlistAttractionDTO> result = new ArrayList<>();

        for(WishlistAttraction wishlistAttraction : wishlistAttractions) {
            WishlistAttractionDTO wishlistAttractionDTO = new WishlistAttractionDTO();
            wishlistAttractionDTO.setId(wishlistAttraction.getId());
            Integer totalReviews = reviewRepository.getReviewsCount(wishlistAttraction.getAttraction().getId());
            Float avgRating = reviewRepository.getAvgRating(wishlistAttraction.getAttraction().getId());
            wishlistAttractionDTO.setAttraction(AttractionMapper.toAttractionDto(wishlistAttraction.getAttraction(), totalReviews, avgRating));
            wishlistAttractionDTO.setCreatedDateTime(wishlistAttraction.getCreatedAt());

            result.add(wishlistAttractionDTO);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/wishlistAttraction")
    public ResponseEntity<WishlistAttractionDTO> addAttractionToWishlist(@RequestParam int userId, @RequestParam int attractionId) {
        WishlistAttractionDTO wishlistAttractionDTO = wishlistServices.createWishlist(userId, attractionId);
        return ResponseEntity.ok(wishlistAttractionDTO);
    }

    @DeleteMapping("/wishlistAttraction/{wishlistId}")
    public ResponseEntity<String> deleteWishlistAttraction(@PathVariable(value = "wishlistId") int id) {
        Optional<WishlistAttraction> dbWishlistAttrOpt = wishlistAttractionRepository.findById(id);

        if(dbWishlistAttrOpt.isPresent()){
            wishlistAttractionRepository.deleteById(id);
            return ResponseEntity.ok("Attraction is deleted");
        }
        else {
            throw new DataNotFoundException("Wishlist Not Found");
        }
    }

    @DeleteMapping("/attraction/{attractionId}")
    @Transactional
    public ResponseEntity<String> deleteAttractionFromWishlist(@PathVariable(value = "attractionId") int attractionId, @RequestParam int userId) {
        wishlistAttractionRepository.removeWishlistByUserIdAndAttractionId(userId, attractionId);
        return ResponseEntity.ok("Attraction removed from wishlist");
    }
}
