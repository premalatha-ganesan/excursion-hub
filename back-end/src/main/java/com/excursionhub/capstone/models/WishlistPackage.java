package com.excursionhub.capstone.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "wishlist_packages")
public class WishlistPackage extends WishlistItem {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "package_id", nullable = false)
    private TravelPackage travelPackage;

    public WishlistPackage() {
    }

    public WishlistPackage(User user, TravelPackage travelPackage) {
        super(user);
        this.travelPackage = travelPackage;
    }

    public TravelPackage getTravelPackage() {
        return travelPackage;
    }

    public void setTravelPackage(TravelPackage travelPackage) {
        this.travelPackage = travelPackage;
    }
}
