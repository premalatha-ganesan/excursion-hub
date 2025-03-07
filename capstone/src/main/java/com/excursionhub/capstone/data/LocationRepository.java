package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.Location;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends CrudRepository<Location, Integer> {

    Optional<Location> findById(int id);

    Optional<Location> findByCityAndCountry(String city, String country);

    List<Location> findByCountry(String country);

    Iterable<Location> findAll(Sort sort);
}
