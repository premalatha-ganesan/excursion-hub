package com.excursionhub.capstone.models.dto;

public class UserDTO {
    private int id;
    private String username;
    private String email;
    private String firstName;
    private String lastName;
    private String profileUrl;
    private String password;

    public UserDTO(String lastName, String firstName, String email, String username, int id, String profileUrl) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.username = username;
        this.id = id;
        this.profileUrl = profileUrl;
    }

    public UserDTO(){};

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}