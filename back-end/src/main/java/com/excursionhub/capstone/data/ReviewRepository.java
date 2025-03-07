package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.Attraction;
import com.excursionhub.capstone.models.Review;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends CrudRepository<Review, Integer> {

    @Query("select r from Review r where r.user.username=:username and r.attraction.name=:attraction")
    Optional<Review> getByUsernameAndAttraction(String username, String attraction);

    @Query("select COUNT(*) FROM Review r where r.attraction.id=:attractionId")
    Integer getReviewsCount(int attractionId);

    @Query("select avg(rating) from Review r where r.attraction.id=:attractionId")
    Float getAvgRating(int attractionId);

    List<Review> getByAttractionId(int attractionId);
}
