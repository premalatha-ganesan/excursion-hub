package com.excursionhub.capstone.services;

import com.excursionhub.capstone.data.AttractionRepository;
import com.excursionhub.capstone.models.Attraction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttractionServices {

    @Autowired
    AttractionRepository attractionRepository;

    public List<Attraction> getAttractionsByCityId(int cityId) {
        return attractionRepository.findByLocationId(cityId);
    }

    public Optional<Attraction> getAttractionById(int id) {
        return attractionRepository.findById(id);
    }
}
