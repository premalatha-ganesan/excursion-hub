package com.excursionhub.capstone.services;

import com.excursionhub.capstone.data.AttractionRepository;
import com.excursionhub.capstone.data.UserRepository;
import com.excursionhub.capstone.data.WishlistAttractionRepository;
import com.excursionhub.capstone.errors.DataNotFoundException;
import com.excursionhub.capstone.mapper.WishlistMapper;
import com.excursionhub.capstone.models.AbstractDateTime;
import com.excursionhub.capstone.models.Attraction;
import com.excursionhub.capstone.models.User;
import com.excursionhub.capstone.models.WishlistAttraction;
import com.excursionhub.capstone.models.dto.WishlistAttractionDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class WishlistServices extends AbstractDateTime {

    @Autowired
    AttractionRepository attractionRepository;

    @Autowired
    WishlistAttractionRepository wishlistAttractionRepository;

    @Autowired
    UserRepository userRepository;

    private Boolean isAttrWishlist;

    public WishlistAttractionDTO createWishlist(int userId, int attractionId) {
        Optional<User> dbOptUser = userRepository.findById(userId);
        if (dbOptUser.isEmpty()) {
            throw new DataNotFoundException("User not found");
        }
        User user = dbOptUser.get();

        Optional<Attraction> dbOptAttraction = attractionRepository.findById(attractionId);
        if (dbOptAttraction.isEmpty()) {
            throw new DataNotFoundException("Attraction not found");
        }
        Attraction attraction = dbOptAttraction.get();

        Optional<WishlistAttraction> dbWishlistAttraction = wishlistAttractionRepository.getByUsernameAttraction(user.getUsername(), attraction.getName());
        if (dbWishlistAttraction.isEmpty()) {
            WishlistAttraction wishlistAttraction = new WishlistAttraction();
            wishlistAttraction.setCreatedAt(LocalDateTime.now());
            wishlistAttraction.setAttraction(attraction);
            wishlistAttraction.setUser(user);
            wishlistAttraction = wishlistAttractionRepository.save(wishlistAttraction);

            return WishlistMapper.toWishlistDTO(wishlistAttraction);
        } else {
            return WishlistMapper.toWishlistDTO(dbWishlistAttraction.get());
        }
    }
}