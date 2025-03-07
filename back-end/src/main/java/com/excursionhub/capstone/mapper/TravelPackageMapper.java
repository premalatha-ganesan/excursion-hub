package com.excursionhub.capstone.mapper;

import com.excursionhub.capstone.models.Attraction;
import com.excursionhub.capstone.models.PackageAttraction;
import com.excursionhub.capstone.models.TravelPackage;
import com.excursionhub.capstone.models.User;
import com.excursionhub.capstone.models.dto.AttractionDTO;
import com.excursionhub.capstone.models.dto.TravelPackageDTO;
import com.excursionhub.capstone.models.dto.TravelPackageInputDTO;

import java.util.ArrayList;
import java.util.List;

public class TravelPackageMapper {

    public static TravelPackage toDbTravelPackage(TravelPackageInputDTO travelPackageInputDTO, User user, List<Attraction> attractions) {
        TravelPackage travelPackage = new TravelPackage();
        travelPackage.setName(travelPackageInputDTO.getPackageName());
        travelPackage.setDescription(travelPackageInputDTO.getDescription());
        travelPackage.setUser(user);

        List<PackageAttraction> packageAttractions = new ArrayList<>();
        for (Attraction attraction : attractions) {
            PackageAttraction packageAttraction = new PackageAttraction();
            packageAttraction.setTravelPackage(travelPackage);
            packageAttraction.setAttraction(attraction);
            packageAttractions.add(packageAttraction);
        }
        travelPackage.setPackageAttractions(packageAttractions);

        return travelPackage;
    }

    public static List<TravelPackageDTO> toTravelPackages(List<TravelPackage> travelPackages) {
        return travelPackages
                .stream()
                .map(TravelPackageMapper::toTravelPackage)
                .toList();
    }

    public static TravelPackageDTO toTravelPackage(TravelPackage travelPackage) {
        return toTravelPackage(travelPackage, travelPackage.getPackageAttractions());
    }

    public static TravelPackageDTO toTravelPackage(TravelPackage travelPackage, List<PackageAttraction> packageAttractions) {
        TravelPackageDTO travelPackageDTO = new TravelPackageDTO();
        travelPackageDTO.setPackageId(travelPackage.getId());
        travelPackageDTO.setPackageName(travelPackage.getName());
        travelPackageDTO.setDescription(travelPackage.getDescription());

        List<AttractionDTO> attractionDTOs = new ArrayList<>();
        for (PackageAttraction packageAttraction : packageAttractions) {
            Attraction attraction = packageAttraction.getAttraction();
            AttractionDTO attractionDTO = AttractionMapper.toAttractionDto(attraction, null, null);
            attractionDTOs.add(attractionDTO);
        }
        travelPackageDTO.setAttractionDTOs(attractionDTOs);

        return travelPackageDTO;
    }
}
