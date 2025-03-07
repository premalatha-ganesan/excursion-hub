import { React, useState } from 'react'
import { useNavigate } from "react-router";
import { Box, Button, TextField, Card, CardContent, Typography, Grid2 } from '@mui/material';
import { Link } from 'react-router';


const registerItem = [{
  id: 0,
  icon: "",
  label: "Register",
  path: "register"
}];

const Login = ({refreshUser}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `http://localhost:8080/userservices/login`,

        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
      }),
    });
      const result = await response.text();
console.log(result);
      if (response.ok) {
        alert(result);
        refreshUser();

        navigate("/");

      } else {
        setError(result);
        alert(result);
        setUsername("");
        setPassword("");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div>


      <Card style={{ maxWidth: 450, margin: "0 auto", padding: "0px 5px" }} sx={{bgcolor:'#F2E8DC'}}>
        <CardContent sx={{bgcolor:'#F2E8DC'}}>
          <Typography variant='h4' gutterBottom style={{color:'#223843'}}>Sign in</Typography>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={1}>

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
                  value={password}
                  style={{ background: "white", borderStyle: "solid" }}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid2>

              <Grid2 size={{ xs: 12 }} item='true'>
                <Button type="submit" variant="contained">Sign in!</Button>
              </Grid2>
              
              <Grid2 size={{ xs: 12 }} item='true'>
                <a id="forgot" href="/forgotpassword" style={{color:'#223843'}}><u>Forgot your password? Click here!</u></a>
              </Grid2>

            </Grid2>
          </form>
        </CardContent>
      </Card>
      <br />
      <span style={{color:'#223843'}}>Don't have an account?</span>

      <div>
        <Box display="flex"
          margin={'auto'}>
          <Box margin={'auto'}>
            {registerItem.map((item) => (
              <Link key={item.id} style={{ textDecoration: "none", color: "white" }} to={`/${item.path}`}>
                <Button variant="contained"
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>
        </Box>
      </div>
    </div>

  )
}

export default Login;