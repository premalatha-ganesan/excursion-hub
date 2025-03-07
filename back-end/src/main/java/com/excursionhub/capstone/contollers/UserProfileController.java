package com.excursionhub.capstone.contollers;

import com.excursionhub.capstone.data.ProfilePicRepository;
import com.excursionhub.capstone.data.UserRepository;
import com.excursionhub.capstone.errors.DataNotFoundException;
import com.excursionhub.capstone.models.ProfilePic;
import com.excursionhub.capstone.models.User;
import com.excursionhub.capstone.models.WishlistAttraction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.CacheControl;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/userprofileservices")
public class UserProfileController {

    @Autowired
    private ProfilePicRepository profilePicRepository;

    @Autowired
    private UserRepository userRepository;

    private User resultUser(User dbUser){
        User result = new User();
        result.setFirstName(dbUser.getFirstName());
        result.setLastName(dbUser.getLastName());
        result.setProfileUrl(dbUser.getProfileUrl());
        result.setEmail(dbUser.getEmail());
        return result;
    }

    @GetMapping(value = "/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId) {
        Optional<User> dbUserOpt = userRepository.findById(userId);
        if (dbUserOpt.isPresent()) {
            User dbUser = dbUserOpt.get();
            return ResponseEntity.ok(resultUser(dbUser));
        } else {
            throw new DataNotFoundException("User Not Found");
        }
    }

    @PutMapping(value = "/{userId}")
    public ResponseEntity<User> updateUserProfile(@PathVariable(value = "userId") int userId, @RequestBody User user) {
        Optional<User> dbUserOpt = userRepository.findById(userId);
        if(dbUserOpt.isPresent()) {
            User dbUser = dbUserOpt.get();
            dbUser.setFirstName(user.getFirstName());
            dbUser.setLastName(user.getLastName());
            dbUser.setEmail(user.getEmail());
            userRepository.save(dbUser);
            return ResponseEntity.ok(resultUser(dbUser));
        }
        else {
            throw new DataNotFoundException("User Not Found");
        }
    }

    @PostMapping(value = "/{userId}/picture")
    public ResponseEntity<User> uploadProfilePic(@RequestParam(value = "file") MultipartFile file, @PathVariable(value = "userId") Integer userId) throws IOException {
        Optional<User> dbUserOpt = userRepository.findById(userId);
        if(dbUserOpt.isEmpty()) {
            throw new DataNotFoundException("User not found");
        }

        Optional<ProfilePic> dbProfilePicOpt = profilePicRepository.findById(userId);
        if(dbProfilePicOpt.isEmpty()) {
            ProfilePic profilePic = new ProfilePic();
            profilePic.setImage(file.getBytes());
            profilePic.setUserID(userId);
            profilePicRepository.save(profilePic);
        }
        else {
            ProfilePic profilePic = dbProfilePicOpt.get();
            profilePic.setImage(file.getBytes());
            profilePicRepository.save(profilePic);
        }

        String profileUrl = "http://localhost:8080/userprofileservices/" + userId +"/picture";
        User dbUser = dbUserOpt.get();
        dbUser.setProfileUrl(profileUrl);
        dbUser = userRepository.save(dbUser);

        return ResponseEntity.ok().contentType(MediaType.APPLICATION_JSON).body(resultUser(dbUser));
    }

    @GetMapping(value = "/{userId}/picture")
    public ResponseEntity<byte[]> getProfilePic(@PathVariable(value = "userId") int userId) {
        Optional<ProfilePic> dbProfilePicOpt = profilePicRepository.findById(userId);
        if(dbProfilePicOpt.isPresent()) {
            ProfilePic profilePic = dbProfilePicOpt.get();
            byte[] image = profilePic.getImage();
            return ResponseEntity.ok()
                    .contentType(MediaType.IMAGE_JPEG)
                    .cacheControl(CacheControl.noCache())
                    .body(image);
        }
        else {
            throw new DataNotFoundException("Profile Picture not found");
        }
    }

    @DeleteMapping("/{userId}/picture")
    public ResponseEntity<String> deleteProfilePic(@PathVariable(value = "userId") int id) {
        Optional<User> dbUserOpt = userRepository.findById(id);
        User user = dbUserOpt.get();

        if(dbUserOpt.isEmpty()){
            throw new DataNotFoundException("User not found");
        }

        Optional<ProfilePic> dbProfilePicOpt = profilePicRepository.findById(user.getId());
        if(dbProfilePicOpt.isPresent()) {
            profilePicRepository.deleteById(user.getId());
            user.setProfileUrl(null);
            userRepository.save(user);
            return ResponseEntity.ok("Profile pic is deleted");
        }
        else {
            throw new DataNotFoundException("Profile pic Not Found");
        }
    }
}
