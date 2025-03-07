package com.excursionhub.capstone.contollers;

import com.excursionhub.capstone.models.dto.TravelPackageDTO;
import com.excursionhub.capstone.models.dto.TravelPackageInputDTO;
import com.excursionhub.capstone.services.TravelPackageServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/packageservices")
public class PackageController {

    @Autowired
    private TravelPackageServices travelPackageServices;

    @PostMapping("/package")
    public ResponseEntity<TravelPackageDTO> createPackage(@RequestParam int userId, @RequestBody TravelPackageInputDTO travelPackageInputDTO) {
        TravelPackageDTO travelPackageDTO = travelPackageServices.createTravelPackage(userId, travelPackageInputDTO);
        return ResponseEntity.ok(travelPackageDTO);
    }

    @PutMapping("/package")
    public ResponseEntity<TravelPackageDTO> updatePackage(@RequestParam int userId, @RequestBody TravelPackageInputDTO travelPackageInputDTO) {
        TravelPackageDTO travelPackageDTO = travelPackageServices.updateTravelPackage(userId, travelPackageInputDTO);
        return ResponseEntity.ok(travelPackageDTO);
    }

    @DeleteMapping("/package/{packageId}")
    public ResponseEntity<?> deletePackage(@RequestParam int userId, @PathVariable int packageId) {
        travelPackageServices.deleteTravelPackage(userId, packageId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/package/{packageId}")
    public TravelPackageDTO getPackageById(@RequestParam int userId, @PathVariable int packageId) {
        return travelPackageServices.getTravelPackageById(userId, packageId);
    }

    @GetMapping("/package/all")
    public List<TravelPackageDTO> getMyPackages(@RequestParam int userId) {
        return travelPackageServices.getAllTravelPackages(userId);
    }

    @GetMapping("/fullpackagelist")
    public List<TravelPackageDTO> getAllPackages() {
        return travelPackageServices.getEveryTravelPackage();
    }
}
