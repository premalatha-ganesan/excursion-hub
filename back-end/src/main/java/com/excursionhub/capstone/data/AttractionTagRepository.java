package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.AttractionTag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttractionTagRepository extends CrudRepository<AttractionTag, Integer> {
}
