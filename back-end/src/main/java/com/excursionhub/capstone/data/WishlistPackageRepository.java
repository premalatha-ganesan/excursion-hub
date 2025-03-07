package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.WishlistPackage;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WishlistPackageRepository extends CrudRepository<WishlistPackage, Integer> {
}
