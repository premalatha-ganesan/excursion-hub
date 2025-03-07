package com.excursionhub.capstone.contollers;

import com.excursionhub.capstone.data.UserRepository;
import com.excursionhub.capstone.services.PasswordResetServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/passwordresetservices")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")

public class PasswordResetController {
    @Autowired
    private PasswordResetServices passwordResetServices;
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/forgotpassword")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        passwordResetServices.sendResetToken(email);
        return ResponseEntity.ok("Email sent");
    }

    @PostMapping("/resetpassword")
    public ResponseEntity<?> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
        passwordResetServices.resetPassword(token, newPassword);
        return ResponseEntity.ok("Password reset successfully");
    }
}
