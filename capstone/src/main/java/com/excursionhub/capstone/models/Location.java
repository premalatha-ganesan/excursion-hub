package com.excursionhub.capstone.models;

import jakarta.persistence.*;

@Entity
public class Location {

    @TableGenerator(name = "yourTableGenerator", allocationSize = 1, initialValue = 1)
    @Id
    @GeneratedValue(strategy= GenerationType.TABLE, generator="yourTableGenerator")
    private int id;

    private String city;

    private String country;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "country_code")
    private String countryCode;

    public Location() {}


    public Location(int id, String city, String country, String imageUrl, String countryCode) {
        this.id = id;
        this.city = city;
        this.country = country;
        this.imageUrl = imageUrl;
        this.countryCode = countryCode;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }
}
