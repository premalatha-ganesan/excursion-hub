package com.excursionhub.capstone.services;

import com.excursionhub.capstone.data.LocationRepository;
import com.excursionhub.capstone.models.Location;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class LocationServices {

    @Autowired
    private LocationRepository locationRepository;

    public Optional<Location> getLocationById(int id) {
       return locationRepository.findById(id);
    }

    public Set<String> getAllCountries() {
        Sort sort = Sort.by(Sort.Order.desc("country"));
        Iterable<Location> dbLocations = locationRepository.findAll(sort);
        Set<String> countries = new LinkedHashSet<>();
        for (Location dBLocation : dbLocations) {
            countries.add(dBLocation.getCountry());
        }
        return countries;
    }

    public List<Location> getLocationsByCountry(String country) {
        return locationRepository.findByCountry(country);
    }
}
