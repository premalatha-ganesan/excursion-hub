package com.excursionhub.capstone.contollers;

import com.excursionhub.capstone.data.UserRepository;
import com.excursionhub.capstone.models.User;
import com.excursionhub.capstone.models.dto.UserDTO;
import com.excursionhub.capstone.services.UserServices;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/userservices")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class UserController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private UserServices userServices;

    @PostMapping("/register")
    public ResponseEntity<String> userRegistration(@RequestBody User user){
        if (userServices.userExistsByEmail(user.getEmail())) {
            return ResponseEntity.status(400).body("A user with this email already exists.");
        }
        if (userServices.userExistsByUsername(user.getUsername())) {
            return ResponseEntity.status(400).body("A user with this username already exists.");
        }
        userServices.registerUser(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<String> userLogin(@RequestBody UserDTO userDTO,
                                            HttpServletResponse response, HttpSession session){
        return userServices.loginUser(userDTO.getUsername(), userDTO.getPassword()).map(user -> {
            session.setAttribute("username", user.getUsername());
            return ResponseEntity.ok("Login Successful");
        }).orElse(ResponseEntity.status(400).body("Invalid username or password, Please try again."));
    }

    @GetMapping("/getUser")
    public ResponseEntity<?> getCurrentUser(HttpSession session, HttpServletRequest request) {
      String username = (String) session.getAttribute("username");

            if (username == null) {
            return ResponseEntity.status(401).body("No user logged in");
        }

        User user = userRepository.findByUsername(username).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }

        UserDTO userDTO = new UserDTO(user.getLastName(), user.getFirstName(),user.getEmail(),user.getUsername(),user.getId(),user.getProfileUrl() + "?ts=" + System.currentTimeMillis());

        return ResponseEntity.ok(userDTO);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        if(cookies != null){
            for(Cookie cookie : cookies){
                cookie.setAttribute("Max-Age", "0");
            }
        }
            HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
        }
        return ResponseEntity.ok("Logout successful");
    }
}


