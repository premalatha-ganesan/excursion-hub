package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.Photo;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PhotoRepository extends CrudRepository<Photo, Integer> {

}
