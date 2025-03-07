import { Alert, Avatar, Box, Card, CardActions, CardContent, FormControl, Grid2, IconButton, List, ListItem, ListItemAvatar, ListItemText, Snackbar, Tab, Tabs, TextField, Typography } from "@mui/material"
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import Button from '@mui/material/Button';
import { Delete } from "@mui/icons-material";
import AttractionSelector from "./AttractionSelector";
import WishlistSelector from "./WishListSelector";
import { useLocation } from "react-router-dom";

export default function PackageDetails({ user }) {
    const navigate = useNavigate();
    const { packageId } = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const attractionId = searchParams.get("attractionId");

    const [duplicateAttraction, setDuplicateAttraction] = useState(false);
    const [travelPackage, setTravelPackage] = useState({
        packageId: null,
        packageName: "",
        description: "",
        attractionIds: []
    });
    const [availableAttractions, setAvailableAttractions] = useState([]);
    const [selectedAttractions, setSelectedAttractions] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [country, setCountry] = useState([]);


    const [tabIndex, setTabIndex] = useState(0);
    const handleTabChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const fetchAttractionById = async () => {
        try {
            if (attractionId) {
                const response = await fetch(`http://localhost:8080/locationservices/attractions/${attractionId}`, {
                    method: "GET",
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error("failed to fetch attraction");
                }
                const result = await response.json();
                setSelectedAttractions([result]);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchAttractionById();
    }, []);

    const fetchPackage = async () => {
        try {
            if (packageId) {
                const response = await fetch(`http://localhost:8080/packageservices/package/${packageId}?userId=${user.id}`, {
                    method: "GET",
                    credentials: "include"
                });

                if (!response.ok) {
                    throw new Error("failed to fetch package");
                }

                const result = await response.json();
                const travelPackageForEdit = {
                    packageId: result.packageId,
                    packageName: result.packageName,
                    description: result.description,
                    attractionIds: result.attractionDTOs.map(a => a.attractionId)
                }
                setSelectedAttractions(result.attractionDTOs);
                setTravelPackage(travelPackageForEdit);
            }
        } catch (error) {
            alert("Failed to fetch package by id : " + error);
        }
    }

    useEffect(() => {
        fetchPackage();
    }, [packageId]);

    function handleDelete(attr) {
        setSelectedAttractions(prev => prev.filter(attraction => attraction.attractionId != attr.attractionId));

        setTravelPackage(prev => {
            const updatedAttractionIds = prev.attractionIds.filter(id => id !== attr.attractionId);
            return { ...prev, attractionIds: updatedAttractionIds };
        });
    }

    function handleAdd(selectedAttr) {
        if (!selectedAttractions.some(attr => attr.attractionId === selectedAttr.attractionId)) {
            const newSelected = [...selectedAttractions, selectedAttr];
            setSelectedAttractions(newSelected);
            setTravelPackage(prev => {
                if (!prev.attractionIds.includes(selectedAttr.attractionId)) {
                    const updatedAttractionIds = [...prev.attractionIds, selectedAttr.attractionId];
                    return { ...prev, attractionIds: updatedAttractionIds };
                }
                return prev;
            });
        } else {
            setDuplicateAttraction(true);
        }
    }

    const createOrEditPackage = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/packageservices/package?userId=${user.id}`,
                {
                    method: packageId ? "PUT" : "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(travelPackage)
                }
            );
            if (!response.ok) {
                throw new Error("Unable to create package")
            } else {
                navigate("/packages");
            }
        } catch (error) {
            setTravelPackage({});
            alert("Failed to edit packge : " + error);
        }
    };

    const fetchWishlist = async () => {
        try {
            const response = await fetch(`http://localhost:8080/wishlistservices/wishlistAttraction?userId=${user.id}`,
                {
                    method: "GET",
                    credentials: "include"
                }
            );
            if (response.ok) {
                const result = await response.json();
                setWishlist(result);
            } else {
                console.error("Failed to find the wishlist information.");
                setWishlist();
            };
        } catch (error) {
            alert("Failed to load wishlist : " + error);
        }
    }

    useEffect(() => {
        fetchWishlist();
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        createOrEditPackage();
    };

    function AttractionTabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
            </div>
        );
    }

    const fetchCountry = async () => {
        try {
            const response = await fetch("http://localhost:8080/locationservices/locations/all",
                {
                    method: "GET",
                    credentials: "include",

                });
            if (response.ok) {
                const result = await response.json();
                setCountry(result);
            } else {
                console.error("Failed to find the country information.");
            };
        } catch (error) {
            console.log(error)
        };
    }

    useEffect(() => {
        fetchCountry()
    }, []);

    return (
        <Grid2 container spacing={2} sx={{ height: "auto", width: "100%" }}>
            <Snackbar
                open={duplicateAttraction}
                autoHideDuration={2000}
                onClose={() => setDuplicateAttraction(false)}
                message="Duplicate Attraction.">
                <Alert
                    onClose={() => setDuplicateAttraction(false)}
                    severity="error"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    Attraction already in selected list!
                </Alert>
            </Snackbar>
            <Grid2 size={{xs: 12, md: 6}} sx={{ width: "100%" }}>
                <form onSubmit={onSubmit}>
                    <Card sx={{ height: "100%", bgcolor:'#F2E8DC' }} >
                        <CardContent sx={{ height: "100%" }}>
                            <Typography variant="h6" color="#223843">
                                Package Details
                            </Typography>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <TextField
                                    required
                                    id="package-name"
                                    label="Package Name"
                                    variant="outlined"
                                    style={{ background: "white", borderStyle: "solid" }}                                    value={travelPackage.packageName}
                                    onChange={(e) => setTravelPackage({ ...travelPackage, packageName: e.target.value })}
                                />
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <TextField
                                    required
                                    id="package-description"
                                    label="Package Description"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                    style={{ background: "white", borderStyle: "solid" }}
                                    value={travelPackage.description}
                                    onChange={(e) => setTravelPackage({ ...travelPackage, description: e.target.value })}
                                />
                            </FormControl>
                            <Typography sx={{ mt: 3, mb: 1 }} color="#223843" variant="h6">
                                Selected Attractions
                            </Typography>
                            <Box>
                                {
                                    (
                                        selectedAttractions.length == 0 ?
                                            <Typography>Select a few attractions to be added to the package</Typography> : <></>
                                    )
                                }

                                <List sx={{ width: '100%', maxHeight: 300, overflowY: 'auto', bgcolor: 'background.paper' }}>
                                    {
                                        selectedAttractions.map((attraction, idx) => (
                                            <ListItem key={idx}>
                                                <ListItemAvatar>
                                                    <Avatar src={attraction.imageUrl || "/icon.png"} />
                                                </ListItemAvatar>
                                                <ListItemText primary={attraction.attractionName} />
                                                <IconButton onClick={() => handleDelete(attraction)}>
                                                    <Delete />
                                                </IconButton>
                                            </ListItem>
                                        ))
                                    }
                                </List>
                            </Box>

                        </CardContent>
                        <CardActions sx={{ display: "flex", justifyContent: "center" }}>
                            {(
                                packageId ?
                                    <Button type='submit' variant="contained">Update Package</Button>
                                    :
                                    <Button type='submit' variant="contained">Create Package</Button>
                            )}
                            <Button variant="contained" onClick={() => navigate(-1)}>Cancel</Button>

                        </CardActions>
                    </Card>
                </form>
            </Grid2>
            <Grid2 size={{xs: 12, md: 6}} sx={{ width: "100%" }}>
                <Card sx={{ width: '100%', bgcolor:'#F2E8DC' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Typography sx={{ mt: 2, mb: 1 }} variant="h6" color="#223843">Choose Attractions</Typography>
                        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
                            <Tab label={<span style={{color: '#223843'}}>Wishlist Attractions</span>}/>
                            <Tab label={<span style={{color: '#223843'}}>All Attractions</span>}/>
                        </Tabs>
                    </Box>
                    <AttractionTabPanel value={tabIndex} index={0}>
                        <WishlistSelector user={user} handleAdd={handleAdd} wishlist={wishlist} />
                    </AttractionTabPanel>
                    <AttractionTabPanel value={tabIndex} index={1}>
                        <AttractionSelector
                            handleAdd={handleAdd}
                            availableAttractions={availableAttractions}
                            setAvailableAttractions={setAvailableAttractions}
                            country={country}
                            setCountry={setCountry}
                        />
                    </AttractionTabPanel>
                </Card>
            </Grid2>
        </Grid2>
    );

}