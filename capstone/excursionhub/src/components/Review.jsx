import React, { useEffect, useState } from 'react'
import { styled } from '@mui/system';
import { Button, Box, TextField, Stack, Rating, Typography } from '@mui/material';
import { useNavigate } from "react-router";

const Review = ({ user, attractionId }) => {
    const [comment, setComment] = useState("")
    const [rating, setRating] = useState(0)
    const [error, setError] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(`http://localhost:8080/locationservices/attractions/${attractionId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:
                JSON.stringify({
                    user,
                    attraction: Number(attractionId),
                    comment,
                    rating: Number(rating)
                }),
        });

        const result = await response.text();
        if (response.status === 400) {
            setError(result);
            console.log(error);
            setComment("");
            setRating(0);

        } else {
            alert(result);
            setComment("");
            setRating(0);
        }
    }

    if (user) {
        return (
            <>
                <Box sx={{ m: 2, border: '1px solid black', padding: 2, borderRadius: 2, bgcolor:'#F2E8DC' }}>
                    <Typography variant='h5' textAlign={'left'}>Leave a review</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Rating
                            style={{ outlineColor: "black" }}
                            defaultValue={0}
                            precision={0.5}
                            size="large"
                            value={rating}
                            onChange={(e, newValue) => setRating(newValue)}
                        />
                    </Box>
                    <br />
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}
                    >
                        <TextField
                            aria-label="minimum height"
                            fullWidth
                            multiline rows={3}
                            placeholder="Leave your review here!"
                            value={comment}
                            style={{ background: "white", borderStyle: "solid" }}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </Box>
                    <br />
                    <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Button onClick={handleSubmit} variant="contained" size="medium">
                            Review
                        </Button>
                    </Box>
                </Box>
            </>
        )
    }
    return (
        <p>Log in to leave your review.</p>
    )
}

export default Review