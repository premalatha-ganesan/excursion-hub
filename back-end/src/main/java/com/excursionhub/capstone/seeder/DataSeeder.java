package com.excursionhub.capstone.seeder;

import com.excursionhub.capstone.data.*;
import com.excursionhub.capstone.models.*;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.time.LocalDateTime;
import java.util.*;

@Component
public class DataSeeder {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AttractionRepository attractionRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private PhotoRepository photoRepository;

    @Autowired
    private AttractionTagRepository attractionTagRepository;

    @Autowired
    private AttractionToAttractionTagRepository attractionToAttractionTagRepository;

    @Autowired
    private WishlistAttractionRepository wishlistAttractionRepository;

    @Autowired
    private TravelPackageRepository travelPackageRepository;

    private static final Random RANDOM = new Random();

    @PostConstruct
    public void initialize() throws Exception {
        setupUsers();
        setupLocations();
        setupAttractions();
        setupReviews();
        setupWishlistAttractions();
        setupPackages();
    }

    private void setupUsers() throws Exception {
        List<User> jsonUsers = new ObjectMapper().readValue(readFile("init-users.json"), new TypeReference<List<User>>() {});

        for (User jsonUser: jsonUsers) {
            Optional<User> dbUser = userRepository.findByUsername(jsonUser.getUsername());
            if (dbUser.isEmpty()) {
                User newUser = new User();
                copyUserFields(jsonUser, newUser);
                userRepository.save(newUser);
            } else {
                User currentUser = dbUser.get();
                copyUserFields(jsonUser, currentUser);
                userRepository.save(currentUser);
            }
        }
    }

    private void setupLocations() throws Exception {
        List<Location> jsonLocations = new ObjectMapper().readValue(readFile("init-locations.json"), new TypeReference<List<Location>>() {});

        for (Location jsonLocation: jsonLocations) {
            Optional<Location> dbLocation = locationRepository.findByCityAndCountry(jsonLocation.getCity(), jsonLocation.getCountry());
            if (dbLocation.isEmpty()) {
                Location newLocation = new Location();
                newLocation.setCity(jsonLocation.getCity());
                newLocation.setCountry(jsonLocation.getCountry());
                newLocation.setImageUrl(jsonLocation.getImageUrl());
                newLocation.setCountryCode(jsonLocation.getCountryCode());
                locationRepository.save(newLocation);
            } else {
                Location currentLocation = dbLocation.get();
                currentLocation.setImageUrl(jsonLocation.getImageUrl());
                locationRepository.save(currentLocation);
            }
        }
    }

    private void setupAttractions() throws Exception {
        List<JsonAttraction> jsonAttractions = new ObjectMapper().readValue(readFile("init-attractions.json"), new TypeReference<List<JsonAttraction>>() {
        });
        attractionToAttractionTagRepository.deleteAll();
        attractionTagRepository.deleteAll();

        for(JsonAttraction jsonAttraction : jsonAttractions) {
            Optional<Attraction> attractionOptional = attractionRepository.findByName(jsonAttraction.getName());
            if(attractionOptional.isEmpty()) {
                Attraction newAttraction = new Attraction();
                newAttraction.setName(jsonAttraction.getName());
                newAttraction.setDescription(jsonAttraction.getDescription());
                newAttraction.setImageUrl(jsonAttraction.getImageUrl());

                newAttraction.setLocation(locationRepository.findByCityAndCountry(jsonAttraction.getCity(), jsonAttraction.getCountry()).get());

                Set<AttractionTag> attractionTags = new HashSet<>();
                for (String tag : jsonAttraction.getAttractionTags()) {
                    AttractionTag newTag = new AttractionTag();
                    newTag.setAttractionTagType(AttractionTagType.valueOf(tag));
                    attractionTags.add(newTag);
                }
                newAttraction.setAttractionTags(attractionTags);

                attractionRepository.save(newAttraction);
            } else {
                Attraction dbAttraction = attractionOptional.get();
                dbAttraction.setDescription(jsonAttraction.getDescription());
                dbAttraction.setImageUrl(jsonAttraction.getImageUrl());

                Set<AttractionTag> attractionTags = new HashSet<>();
                for (String tag : jsonAttraction.getAttractionTags()) {
                    AttractionTag newTag = new AttractionTag();
                    newTag.setAttractionTagType(AttractionTagType.valueOf(tag));
                    attractionTags.add(newTag);
                }
                dbAttraction.setAttractionTags(attractionTags);

                attractionRepository.save(dbAttraction);
            }
        }
    }

    private void setupReviews() throws Exception {
        List<JsonReview> jsonReviews = new ObjectMapper().readValue(readFile("init-reviews.json"), new TypeReference<List<JsonReview>>() {
        });

        for(JsonReview jsonReview : jsonReviews) {
            Optional<User> optUser = userRepository.findByUsername(jsonReview.getUsername());
            User user = optUser.get();

            Optional<Review> dbReviewOpt = reviewRepository.getByUsernameAndAttraction(jsonReview.getUsername(), jsonReview.getAttractionName());
            if(dbReviewOpt.isEmpty()) {
                Review newReview = new Review();
                newReview.setUser(user);
                Optional<Attraction> optAttraction = attractionRepository.findByName(jsonReview.getAttractionName());
                Attraction attraction = optAttraction.get();
                newReview.setAttraction(attraction);
                newReview.setComment(jsonReview.getComment());
                newReview.setRating(jsonReview.getRating());
                newReview.setCreatedAt(LocalDateTime.now());
                newReview.setUpdatedAt(LocalDateTime.now());
                Review savedReview = reviewRepository.save(newReview);

                for (String url : jsonReview.getImageUrls()) {
                    Photo photo = new Photo();
                    photo.setReview(savedReview);
                    photo.setPhotoUrl(url);
                    photo.setUser(user);
                    photo.setUploadedAt(LocalDateTime.now().minusDays(RANDOM.nextInt(5)));
                    photoRepository.save(photo);
                }
            } else {
                Review dbReview = dbReviewOpt.get();
                dbReview.setRating(jsonReview.getRating());
                dbReview.setComment(jsonReview.getComment());
                reviewRepository.save(dbReview);
            }

        }
    }

    private void setupWishlistAttractions() throws Exception {
        List<JsonWishlistAttr> jsonWishlistAttrs = new ObjectMapper().readValue(readFile("init-wishlist-attractions.json"), new TypeReference<List<JsonWishlistAttr>>() {
        });

        for(JsonWishlistAttr jsonWishlistAttr : jsonWishlistAttrs) {

            Optional<User> optUser = userRepository.findByUsername(jsonWishlistAttr.getUsername());
            User user = optUser.get();

            Optional<WishlistAttraction> dbWishlistAttrOpt = wishlistAttractionRepository.getByUsernameAttraction(jsonWishlistAttr.getUsername(), jsonWishlistAttr.getAttractionName());
            if(dbWishlistAttrOpt.isEmpty()) {
                WishlistAttraction newWishlistAttr = new WishlistAttraction();
                newWishlistAttr.setUser(user);
                Optional<Attraction> optAttraction = attractionRepository.findByName(jsonWishlistAttr.getAttractionName());
                Attraction attraction = optAttraction.get();
                newWishlistAttr.setAttraction(attraction);
                newWishlistAttr.setCreatedAt(LocalDateTime.now().minusDays(RANDOM.nextInt(5)));
                wishlistAttractionRepository.save(newWishlistAttr);
            } else {
                WishlistAttraction dbWishlistAttr = dbWishlistAttrOpt.get();
                wishlistAttractionRepository.save(dbWishlistAttr);
            }
        }
    }

    private void setupPackages () throws Exception {
        List<JsonPackages> jsonPackages = new ObjectMapper().readValue(readFile("init-packages.json"), new TypeReference<List<JsonPackages>>() {
        });

        for(JsonPackages jsonPackage : jsonPackages) {
            Optional<User> dbUser = userRepository.findByUsername(jsonPackage.getUsername());

            if(dbUser.isPresent()){
                Optional<TravelPackage> dbTravelPackage = travelPackageRepository.getPackageByPackageNameAndUserId(jsonPackage.getPackageName(), dbUser.get().getId());
                if(dbTravelPackage.isEmpty()) {
                    TravelPackage travelPackage = new TravelPackage();
                    travelPackage.setUser(dbUser.get());
                    travelPackage.setName(jsonPackage.getPackageName());
                    travelPackage.setDescription(jsonPackage.getDescription());
                    travelPackage.setCreatedAt(LocalDateTime.now());
                    List<PackageAttraction> packageAttractions = new ArrayList<>();
                    for (String attraction : jsonPackage.getAttractions()) {
                        Optional<Attraction> dbAttraction = attractionRepository.findByName(attraction);
                        PackageAttraction packageAttraction = new PackageAttraction();
                        packageAttraction.setTravelPackage(travelPackage);
                        packageAttraction.setAttraction(dbAttraction.get());
                        packageAttractions.add(packageAttraction);
                    }
                    travelPackage.setPackageAttractions(packageAttractions);
                    travelPackageRepository.save(travelPackage);
                } else {
                    TravelPackage travelPackage = dbTravelPackage.get();
                    travelPackage.setName(jsonPackage.getPackageName());
                    travelPackage.setDescription(jsonPackage.getDescription());
                    travelPackage.setUpdatedAt(LocalDateTime.now());
                    travelPackageRepository.save(travelPackage);
                }
            }
        }

    }

    private static void copyUserFields(User jsonUser, User newUser) {
        newUser.setFirstName(jsonUser.getFirstName());
        newUser.setLastName(jsonUser.getLastName());
        newUser.setEmail(jsonUser.getEmail());
        newUser.setUsername(jsonUser.getUsername());
        newUser.setPwHash(jsonUser.getPwHash());
    }

    private Reader readFile(String fileName) throws Exception {
        Resource resource = new ClassPathResource(fileName);
        InputStream is = resource.getInputStream();
        return new InputStreamReader(is);
    }

}
