import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Hero from './HeroImage';
import { BorderStyle } from '@mui/icons-material';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: 'black',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const Home = ({ user }) => {

  return (
    <>
      <Hero
        user={user} />
      <br />
      <Box sx={{ width: '90%', paddingTop:'2%', padding: '5%',  backgroundColor:'#7EA8BE' }}>
        <Stack spacing={2}>
          <Item sx={{border: '1px solid black', backgroundColor:'#F2E8DC' }}>
            <h2 style={{color:'#223843'}}>Start off by selecting the country you want to visit!</h2>
            <img src="images/country-choice.png" alt="country-choice" width="75%" />
          </Item>
          <Item sx={{border: '1px solid black', backgroundColor:'#F2E8DC' }}>
            <h2 style={{color:'#223843'}}>Now it's time to pick a city!</h2>
            <img src="images/city-choice.png" alt="city-choice" width="50%" />
          </Item >
          <Item sx={{border: '1px solid black', backgroundColor:'#F2E8DC' }}>
            <h2 style={{color:'#223843'}}>Look through all the things you can do there and pick one!</h2>
            <img src="images/attraction-choice.png" alt="attraction-choice" width="50%" />
          </Item>
          <Item sx={{border: '1px solid black', backgroundColor:'#F2E8DC' }}>
            <h2 style={{color:'#223843'}}>If you find something that you're interested in, either add it to your wishlist or to one of your excursion packages.</h2>
            <img src="images/wishlist-or-package.png" alt="wishlist-choice" width="50%" />

            <h2 style={{color:'#223843'}}>Anything added to your wishlist can always be added to any of your excursion packages later.</h2>
            <img src="images/wishlist-to-package.png" alt="add-from-wishlist" width="75%" />
          </Item>
          <Item sx={{border: '1px solid black', backgroundColor:'#F2E8DC' }}>
            <h2 style={{color:'#223843'}}>Once you're ready to take your trip, just reach out to us via the "Contact Us" page and select which of your packages you want.</h2>
            <h2 style={{color:'#223843'}}>Please include any plans, preferences, or instructions you have for us in your message.</h2>
            <h2 style={{color:'#223843'}}>From there we will take care of all the ticket purchases and itinerary planning so you don't have to!</h2>
            <img src="images/send-to-agent.png" alt="send-to-agent" width="50%" />
          </Item>
        </Stack>
      </Box>
    </>

  )
}


export default Home;
