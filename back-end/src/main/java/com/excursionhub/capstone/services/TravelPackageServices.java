package com.excursionhub.capstone.services;

import com.excursionhub.capstone.data.AttractionRepository;
import com.excursionhub.capstone.data.PackageAttractionRepository;
import com.excursionhub.capstone.data.TravelPackageRepository;
import com.excursionhub.capstone.data.UserRepository;
import com.excursionhub.capstone.errors.DataNotFoundException;
import com.excursionhub.capstone.errors.NoPermissionException;
import com.excursionhub.capstone.mapper.TravelPackageMapper;
import com.excursionhub.capstone.models.*;
import com.excursionhub.capstone.models.dto.TravelPackageInputDTO;
import com.excursionhub.capstone.models.dto.TravelPackageDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TravelPackageServices extends AbstractDateTime {

    @Autowired
    private TravelPackageRepository travelPackageRepository;

    @Autowired
    private AttractionRepository attractionRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PackageAttractionRepository packageAttractionRepository;

    public TravelPackageDTO createTravelPackage(int userId, TravelPackageInputDTO travelPackageInputDTO) {
        Optional<User> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            throw new DataNotFoundException("User not found");
        }

        List<Attraction> dbAttractions = new ArrayList<>();
        for (Integer attractionId : travelPackageInputDTO.getAttractionIds()) {
            dbAttractions.add(attractionRepository.findById(attractionId).get());
        }

        TravelPackage travelPackage = TravelPackageMapper.toDbTravelPackage(travelPackageInputDTO, userOptional.get(), dbAttractions);
        travelPackage = travelPackageRepository.save(travelPackage);

        return TravelPackageMapper.toTravelPackage(travelPackage);
    }

    public void deleteTravelPackage(int userId, int packageId) {
        Optional<TravelPackage> dBOptPackage = travelPackageRepository.findById(packageId);
        if (dBOptPackage.isEmpty()) {
            throw new DataNotFoundException("Package Not found");
        }

        TravelPackage travelPackage = dBOptPackage.get();
        if (travelPackage.getUser().getId() != userId) {
            throw new NoPermissionException("Permission denied to delete the package");
        }
        travelPackageRepository.deleteById(packageId);
    }

    public List<TravelPackageDTO> getAllTravelPackages(int userId) {
        List<TravelPackage> dbTravelPackages = travelPackageRepository.getTravelPackageByUserId(userId);
        if (dbTravelPackages.isEmpty()) {
            throw new DataNotFoundException("No packages available currently. Please start creating Packages");
        }
        return TravelPackageMapper.toTravelPackages(dbTravelPackages);
    }

    public TravelPackageDTO getTravelPackageById(int userId, int packageId) {
        Optional<TravelPackage> travelPackageOpt = travelPackageRepository.findById(packageId);

        if (travelPackageOpt.isEmpty()) {
            throw new DataNotFoundException("Package Not found");
        }

        if (travelPackageOpt.get().getUser().getId() != userId) {
            throw new NoPermissionException("Permission denied to view the package");
        }

        return TravelPackageMapper.toTravelPackage(travelPackageOpt.get());
    }

    @Transactional
    public TravelPackageDTO updateTravelPackage(int userId, TravelPackageInputDTO travelPackageDTO) {
        int numRecordsUpdated = travelPackageRepository.updatePackage(userId, travelPackageDTO.getPackageId(), travelPackageDTO.getPackageName(), travelPackageDTO.getDescription());
        if (numRecordsUpdated == 0) {
            throw new DataNotFoundException("Package does not exist");
        }

        TravelPackage dbTravelPackage = travelPackageRepository.findById(travelPackageDTO.getPackageId()).get();
        packageAttractionRepository.deleteAttractionsByPackageId(travelPackageDTO.getPackageId());

        List<PackageAttraction> packageAttractions = new ArrayList<>();
        for (Integer attractionId : travelPackageDTO.getAttractionIds()) {
            PackageAttraction attraction = new PackageAttraction();
            attraction.setTravelPackage(dbTravelPackage);
            attraction.setAttraction(attractionRepository.findById(attractionId).get());

            packageAttractions.add(attraction);
        }
        packageAttractionRepository.saveAll(packageAttractions);
        return TravelPackageMapper.toTravelPackage(dbTravelPackage, packageAttractions);
    }

    public List<TravelPackageDTO> getEveryTravelPackage() {
        List<TravelPackage> dbTravelPackages = travelPackageRepository.findAll();
        if (dbTravelPackages.isEmpty()) {
            throw new DataNotFoundException("No packages available currently. Please start creating Packages");
        }
        return TravelPackageMapper.toTravelPackages(dbTravelPackages);
    }
}
