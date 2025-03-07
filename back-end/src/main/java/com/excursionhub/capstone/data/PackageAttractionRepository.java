package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.PackageAttraction;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PackageAttractionRepository extends CrudRepository<PackageAttraction, Integer> {

    @Modifying
    @Query("delete from PackageAttraction p where p.travelPackage.id=:packageId")
    void deleteAttractionsByPackageId(int packageId);
}
