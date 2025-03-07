package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.WishlistAttraction;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistAttractionRepository extends CrudRepository<WishlistAttraction, Integer> {

    @Query("select w from WishlistAttraction w where w.user.username=:username and w.attraction.name=:attraction")
    Optional<WishlistAttraction> getByUsernameAttraction(String username,String attraction);

    @Query("select w from WishlistAttraction w where w.user.id=:userId and w.attraction.id=:attractionId")
    Optional<WishlistAttraction> getByUserIdAndAttractionId(int userId, int attractionId);

    @Query("select w from WishlistAttraction w where w.user.id=:id")
    List<WishlistAttraction> getWishlistByUserId(int id);

    @Modifying
    @Query("delete from WishlistAttraction w where w.user.id=:userId and w.attraction.id=:attractionId")
    void removeWishlistByUserIdAndAttractionId(int userId, int attractionId);
}
