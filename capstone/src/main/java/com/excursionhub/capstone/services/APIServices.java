package com.excursionhub.capstone.services;

import com.excursionhub.capstone.models.dto.CoordinatesDTO;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Scanner;

@Service
public class APIServices {

    public CoordinatesDTO fetchCoordinates(String city, String countryCode) {
        String apiKey = System.getenv("APP_WEATHER_APIKEY");
        if (apiKey == null) {
            throw new IllegalStateException("No API Key found.");
        }
        String urlString = String.format( "http://api.openweathermap.org/geo/1.0/direct?q=%s,%s&limit=1&appid=%s",
                city, countryCode, apiKey);

        try {
            URL url = new URL(urlString);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");

            int responseCode = connection.getResponseCode();
            if (responseCode == 200) {
                Scanner scanner = new Scanner(url.openStream());
                StringBuilder response = new StringBuilder();
                while (scanner.hasNext()) {
                    response.append(scanner.nextLine());
                }
                scanner.close();

                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode rootNode = objectMapper.readTree(response.toString());
                if (rootNode.isArray() && rootNode.size() > 0) {
                    JsonNode locationNode = rootNode.get(0);
                    String name = locationNode.get("name").asText();
                    double latitude = locationNode.get("lat").asDouble();
                    double longitude = locationNode.get("lon").asDouble();

                    return new CoordinatesDTO(name, latitude,longitude);
                } else {
                    throw new IllegalStateException("No matching location found.");
                }
            } else {
                throw new IOException("Error fetching data, response code: " + responseCode);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch coordinates", e);
        }
    }

/*Cancelled plans for weather data for the time being, API requires bank details*/
}