import Button from "@mui/material/Button";
import {
  Card,
  CardActions,
  CardContent,
  FormControl,
  Stack,
  TextField,
  Typography
} from "@mui/material";

import SaveIcon from "@mui/icons-material/Save";
import { useState } from "react";

export default function EditUserInfo({ user, refreshUser, setAlert }) {

  const[profile, setProfile] = useState({
    id : user.id,
    firstName : user.firstName,
    lastName : user.lastName,
    email : user.email
  });

  const handleChange = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value
    });
  };

  function handleSubmit(event) {
    event.preventDefault();
    updateProfile();
  }

  const updateProfile = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/userprofileservices/" + user.id,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(profile)
        }
      );
      const result = await response.json();
      setProfile(result);

      if (response.status == 200) {
        setAlert({
          ...alert,
          error: false,
          message: "Profile update successful!"
        });
        refreshUser();
      } else {
        setAlert({
          ...alert,
          error: true,
          message: "Server error failed to update profile. Try again later"
        });
      }
    } catch (error) {
      console.error("Update failed :", error);
      setAlert({
        ...alert,
        error: true,
        message: "Update failed"
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <Card sx={{ minWidth: 250, mt: 5, bgcolor:'#F2E8DC' }}>
            <CardContent>
              <Typography
                sx={{
                  mt: 2,
                  whiteSpace: "nowrap",
                  justifyContent: "center",
                  display: "flex",
                  color:'#223843'
                }}
                variant="h5"
                gutterBottom
              >
                My Information
              </Typography>
              <Stack>
                <TextField
                  required
                  name="firstName"
                  value={profile.firstName}
                  label="First Name"
                  onChange={handleChange}
                  id="outlined-basic"
                  variant="outlined"
                  style={{ background: "white", borderStyle: "solid" }}
                  sx={{ mt: 2 }}
                  slotProps={{
                    htmlInput: {
                      maxLength: 25,
                      size: 30
                    }
                  }}
                />
                <TextField
                  required
                  name="lastName"
                  value={profile.lastName}
                  label="Last Name"
                  onChange={handleChange}
                  id="outlined-basic"
                  variant="outlined"
                  style={{ background: "white", borderStyle: "solid" }}
                  sx={{ mt: 2 }}
                  slotProps={{
                    htmlInput: {
                      maxLength: 25,
                      size: 30
                    }
                  }}
                />
                <TextField
                  type="email"
                  required
                  name="email"
                  value={profile.email}
                  label="Email"
                  onChange={handleChange}
                  id="outlined-basic"
                  variant="outlined"
                  style={{ background: "white", borderStyle: "solid" }}
                  sx={{ mt: 2 }}
                  slotProps={{
                    htmlInput: {
                      maxLength: 50,
                      size: 50
                    }
                  }}
                />
              </Stack>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 2
              }}
            >
              <Button
                variant="contained"
                size="medium"
                type="submit"
                startIcon={<SaveIcon />}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </FormControl>
      </form>
    </>
  );
}
