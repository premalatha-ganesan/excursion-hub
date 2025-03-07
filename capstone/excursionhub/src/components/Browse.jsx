import React, { useEffect, useState } from 'react'
import { Container, Card, CardContent, Typography, Box, Breadcrumbs, Grid2, Link } from '@mui/material';
import { useNavigate } from 'react-router';

const Browse = ({ user }) => {
  const navigate = useNavigate();
  const [travelPackages, setTravelPackages] = useState([]);


  const fetchTravelPackageList = async () => {
    try {
      const response = await fetch(`http://localhost:8080/packageservices/fullpackagelist`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        setTravelPackages(result);
      } else {
        console.error("Failed to find the package information.");
        setTravelPackages([]);
      }
    } catch (error) {
      console.error("Error fetching package:", error);
      setTravelPackages([]);
    }
  };

  useEffect(() => {
    fetchTravelPackageList();
  }, [user]);

  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#223843' }}>
        <Link underline="hover" color="inherit" onClick={() => { navigate(`/`) }} sx={{ cursor: 'pointer' }}>Home</Link>
        <Typography color="inherit">Browse Excursions</Typography>
      </Breadcrumbs>

      <Container columns={{ xs: 4, sm: 8, md: 12 }} sx={{ py: 4 }}>
        <Typography variant="h5" sx={{ mb: 3, color: '#223843' }}>All Excursion Packages</Typography>
        {travelPackages.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', color: 'gray', marginTop: 2 }}>Something must be wrong! No packages can be found.</Typography>
        ) : (
          <Grid2 container spacing={3}>
            {travelPackages.map((travelPackage) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={travelPackage.packageId}>
                <Card sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                >
                  <Box sx={{ position: 'relative', height: 300, width: '100%' }}>
                    {travelPackage.attractionDTOs?.length > 0 && (
                      <>
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '50%',
                          height: '50%',
                          backgroundImage: `url(${travelPackage.attractionDTOs[0]?.imageUrl || '/icon.png'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }} />
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          width: '50%',
                          height: '50%',
                          backgroundImage: `url(${travelPackage.attractionDTOs[1]?.imageUrl || '/icon.png'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }} />
                        <Box sx={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          width: '50%',
                          height: '50%',
                          backgroundImage: `url(${travelPackage.attractionDTOs[2]?.imageUrl || '/icon.png'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }} />
                        <Box sx={{
                          position: 'absolute',
                          bottom: 0,
                          right: 0,
                          width: '50%',
                          height: '50%',
                          backgroundImage: `url(${travelPackage.attractionDTOs[3]?.imageUrl || '/icon.png'})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }} />
                      </>
                    )}
                  </Box>
                  <CardContent>
                    <Typography variant="h6">{travelPackage.packageName}</Typography>
                    <Typography variant="body1">Total attractions: {travelPackage.attractionDTOs.length}</Typography>
                    <Typography variant="body2">{travelPackage.attractionDTOs?.map((attraction) => attraction.attractionName).join(" | ")}</Typography>
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        )}

      </Container>
    </div>
  )
}
export default Browse;