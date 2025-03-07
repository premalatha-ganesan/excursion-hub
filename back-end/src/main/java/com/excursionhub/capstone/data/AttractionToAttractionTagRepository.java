package com.excursionhub.capstone.data;

import com.excursionhub.capstone.models.AttractionToAttractionTag;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttractionToAttractionTagRepository extends CrudRepository<AttractionToAttractionTag, Integer> {

}
