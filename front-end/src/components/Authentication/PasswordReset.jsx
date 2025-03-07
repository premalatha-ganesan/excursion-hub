import { React, useState, useEffect } from 'react'
import { useNavigate } from "react-router";
import { Box, Button, TextField, Card, CardContent, Typography, Grid2 } from '@mui/material';

const PasswordReset = () => {

    const navigate = useNavigate();

    const [pwHash, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordMatchMessage, setPasswordMatchMessage] = useState("");

    useEffect(() => {
        if (reenterPassword && pwHash !== reenterPassword) {
            setPasswordMatchMessage("Passwords do not match");
        } else {
            setPasswordMatchMessage("");
        }
    }, [pwHash, reenterPassword]);


    let params = new URLSearchParams(document.location.search);
    let token = params.get("token");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(
                `http://localhost:8080/passwordresetservices/resetpassword?token=${token}&newPassword=${pwHash}`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            const result = await response.text();

            if (response.ok) {
                alert(result);
                navigate("/login");

            } else {
                setError(result);
                console.log(result )
                setPassword("");
            }
        } catch (error) {
            setError("An unexpected error occurred. Please try again.");
        }
    };

    return (
        <>
            <Card style={{ maxWidth: 450, margin: "0 auto", padding: "0px 5px" }} sx={{bgcolor:'#F2E8DC'}}>
                <CardContent>
                    <Typography variant='h4' gutterBottom sx={{color:'#223843'}}>Reset your Password</Typography>
                    <form onSubmit={handleSubmit}>  
                        {/*  */}
                        <Grid2 container spacing={1}>

                            <Grid2 size={{ xs: 12, sm: 6 }} item='true'>
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={pwHash}
                                    style={{ background: "white", borderStyle: "solid" }}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6 }} item='true'>
                                <TextField
                                    required
                                    id="outlined-password-input"
                                    label="Re-Enter Password"
                                    type="password"
                                    autoComplete="current-password"
                                    value={reenterPassword}
                                    style={{ background: "white", borderStyle: "solid" }}
                                    onChange={(e) => setReenterPassword(e.target.value)}
                                />
                            </Grid2>
                            <Grid2 size={{ xs: 12 }} item='true'>
                                <p>{passwordMatchMessage}</p>
                            </Grid2>

                            <Grid2 size={{ xs: 12 }} item='true'>

                                <Button type="submit" variant="contained">Reset</Button>
                            </Grid2>
                        </Grid2>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}
export default PasswordReset;