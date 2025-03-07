import { React, useState } from 'react'
import { useNavigate } from "react-router";
import { Box, Button, TextField, Card, CardContent, Typography, Grid2 } from '@mui/material';
import { Link } from 'react-router';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const response = await fetch(`http://localhost:8080/passwordresetservices/forgotpassword?email=${email}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email
        }),
    });
    const result = await response.text();
    console.log(result);
        if (response.status === 400) {
            setError("Email not found");
            alert(error)
            setEmail("");
          } else {
            alert("Reset link sent. Please check your email for futher instructions.");
    }
}
return (
    <div>


      <Card style={{ maxWidth: 450, margin: "0 auto", padding: "0px 5px" }} sx={{bgcolor:'#F2E8DC'}}>
        <CardContent>
          <Typography variant='h4' gutterBottom sx={{color:'#223843'}}>Forgot your password?</Typography>
          <form onSubmit={handleSubmit}>
            <Grid2 container spacing={1}>

                <TextField
                  fullWidth
                  required
                  id="outlined-required"
                  label="Email"
                  value={email}
                  style={{ background: "white", borderStyle: "solid" }}
                  onChange={(e) => setEmail(e.target.value)}
                />

              <Grid2 size={{ xs: 12 }} item='true'>
                <Button type="submit" variant="contained">Send Reset Link</Button>
              </Grid2>
              

            </Grid2>
          </form>
        </CardContent>
      </Card>
    </div>
)
}
export default ForgotPassword;
