import { Alert, Grid2 } from "@mui/material";
import EditUserAvatar from "./EditUserAvatar";
import EditUserInfo from "./EditUserInfo";
import { useState } from "react";

const Settings = ({user , refreshUser}) => {

  const [alert, setAlert] = useState({
    error: false,
    message: null
  });

  return (
    <>
      {alert.message && (
        <Alert
          severity={alert.error ? "error" : "success"}
          onClose={() => setAlert({ ...alert, message: null })}
        >
          {alert.message}
        </Alert>
      )}
      <Grid2
        container
        spacing={3}
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <Grid2 xs={12} sm={6} md={4}>
          <EditUserInfo
            user={user}
            refreshUser={refreshUser}         
            setAlert={setAlert}
          />
        </Grid2>

        <Grid2 xs={12} sm={6} md={4}>
          <EditUserAvatar
            user={user}
            refreshUser={refreshUser}  
            setAlert={setAlert}
          />
        </Grid2>
      </Grid2>
    </>
  );
};


export default Settings;
