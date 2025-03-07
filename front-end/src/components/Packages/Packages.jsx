import { Add, DeleteOutlined } from "@mui/icons-material";
import { Button, Card, CardContent, IconButton, Paper, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Packages({ user }) {
  const navigate = useNavigate();
  const [travelPackages, setTravelPackages] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleDialogOpen = (pkg) => {
    setOpen(true);
    setSelectedPackage(pkg);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPackage(null);
  };

  const handleDeletePackage = () => {
    if (selectedPackage) {
      deletePackage(selectedPackage.packageId);
    }
    setOpen(false);
  }

  const deletePackage = async (packageId) => {
    try {
      setTravelPackages((prevState) => prevState.filter(item => item.packageId !== packageId));
      const response = await fetch(`http://localhost:8080/packageservices/package/${packageId}?userId=${user.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Failed to delete package item");
      }
    } catch (error) {
      console.log("Failed to delete package : " + error);
      alert("Unable to delete package : " + error);
    } finally {
      fetchTravelPackageList();
    }
  }

  const fetchTravelPackageList = async () => {
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
  };

  useEffect(() => {
    fetchTravelPackageList();
  }, [user]);

  const columns = [
    {
      field: "packageName",
      headerName: "NAME",
      width: 300,
      renderCell: (params) => (
        <span
          style={{ cursor: 'pointer', textDecoration: 'underline', color: "blue" }}
          onClick={() => navigate(`/packages/managePackages/${params.row.packageId}`)}
        >
          {params.value}
        </span>
      ),
    },
    {
      field: "description",
      headerName: "DESCRIPTION",
      width: 900,
    },
    {
      field: "actions",
      headerName: "ACTIONS",
      width: 150,
      renderCell: (params) => (
        <IconButton aria-label="delete" onClick={() => handleDialogOpen(params.row)}>
          <DeleteOutlined style={{ color: 'red' }} />
        </IconButton>
      ),
    }
  ];

  const rows = travelPackages.map((travelPackage) => ({
    id: travelPackage.packageId,
    packageName: travelPackage.packageName,
    description: travelPackage.description,
    packageId: travelPackage.packageId,
  }));

  return (
    <>
      <Card sx={{bgcolor:'#F2E8DC'}}>
        <CardContent>
          <Typography variant="h4" color="#223843">My Packages</Typography>
          <Button
            variant="contained"
            sx={{
              display: "flex",
              justifyContent: "center",
              marginLeft: "auto",
              color:'white'
            }}
            color="primary"
            onClick={() => {
              navigate(`/packages/managePackages`);
            }}
            startIcon={<Add />}
          >
            Create Package
          </Button>
        </CardContent>
      </Card>

      <Paper sx={{ height: 'auto', width: '100%', overflow: 'hidden', bgcolor:'#F2E8DC' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          sx={{color:'#223843', bgcolor:'white'}}
        />
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Confirm Package Deletion"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the package?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeletePackage}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}