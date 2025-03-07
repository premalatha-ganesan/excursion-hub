import React, { useEffect, useState } from 'react'
import { Container, Card, CardContent, Typography, Box, Avatar, Grid2 } from '@mui/material';
import getInitials from '../Util.js';
import { useNavigate } from 'react-router';

const Profile = ({ user }) => {
  const navigate = useNavigate();
  const [travelPackages, setTravelPackages] = useState([]);

  let initials = "?";
  if (user) {
    initials = getInitials(user);
  }

  const fetchTravelPackageList = async () => {
    try {
      const response = await fetch(`http://localhost:8080/packageservices/package/all?userId=${user.id}`, {
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
      {user ?
        <Container>
          <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            margin: "auto",
            width: '100%',
            mb: 2,
            bgcolor: '#F2E8DC'
          }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Avatar
                  sx={{
                    width: 112,
                    height: 112,
                    marginBottom: { xs: 2, sm: 0 },
                    marginRight: { sm: 2 },
                  }}
                  src={user.profileUrl}
                >{initials}</Avatar>
                <Typography variant="h4" sx={{ textAlign: 'left', color:'#223843' }}>
                  {user.firstName} {user.lastName}
                </Typography>
              </Box>
            </CardContent>
          </Card>
          <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            margin: "auto",
            width: '100%',
            bgcolor:'#F2E8DC'
          }}>
            <CardContent>
              <Typography variant="h5" sx={{ textAlign: 'left', marginBottom: 3, color:'#223843' }}>My Packages</Typography>

              {travelPackages.length === 0 ? (
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'gray', marginTop: 2 }}>You don't have any travel packages yet. Start adding some to see them here!</Typography>
              ) : (
                <Grid2 container spacing={3}>
                  {travelPackages.map((travelPackage) => (
                    <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={travelPackage.packageId}>
                      <Card sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.05)',
                          transition: 'transform 0.2s ease-in-out'
                        }
                      }}
                        onClick={() => navigate(`/packages/managePackages/${travelPackage.packageId}`)}
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
                          <Typography variant="h6">
                            {travelPackage.packageName}
                          </Typography>
                          <Typography sx={{
                            height: '100px',
                            overflowY: 'auto',
                            marginBottom: 1
                          }} variant="body2">
                            {travelPackage.description}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid2>
                  ))}
                </Grid2>
              )}
            </CardContent>
          </Card>
        </Container> :
        <div>Must be signed in to view profile page.</div>
      }
    </div>
  )
}

export default Profile;