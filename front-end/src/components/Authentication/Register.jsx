import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Typography, Card, CardContent, Grid2, TextField, Button } from '@mui/material';


const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [pwHash, setPassword] = useState("");
    const [reenterPassword, setReenterPassword] = useState("");
    const [error, setError] = useState("");
    const [passwordMatchMessage, setPasswordMatchMessage] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        if (reenterPassword && pwHash !== reenterPassword) {
            setPasswordMatchMessage("Passwords do not match");
        } else {
            setPasswordMatchMessage("");
        }
    }, [pwHash, reenterPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (pwHash !== reenterPassword) {
            setError("Passwords do not match. Please try again.");
            return;
        }

        const response = await fetch("http://localhost:8080/userservices/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                username,
                pwHash,
            }),
        });

        const result = await response.text();
        if (response.status === 400) {
            setError(result);
            alert(result);
          } else {
            alert(result);
            setUsername("");
            setPassword("");
            setReenterPassword("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPasswordMatchMessage("");
            navigate("/login");
    }
}

    return (
        <>
            <Card style={{ maxWidth: 450, margin: "0 auto", padding: "0px 5px"}} sx={{bgcolor:'#F2E8DC'}}>
                <CardContent sx={{bgcolor:'#F2E8DC'}}>
                    <Typography variant='h4' gutterBottom sx={{color: '#223843'}}>Register</Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid2 container spacing={1}>

                            <Grid2 size={{ xs: 12, sm: 6 }} item='true'>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="First Name"
                                    value={firstName}
                                    style={{ background: "white", borderStyle: "solid" }}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6 }} item='true'>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Last Name"
                                    value={lastName}
                                    style={{ background: "white", borderStyle: "solid" }}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6 }} item='true'>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Email"
                                    type="email"
                                    value={email}
                                    style={{ background: "white", borderStyle: "solid" }}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Grid2>

                            <Grid2 size={{ xs: 12, sm: 6 }} item='true'>
                                <TextField
                                    required
                                    id="outlined-required"
                                    label="Username"
                                    value={username}
                                    style={{ background: "white", borderStyle: "solid" }}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Grid2>

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

                                <Button type="submit" variant="contained">Register!</Button>
                            </Grid2>
                        </Grid2>
                    </form>
                </CardContent>
            </Card>
        </>
    )
}

export default Register;