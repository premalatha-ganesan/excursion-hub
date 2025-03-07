package com.excursionhub.capstone.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.LocalDateTime;

@MappedSuperclass
public abstract class AbstractUser {
    @TableGenerator(name = "yourTableGenerator", allocationSize = 1, initialValue = 1)
    @Id
    @GeneratedValue(strategy= GenerationType.TABLE, generator="yourTableGenerator")
    private int id;
    private String firstName;
    private String lastName;
    @Email(message = "Proper email formatting required.")
    private String email;
    private String username;
    @NotNull(message = "Password Required")
    @Size(min = 5, message = "Password must be greater than 5 characters.")
    private String pwHash;
    private String profileUrl;

    @Column(name = "profile_picture_url")
    private String profilePictureUrl;

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    private String resetToken;
    private LocalDateTime tokenExpirationDate;

    private static final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
    public AbstractUser(String firstName, String lastName, String email, String username, String pwHash) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.username = username;
        this.pwHash = encoder.encode(pwHash);
    }

    public AbstractUser(String username, String password){
        this.username = username;
        this.pwHash = password;
    }

    public AbstractUser (){}

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    public int getId() {return id; }

    public @NotNull String getPwHash() {
        return pwHash;
    }

    public void setPwHash(@NotNull String pwHash) {
        this.pwHash = pwHash;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public @Email String getEmail() {
        return email;
    }

    public void setEmail(@Email String email) {
        this.email = email;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getProfileUrl() {
        return profileUrl;
    }

    public void setProfileUrl(String profileUrl) {
        this.profileUrl = profileUrl;
    }

    public LocalDateTime getTokenExpirationDate() {
        return tokenExpirationDate;
    }

    public void setTokenExpirationDate(LocalDateTime tokenExpirationDate) {
        this.tokenExpirationDate = tokenExpirationDate;
    }

    public String getResetToken() {
        return resetToken;
    }

    public void setResetToken(String resetToken) {
        this.resetToken = resetToken;
    }

    public boolean isMatchingPassword(String password) {
        return encoder.matches(password, pwHash);
    }
}
