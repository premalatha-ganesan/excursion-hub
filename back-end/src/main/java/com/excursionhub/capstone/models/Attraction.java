package com.excursionhub.capstone.models;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "attractions")
public class Attraction extends AbstractDateTime {

    @TableGenerator(name = "yourTableGenerator", allocationSize = 1, initialValue = 1)
    @Id
    @GeneratedValue(strategy= GenerationType.TABLE, generator="yourTableGenerator")
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
            name = "attraction_to_attraction_tag",
            joinColumns = @JoinColumn(name = "attraction_id"),
            inverseJoinColumns = @JoinColumn(name = "attraction_tag_id")
    )
    private Set<AttractionTag> attractionTags;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @OneToMany
    @JoinColumn(name = "attraction_id")
    private final List<Review> reviews = new ArrayList<>();

    public Attraction() {
    }

    public Attraction(int id){
        this.id = id;
    }

    public Attraction(String name, String description, String imageUrl, Set<AttractionTag> attractionTags) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.attractionTags = attractionTags;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Set<AttractionTag> getAttractionTags() {
        return attractionTags;
    }

    public void setAttractionTags(Set<AttractionTag> attractionTags) {
        this.attractionTags = attractionTags;
    }

    public Location getLocation() {
        return location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public List<Review> getReviews() {
        return reviews;
    }
}
