import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Typography, Container, CardContent, Grid2, Card, CardMedia, Tab, Tabs, Box, Link, Breadcrumbs } from '@mui/material';

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:8080/locationservices/locations/all');
        if (!response.ok) {
          throw new Error('Error fetching countries')
        }
        const result = await response.json();
        setCountries(result);
      } catch (error) {
        console.error("Error fetching countries", error);
      }
    }
    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      if (!selectedCountry) return;
      try {
        const response = await fetch(`http://localhost:8080/locationservices/locations?country=${selectedCountry}`);
        if (!response.ok) {
          throw new Error(`Error fetching locations in ${selectedCountry}`);
        }
        const result = await response.json();
        setLocations(result);
      } catch (error) {
        console.error(`Error fetching locations in ${selectedCountry}`, error);
      }
    }
    fetchLocations();
  }, [selectedCountry]);

  return (
    <div>

      <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#223843' }}>
        <Link underline="hover" color="inherit" onClick={() => { navigate(`/`) }} sx={{ cursor: 'pointer' }}>
          Home
        </Link>
        <Typography color="inherit">Locations</Typography>
      </Breadcrumbs>

      <Container columns={{ xs: 4, sm: 8, md: 12 }} sx={{ py: 4 }}>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Tabs
            value={selectedCountry}
            onChange={(e, selected) => setSelectedCountry(selected)}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            aria-label="scrollable countries list"
            color='black'
            TabIndicatorProps={{
              style: {
                textColor: 'black',
                backgroundColor: "black"
              }
            }}
          >
            {countries.map((country) => (
              <Tab key={country} value={country} label={<span style={{color: '#223843'}}>{country}</span>} color='black'/>
            ))}
          </Tabs>
        </Box>

        <br />
        <br />

        <Grid2 container spacing={3}>
          {locations.map((location) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={location.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  '&:hover': {
                    transform: 'scale(1.1)',
                    transition: 'transform 0.2s ease-in-out'
                  }
                }}
                onClick={() => navigate(`/locations/${location.id}`)}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={location.imageUrl}
                  alt={location.city}
                />
                <CardContent>
                  <Typography variant='h5'>{location.city}</Typography>
                  <Typography variant='body2' color="text.secondary">{location.country}</Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Container>
    </div>
  )
}

export default Locations;