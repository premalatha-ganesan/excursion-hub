import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import { Box, CardActions, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Card, CardContent, Typography } from "@mui/material";
import getInitials from '../Util.js';

export default function EditUserAvatar({user, refreshUser, setAlert }) {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedPic, setSelectedPic] = useState(null);

  const handleDeleteClick = () => {
    setOpen(true);
    setSelectedPic(user.profileUrl);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPic(null);
  };

  const handleDeleteAttraction = () => {
    if (selectedPic) {
      handleDelete();
    }
    setOpen(false);
  }

  const initials = getInitials(user);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const uploadPic = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "http://localhost:8080/userprofileservices/"+user.id+"/picture",
        {
          method: "POST",
          body: formData
        }
      );

      const result = await response.json();
      setImage(result.profileUrl);
      setFile(null);
      setAlert({
        ...alert,
        message: "Avatar update successful!"
      });
      refreshUser();
    }
  };

  const handleEditClick = () => {
    document.getElementById("file-input").click();
  };


  const handleDelete = async() => {

    try{
      await fetch(`http://localhost:8080/userprofileservices/${user.id}/picture`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      setImage(null);
      setAlert({
        ...alert,
        message: "Avatar delete successful!"
      });
      refreshUser();
    } catch(error) {
      console.error(error);
    }
  }

  return (
    <>
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
            My Avatar {user.profileUrl}
          </Typography>
        

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              position: "relative"
            }}
          >
            {
              user.profileUrl != null && <IconButton
              size="large"
              aria-label="edit"
              sx={{
                position: "relative",
                top: 70,
                left: 8,
                backgroundColor: "white",
                borderRadius: "50%",
                width: 40,
                height: 40
              }}
              onClick={handleDeleteClick}
            >
              <DeleteIcon fontSize="medium"></DeleteIcon>
            </IconButton>
            }
            
            <Avatar
              sx={{
                width: 112,
                height: 112
              }}
              src={image ? image : user.profileUrl}
            >
              {initials}
            </Avatar>
            
            <IconButton
              size="large"
              aria-label="edit"
              sx={{
                position: "relative",
                top: 70,
                right: 8,
                backgroundColor: "white",
                borderRadius: "50%",
                width: 40,
                height: 40
              }}
              onClick={handleEditClick}
            >
              <EditIcon fontSize="medium"></EditIcon>
            </IconButton>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </Box>
          <CardActions
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Button
              size="medium"
              variant="contained"
              onClick={uploadPic}
              startIcon={<CloudUploadIcon />}
              disabled={!file}
            >
              Upload
            </Button>
          </CardActions>
        </CardContent>
      </Card>
      <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                  >
                    <DialogTitle id="alert-dialog-title">
                      {"Confirm Avatar Deletion"}
                    </DialogTitle>
                    <DialogContent>
                      <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete your avatar?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleDeleteAttraction}>Yes</Button>
                    </DialogActions>
                  </Dialog>
    </>
  );
}
