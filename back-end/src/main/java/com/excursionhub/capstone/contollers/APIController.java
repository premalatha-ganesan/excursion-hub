package com.excursionhub.capstone.contollers;

import com.excursionhub.capstone.models.dto.CoordinatesDTO;
import com.excursionhub.capstone.services.APIServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/apiservices")
public class APIController {

    @Autowired
    APIServices apiServices;

    @GetMapping("/coordinates")
    public CoordinatesDTO getCoordinates(@RequestParam String city, @RequestParam String countryCode) {
        return apiServices.fetchCoordinates(city, countryCode);
    }
}
