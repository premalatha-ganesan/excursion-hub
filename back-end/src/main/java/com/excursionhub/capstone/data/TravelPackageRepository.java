package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.TravelPackage;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TravelPackageRepository extends CrudRepository<TravelPackage, Integer> {

    List<TravelPackage> getTravelPackageByUserId(int userId);
    @Query("select t from TravelPackage t where t.name=:packageName and t.user.id =:userId")
    Optional<TravelPackage> getPackageByPackageNameAndUserId(String packageName, Integer userId);

    @Modifying
    @Query("update TravelPackage t set t.name=:packageName, t.description=:description where t.id=:packageId and t.user.id=:userId")
    int updatePackage(int userId, int packageId, String packageName, String description);

    List<TravelPackage> findAll();
}
