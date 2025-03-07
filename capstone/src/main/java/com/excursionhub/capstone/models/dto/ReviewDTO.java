package com.excursionhub.capstone.models.dto;

import com.excursionhub.capstone.models.Attraction;
import com.excursionhub.capstone.models.User;

public class ReviewDTO {
    private int id;
    private User user;
    private float rating;
    private Attraction attraction;
    private String comment;

    public ReviewDTO(String comment, int rating, User user) {
        this.comment = comment;
        this.rating = rating;
        this.user = user;
    }

    public ReviewDTO (){};

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public float getRating() {
        return rating;
    }

    public void setRating(float rating) {
        this.rating = rating;
    }

    public Attraction getAttraction() {
        return attraction;
    }

    public void setAttraction(Attraction attraction) {
        this.attraction = attraction;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
}
