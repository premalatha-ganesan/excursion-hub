package com.excursionhub.capstone.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "wishlist_attractions")
public class WishlistAttraction extends WishlistItem {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "attraction_id", nullable = false)
    private Attraction attraction;

    public WishlistAttraction() {
    }

    public WishlistAttraction(User user, Attraction attraction) {
        super(user);
        this.attraction = attraction;
    }

    public Attraction getAttraction() {
        return attraction;
    }

    public void setAttraction(Attraction attraction) {
        this.attraction = attraction;
    }
}
