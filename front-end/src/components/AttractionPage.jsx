import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Rating from '@mui/material/Rating';
import Avatar from '@mui/material/Avatar';
import Review from './Review';
import { Typography, Container, CardContent, Grid2, Card, CardMedia, Breadcrumbs, Link, FormControl, InputLabel, Select, MenuItem, Box, Chip, Modal, Fade, Backdrop } from '@mui/material';

const AttractionPage = ({ user }) => {
  const { attractionId } = useParams();
  const navigate = useNavigate();
  const routerLocation = useLocation();
  const { attraction: stateAttraction } = routerLocation.state || {};
  const [fetchedAttraction, setFetchedAttraction] = useState(undefined);
  const [reviews, setReviews] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!stateAttraction) {
      const fetchAttraction = async () => {
        try {
          const response = await fetch(`http://localhost:8080/locationservices/attractions/${attractionId}`);
          if (!response.ok) {
            throw new Error('Error fetching attraction')
          }
          const data = await response.json();
          setFetchedAttraction(data);
        } catch (error) {
          console.error("Error fetching attraction", error);
        }
      };
      fetchAttraction();
    }
  }, [attractionId]);


  const attraction = stateAttraction || fetchedAttraction;

  useEffect(() => {
    const getReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8080/locationservices/attractions/${attractionId}/reviews`, {
          method: "GET"
        });
        if (response.ok) {
          const reviewData = await response.json();
          setReviews(reviewData);
        } else {
          console.error("Failed find reviews.");
          setReviews([]);
        }
      } catch (error) {
        console.log(error)
      };
    }
    getReviews();
  }, [])


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
  }));

  if (!attraction) {
    return <div>No attraction or location data available</div>;
  }
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#223843' }}>
        <Link underline="hover" color="inherit" onClick={() => { navigate(`/`) }} sx={{ cursor: 'pointer' }}>
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => { navigate(`/locations/`) }}
          sx={{ cursor: 'pointer' }}
        >
          Locations
        </Link>
        {location ?
          <Link underline="hover"
            color="inherit"
            onClick={() => { navigate(-1) }}
            sx={{ cursor: 'pointer' }}>{'Attractions in ' + attraction.city + ', ' + attraction.country}</Link>
          :
          <Link underline="hover"
            color="inherit"
            onClick={() => { navigate(-1) }}
            sx={{ cursor: 'pointer' }}>Loading...</Link>
        }
        {attraction ?
          <Typography color="inherit">{attraction.attractionName}</Typography>
          :
          <Typography color="inherit">Loading...</Typography>
        }
      </Breadcrumbs>
      <br />

      <Container>
        <Card sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          margin: "auto",
          width: '100%',
           backgroundColor:'#F2E8DC'
        }}>
          <CardContent>
            <Typography variant="h4" textAlign={'left'}>{attraction.attractionName}</Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ objectFit: 'contain', width: '100%', height: '50vh', backgroundColor: "inherit" }}
            image={attraction.imageUrl}
            alt={attraction.attractionName}
            onClick={() => setModalOpen(true)}
          />
          <Modal
            sx={{
              position: 'fixed',
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": {
                backgroundcolor: "red"
              }
            }}
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            closeAfterTransition
            disableScrollLock
          >
            <Fade in={modalOpen} timeout={500} sx={{ outline: "none" }}>
              <img
                src={attraction.imageUrl}
                alt={`${attraction.attractionName} fade`}
                style={{ maxHeight: "80%", maxWidth: "80%", objectFit: 'contain' }}
              />
            </Fade>
          </Modal>
          <CardContent>
            <br />
            <Typography variant="h6" textAlign={'left'} paddingBottom={1}>Description</Typography>
            <Typography variant="body1" textAlign={'left'}>{attraction.description}</Typography>
            <br />
            <Typography variant="body2" textAlign={'left'}>Location: {attraction.city}</Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {attraction.attractionTags.map((tag, idx) => (
                <Chip sx={{ marginTop: 1, marginRight: 1, fontSize: '0.75rem' }} label={tag} key={idx} size="small" />
              ))}
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ mt: 5,  backgroundColor:'#7EA8BE' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', marginY: 2 }}>
            <Typography variant='h4' textAlign={'left'}>Reviews</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-center' }}>
              <Stack alignItems={'center'}>
                <Typography variant='body1'>{Number(attraction.avgRating).toFixed(1)} out of 5</Typography>
                <Rating name="read-only" precision={0.1} defaultValue={0} value={attraction.avgRating} readOnly />
                <Typography variant='body2'> with {attraction.totalReviews} total reviews.</Typography>
              </Stack>
            </Box>
          </Box>
          <Review
            user={user}
            attractionId={attractionId}
          />
          </Card>
          <br />
          <Card sx={{ backgroundColor:'#7EA8BE'}}>
          <Box sx={{ m: 2 }}>
            {reviews.map((review) => (
              <Stack spacing={0} padding={1} key={review.id} >
                <Item sx={{ display: 'flex', alignItems: 'left', justifyContent: 'space-between', backgroundColor:'#F2E8DC',border: '1px solid black' }}>
                  <Avatar src={review.user.profileUrl} sx={{ width: 24, height: 24 }}></Avatar>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
                    {review.user.username}
                    {<Rating name="read-only" precision={0.5} defaultValue={0} value={review.rating} readOnly sx={{ ml: 1,  }} />}
                    ({review.rating})
                  </Box>
                </Item>
                <Item sx={{border: '1px solid black'}}>{review.comment}</Item>
              </Stack>
            ))}
          </Box>
        </Card>
      </Container>
    </div>
  )
}

export default AttractionPage