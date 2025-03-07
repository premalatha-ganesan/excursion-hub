package com.excursionhub.capstone.services;

import com.excursionhub.capstone.data.UserRepository;
import com.excursionhub.capstone.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetServices {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public void sendResetToken(String email) {
        Optional<User> optUser = userRepository.findByEmail(email);
        if (optUser.isEmpty()) {
            System.out.println("email not found.");
            return;
        }

        User user = optUser.get();
        String token = generateToken();
        user.setResetToken(token);
        user.setTokenExpirationDate(LocalDateTime.now().plusHours(1));
        userRepository.save(user);

        sendPasswordResetEmail(user, token);
    }

    private String generateToken() {
        return UUID.randomUUID().toString();
    }

    private void sendPasswordResetEmail(User user, String token) {
        String resetLink = "localhost:5173/resetpassword?token=" + token;
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(user.getEmail());
        email.setSubject("Password Reset");
        email.setText("Follow the link to reset your password: " + "http://"+resetLink);
        javaMailSender.send(email);
    }

    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByResetToken(token);
        if (user == null || user.getTokenExpirationDate().isBefore(LocalDateTime.now())) {
            System.out.println("Invalid or expired token.");
            return;
        }

        user.setPwHash(encoder.encode(newPassword));
        user.setResetToken(null);
        user.setTokenExpirationDate(null);
        userRepository.save(user);
    }
}
