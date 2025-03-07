import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Container, CardContent, Grid2, Card, CardMedia, Breadcrumbs, Link, Box, Chip, Rating, Menu, MenuItem, Button, CardActions, Divider, Snackbar, Alert } from '@mui/material';
import Favorite from '@mui/icons-material/Favorite';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';

const CityPage = ({ user }) => {
  const { cityId } = useParams();
  const [attractions, setAttractions] = useState([]);
  const [location, setLocation] = useState("");
  const [showPackageAddConfirm, setShowPackageAddConfirm] = useState(false);


  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAttraction, setSelectedAttraction] = useState(null);

  const [filteredAttractions, setFilteredAttractions] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [travelPackages, setTravelPackages] = useState([]);
  const [addToPackageConfirmation, setAddToPackageConfirmation] = useState("");

  let navigate = useNavigate();



  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        var url = `http://localhost:8080/locationservices/${cityId}/attractions`;
        if (user) {
          url = `http://localhost:8080/locationservices/${cityId}/attractions?userId=${user.id}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Error fetching attractions')
        }
        const data = await response.json();
        setAttractions(data);
        setFilteredAttractions(data);
        const tags = Array.from(new Set(data.flatMap((attraction) => attraction.attractionTags)));
        setAvailableTags(tags);
      } catch (error) {
        console.error("Error fetching attractions", error);
      }
    };
    fetchAttractions();
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`http://localhost:8080/locationservices/${cityId}`);
        if (!response.ok) {
          throw new Error('Error fetching location')
        }
        const data = await response.json();
        setLocation(data);
      } catch (error) {
        console.error("Error fetching location", error);
      }
    };
    fetchLocation();
  }, []);



  useEffect(() => {
    filterAttractions();
  }, [selectedFilters, attractions]);

  const fetchTravelPackageList = async () => {
    if (user) {
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
        alert("Error fetching packages : " + error);
      } 
    }
  };

useEffect(() => {
    fetchTravelPackageList();
}, [user]);


  const openMenu = (event, attraction) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedAttraction(attraction);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedAttraction(null);
  };

  //Wishlist/Package button methods
  const handleAddToWishlist = (event, attraction) => {
    event.stopPropagation();
    console.log(`Added ${attraction.attractionName} to wishlist.`);
    if (addAttractionToWishlist(attraction)) {
      const attractionList = attractions.map(a => {
        if (a.attractionId == attraction.attractionId) {
          return { ...a, attractionInWishlist: true };
        }
        return a;
      });
      setAttractions(attractionList);

      const filteredAttractionList = filteredAttractions.map(a => {
        if (a.attractionId == attraction.attractionId) {
          return { ...a, attractionInWishlist: true };
        }
        return a;
      });
      setFilteredAttractions(filteredAttractionList);
    }
  };

  const handleRemoveFromWishlist = (event, attraction) => {
    event.stopPropagation();
    console.log(`Removed ${attraction.attractionName} from wishlist.`);
    if (removeFromWishlist(attraction)) {
      const attractionList = attractions.map(a => {
        if (a.attractionId == attraction.attractionId) {
          return { ...a, attractionInWishlist: false };
        }
        return a;
      });
      setAttractions(attractionList);

      const filteredAttractionList = filteredAttractions.map(a => {
        if (a.attractionId == attraction.attractionId) {
          return { ...a, attractionInWishlist: false };
        }
        return a;
      });
      setFilteredAttractions(filteredAttractionList);
    }
  };

  const addAttractionToWishlist = async (attraction) => {
    try{
      const response = await fetch(`http://localhost:8080/wishlistservices/wishlistAttraction?userId=${user.id}&attractionId=${attraction.attractionId}`,
        {
          method:"POST",
          credentials:"include"
        });
        if(!response.ok) {
          throw new Error("Cannot add attraction to wishlist");
        }
        const result = await response.json();
        console.log("Added to wishlist " + result);
        return true;
    } catch(error) {
      console.log("Error : ", error);
      return false;
    }
  }

  const removeFromWishlist = async (attraction) => {
    try{
      const response = await fetch(`http://localhost:8080/wishlistservices/attraction/${attraction.attractionId}?userId=${user.id}`,
        {
          method:"DELETE",
          credentials:"include"
        });
        if(!response.ok) {
          throw new Error("Cannot add attraction to wishlist");
        }
        const result = await response.text();
        console.log("Removed from wishlist " + result);
        return true;
    } catch(error) {
      console.log("Error : ", error);
      return false;
    }
  }

  const handleAddToPackage = (event, travelPackage) => {
    if (event && event.stopPropagation) {
      event.stopPropagation();
      console.log(`Added ${selectedAttraction.attractionId} to ${travelPackage}`);
      var selectedAttractionId = selectedAttraction.attractionId;
      var attrIds = [];
      travelPackage.attractionDTOs.forEach(attractionDto => {
        attrIds.push(attractionDto.attractionId);
      });
      if (!attrIds.includes(selectedAttractionId)) {
        attrIds.push(selectedAttractionId);
        var travelPackageInputDto = {
          packageId : travelPackage.packageId,
          packageName : travelPackage.packageName,
          description : travelPackage.description,
          attractionIds : attrIds
        };
        editTravelPackage(travelPackageInputDto);
        fetchTravelPackageList();
        setShowPackageAddConfirm(true);
        setAddToPackageConfirmation("Attraction added to package!")
      } else {
        setShowPackageAddConfirm(true);
        setAddToPackageConfirmation("Attraction already present in the package!")
      }
      closeMenu();
    }
  };

  const editTravelPackage = async (travelPackageInputDto) => {
    try {
        const response = await fetch(
            `http://localhost:8080/packageservices/package?userId=${user.id}`,
            {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(travelPackageInputDto)
              }
            );
        if(!response.ok) {
            throw new Error("Unable to update package")
        } 
        const result = await response.json();
        console.log(result);
    } catch (error) {
        alert("Failed to edit packge : " + error);
    }
};

  const handleCreateNewPackage = (event) => {
    event.stopPropagation();
    console.log(`Created a new package and added ${selectedAttraction.attractionName}`);
    navigate(`/packages/managePackages?attractionId=${selectedAttraction.attractionId}`);
  };
  //Wishlist/Package button methods
  const handleFilterButtonClick = (selectedTag) => {
    if (selectedFilters.includes(selectedTag)) {
      setSelectedFilters((prevFilters) => prevFilters.filter((tag) => tag !== selectedTag));
    } else {
      setSelectedFilters((prevFilters) => [...prevFilters, selectedTag]);
    }
  }

  const filterAttractions = () => {
    if (selectedFilters.length > 0) {
      const filtered = attractions.filter((attraction) => selectedFilters.some((filter) => attraction.attractionTags.includes(filter)));
      setFilteredAttractions(filtered);
    } else {
      setFilteredAttractions(attractions);
    }
  }

  return (
    <div>
      <Snackbar 
          open={showPackageAddConfirm}
          autoHideDuration={5000}
          onClose={() => setShowPackageAddConfirm(false)}>
            <Alert
                onClose={() => setShowPackageAddConfirm(false)}
                severity="info"
                variant="filled"
                sx={{width:'100%'}}
                >
                    {addToPackageConfirmation}
              </Alert>
      </Snackbar>
      <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#223843' }}>
        <Link underline="hover" color="inherit" onClick={() => { navigate(`/`) }} sx={{ cursor: 'pointer' }}>
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          onClick={() => { navigate(-1) }}
          sx={{ cursor: 'pointer' }}
        >
          Locations
        </Link>
        {location ?
          <Typography color="inherit">{'Attractions in ' + location.city + ', ' + location.country}</Typography>
          :
          <Typography color="inherit">Loading...</Typography>
        }
      </Breadcrumbs>
      <br />
      {attractions.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" sx={{ color: '#223843' }}>Filter by Tags</Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
            {availableTags.map((tag, idx) => (
              <Chip
                key={idx}
                label={tag}
                clickable
                sx={{
                  backgroundColor: selectedFilters.includes(tag) ? 'primary.main' : 'grey.300',
                  color: selectedFilters.includes(tag) ? 'white' : 'black',
                  '&:hover': {
                    backgroundColor: selectedFilters.includes(tag) ? 'primary.dark' : 'grey.400',
                  },
                }}
                color={selectedFilters.includes(tag) ? "primary" : "default"}
                onClick={() => handleFilterButtonClick(tag)}
              />
            ))}
          </Box>
        </Box>
      )}


      {attractions.length === 0 ?
        <div>
          <br />
          <Typography variant="h6" align="center" sx={{ color: '#223843' }}>
            No attractions available for this location.
          </Typography>
        </div>
        : filteredAttractions.length === 0 ?
          <div>
            <br />
            <Typography variant="h6" align="center" sx={{ color: '#223843' }}>
              No attractions match these filters.
            </Typography>
          </div>
          : <Container>
            <br />

            <Grid2 container spacing={3}>
              {filteredAttractions.map((attraction) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={attraction.attractionId}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        transition: 'transform 0.2s ease-in-out'
                      }
                    }}
                    onClick={() => navigate(`/attractions/${attraction.attractionId}`, { state: { attraction } })}
                  >
                    <CardMedia
                      component="img"
                      sx={{ height: 300, objectFit: 'cover' }}
                      image={attraction.imageUrl}
                      alt={attraction.attractionName}
                    />
                    <CardContent>
                      <Typography variant="h6">
                        {attraction.attractionName}
                      </Typography>
                      <Typography sx={{
                        height: '100px',
                        overflowY: 'auto',
                        marginBottom: 1
                      }} variant="body2">
                        {attraction.description}
                      </Typography>
                      <div>
                        {
                          attraction.attractionTags.map((tag, idx) => (
                            <Chip sx={{ marginTop: 1, marginRight: 1, fontSize: '0.5rem' }} label={tag} key={idx} size="small" />
                          ))
                        }
                      </div>
                      <Box sx={{ display: 'inline-flex', mt: 1 }}>
                        <Typography>({Number(attraction.avgRating).toFixed(1)})</Typography>
                        <Rating name="read-only" precision={0.1} defaultValue={0} value={attraction.avgRating} readOnly />
                        <Typography sx={{ ml: 1 }}>
                          {attraction.totalReviews} reviews
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                    {user && (
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between'}}>
                            <Button variant="outlined"
                                    size="small"  
                                    color="primary"
                                    sx={{fontSize: '0.7rem', ml: 1}} 
                                    startIcon={attraction.attractionInWishlist ? <Favorite /> : <FavoriteBorder />}
                                    onClick={(event) => attraction.attractionInWishlist ? handleRemoveFromWishlist(event, attraction) : handleAddToWishlist(event, attraction)}>
                                {attraction.attractionInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
                            </Button>

                            <Button variant="outlined"
                                size="small"
                                color="primary"
                                sx={{fontSize: '0.7rem', ml: 2}}
                                onClick={(event) => openMenu(event, attraction)}>
                                Save to Package
                            </Button>
                          </Box>
                      )}
                    </CardActions>
                  </Card>
                </Grid2>
              ))}
            </Grid2>
          </Container>
      }
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={handleCreateNewPackage}>Create New Package</MenuItem>
        <Divider />
        {
          travelPackages.map((travelPackage, idx) => (
            <MenuItem key={idx} onClick={() => handleAddToPackage(event, travelPackage)}>{travelPackage.packageName}</MenuItem>
          ))
        }
      </Menu>
    </div>
  );
};

export default CityPage;