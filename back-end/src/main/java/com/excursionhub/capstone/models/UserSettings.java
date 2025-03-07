package com.excursionhub.capstone.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "user_settings")
public class UserSettings extends AbstractDateTime {

    @Id
    @Column(name = "user_id")
    private int userId;

    @Column(name = "theme")
    private String theme;

    @Column(name = "email_notifications")
    private boolean emailNotifications;

    @Column(name = "privacy_level")
    private String privacyLevel;

    public UserSettings() {
    }

    public UserSettings(int userId, String theme, boolean emailNotifications, String privacyLevel) {
        this.userId = userId;
        this.theme = theme;
        this.emailNotifications = emailNotifications;
        this.privacyLevel = privacyLevel;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public boolean isEmailNotifications() {
        return emailNotifications;
    }

    public void setEmailNotifications(boolean emailNotifications) {
        this.emailNotifications = emailNotifications;
    }

    public String getPrivacyLevel() {
        return privacyLevel;
    }

    public void setPrivacyLevel(String privacyLevel) {
        this.privacyLevel = privacyLevel;
    }
}
