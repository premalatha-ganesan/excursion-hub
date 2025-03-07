import { DeleteOutlined } from "@mui/icons-material";
import { Box, Card, CardActions, CardContent, CardMedia, Chip, Container, Grid2, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function MyWishList(user) {
  const [wishlistAttr, setWishlistAttr] = useState([{
    id: 0,
    attraction: {
      attractionId: "",
      attractionName: "",
      city: "",
      country: "",
      description: "",
      imageUrl: "",
      attractionTags: [],
      totalReviews:0,
      avgRating:0
    },
    createdDateTime: ""
  }]);

  const fetchUserWishList = async () => {
    try {
      const response = await fetch(`http://localhost:8080/wishlistservices/wishlistAttraction?userId=${user.user.id}`, {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        const result = await response.json();
        setWishlistAttr(result);
      } else {
        console.error("Failed to find the wishlist information.");
        setWishlistAttr();
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
      setWishlistAttr();
    }
  };

  useEffect(() => {
    fetchUserWishList();
  }, []);

  const handleDelete = async (id) => {
    try {
      setWishlistAttr((prevState) => prevState.filter(item => item.id !== id));

      const response = await fetch(`http://localhost:8080/wishlistservices/wishlistAttraction/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete wishlist item");
      }
    } catch (error) {
      console.error("Error deleting wishlist item:", error);
    } finally {
      fetchUserWishList();
    }
  };

  return (
    <Container>
      <Typography variant="h4" color="#223843">My Wishlist</Typography>
      <Grid2 spacing={2} container sx={{ mt: 3 }}>
        {
            wishlistAttr.length == 0 ? 
            ( <Typography variant="h6">Your wishlist is empty. Start adding some attractions!</Typography>) :
            ( wishlistAttr.map((wishList, index) => (
                <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card size={{ xs: 12, sm: 6, md: 4 }} sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <CardMedia
                      component="img"
                      sx={{ height: 300, objectFit: 'cover' }}
                      image={wishList.attraction.imageUrl}
                    />
                    <CardContent>
                      <Typography variant="h6">
                        {wishList.attraction.attractionName}
                      </Typography>
                      <Typography sx={{
                        height: '100px',
                        overflowY: 'auto',
                        marginBottom: 1
                      }} variant="body2">
                        {wishList.attraction.description}
                      </Typography>
                      <div>
                        {
                          wishList.attraction.attractionTags.map((tag, idx) => (
                            <Chip sx={{ marginTop: 1, marginRight: 1, fontSize: '0.5rem' }} label={tag} key={idx} size="small" />
                          ))
                        }
                      </div>
                      <Box sx={{ display: 'inline-flex', mt: 1 }}>
                        <Typography>({wishList.attraction.avgRating})</Typography>
                        <Rating name="read-only" precision={0.1} defaultValue={0} value={wishList.attraction.avgRating} readOnly />
                        <Typography sx={{ml : 1}}>
                          {wishList.attraction.totalReviews } reviews
                        </Typography>
                      </Box>
                    </CardContent>
    
                    <CardActions sx={{ display: 'flex', justifyContent: 'right', pt: 0 }}>
                      <DeleteOutlined
                        name={wishList.id}
                        onClick={() => handleDelete(wishList.id)}
                        sx={{ cursor: 'pointer' }}
                      />
                    </CardActions>
                  </Card>
                </Grid2>
              )))
        }
      </Grid2>
    </Container>
  );
}
