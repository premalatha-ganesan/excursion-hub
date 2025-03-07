package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.Attraction;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AttractionRepository extends CrudRepository<Attraction, Integer> {

    Optional<Attraction> findByName(String name);

    List<Attraction> findByLocationId(int locationId);

    Optional<Attraction> findById(int id);
}
