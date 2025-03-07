import { Add } from "@mui/icons-material";
import { Avatar, Box, Card, CardContent, IconButton, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, Typography, InputLabel, FormControl } from "@mui/material";
import { useEffect, useState } from "react";


export default function AttractionSelector(
    {
        handleAdd,
        availableAttractions,
        setAvailableAttractions,
        country,
        setCountry
    }) {
    const [city, setCity] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");



    const fetchCity = async (country) => {
        try {
            const response = await fetch(`http://localhost:8080/locationservices/locations?country=${country}`,
                {
                    method: "GET",
                    credentials: "include",

                });
            if (response.ok) {
                const result = await response.json();
                setCity(result);
                setSelectedCountry(country);
            } else {
                console.error("Failed to find the city information.");
            };
        } catch (error) {
            console.log(error);
        }
    }

    const fetchAttractions = async (cityId) => {
        console.log("Fetch attractions");
        try {
            setSelectedCity(cityId);
            if (cityId) {
                const response = await fetch(`http://localhost:8080/locationservices/${cityId}/attractions`,
                    {
                        method: "GET",
                        credentials: "include",

                    });
                if (response.ok) {
                    const result = await response.json();
                    setAvailableAttractions(result);

                } else {
                    console.error("Failed to find the attractions information.");
                    setAvailableAttractions();
                };
            }
        } catch (error) {
            console.log(error);
        };
    }

    return (
        <Card sx={{ height: "100%", width: "100%", bgcolor:'#F2E8DC' }}>
            <CardContent sx={{ height: "100%" }}>
                <Box>
                    <Typography color="#223843" variant="body1">
                        Filter
                    </Typography>
                    <FormControl size="small" sx={{ width: 200 }}>
                        <InputLabel>Country</InputLabel>
                        <Select
                            size="small"
                            label="Country"
                            value={selectedCountry}
                            style={{ background: "white" }}
                            onChange={(event) => fetchCity(event.target.value)}>
                            {
                                country.map((c, idx) => (
                                    <MenuItem key={idx} value={c}>{c}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ width: 200, ml: 2 }}>
                        <InputLabel>City</InputLabel>
                        <Select
                            size="small"
                            label="City"
                            value={selectedCity}
                            style={{ background: "white" }}
                            disabled={!selectedCountry}
                            onChange={(event) => fetchAttractions(event.target.value)}>
                            {
                                city.map((c, idx) => (
                                    <MenuItem key={idx} value={c.id}>{c.city}</MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>

                    <List sx={{ mt: 2, width: '100%', bgcolor: 'background.paper', maxHeight: 320, overflowY: 'auto' }}>
                        {
                            availableAttractions.map((attraction, idx) => (
                                <ListItem key={idx}>
                                    <ListItemAvatar>
                                        <Avatar src={attraction.imageUrl || "/icon.png"} />
                                    </ListItemAvatar>
                                    <ListItemText primary={attraction.attractionName} />
                                    <IconButton onClick={() => handleAdd(attraction)}>
                                        <Add />
                                    </IconButton>
                                </ListItem>
                            ))
                        }
                    </List>
                </Box>
            </CardContent>
        </Card>
    );
}