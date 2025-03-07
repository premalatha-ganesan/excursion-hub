import React, { useState, useEffect } from 'react'
import { Typography, Card, CardContent, Grid2, TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, OutlinedInput, Chip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DateRangePicker from './DateRange';
import dayjs from 'dayjs';

export default function Contact({ user }) {
  const [result, setResult] = useState("");
  const [reason, setReason] = useState('');
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [travelPackages, setTravelPackages] = useState([]);
  const [packageDates, setPackageDates] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    const packageData = selectedPackages.map(travelPackage => {
      return {
        packageId: travelPackage.packageId,
        packageName: travelPackage.packageName
      };
    });

    formData.append("packages", JSON.stringify(packageData));
    formData.append("package-dates", JSON.stringify(packageDates));

    formData.append("access_key", "23d2c47d-001d-4e4b-8b04-226cc86c28f3");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      setReason('');
      setSelectedPackages([]);
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

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


  const handleReason = (event) => {
    setReason(event.target.value);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const selectedNames = typeof value === 'string' ? value.split(', ') : value;
    const selectedPackageObjects = travelPackages.filter(travelPackage => selectedNames.includes(travelPackage.packageName));
    setSelectedPackages(selectedPackageObjects);
  };

  const handleDateChange = (packageName, { startDate, endDate }) => {
    startDate = dayjs(startDate).format("MM/DD/YYYY");
    endDate = dayjs(endDate).format("MM/DD/YYYY");
    setPackageDates((prev) => ({
        ...prev,
        [packageName]: { startDate, endDate },
    }));
  };

  return (
    <Card style={{ maxWidth: 450, margin: "0 auto", padding: "0px 0px", bgcolor:'#F2E8DC' }}>
      <CardContent sx={{bgcolor:'#F2E8DC'}}>
        <Typography variant='h4' gutterBottom color='#223843'>Contact Us</Typography>
        <form onSubmit={onSubmit}>
          <Grid2 container spacing={1}>
            <Grid2 size={{ xs: 12, sm: 6 }} item='true'>
              <TextField name='first-name' label="First Name" type="text" placeholder='Enter your name' defaultValue={user?.firstName || ''} fullWidth required style={{ background: "white", borderStyle: "solid" }}/>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }} item='true'>
              <TextField name='last-name' label="Last Name" type="text" placeholder='Enter your name' defaultValue={user?.lastName || ''} fullWidth required style={{ background: "white", borderStyle: "solid" }}/>
            </Grid2>
            <Grid2 size={{ xs: 12 }} item='true'>
              <TextField name='user-email' label="Email" type="email" placeholder='Enter your email' defaultValue={user?.email || ''} required fullWidth style={{ background: "white", borderStyle: "solid" }}/>
            </Grid2>

            <FormControl fullWidth>
              <InputLabel id="reasonForContact">Reason for contact</InputLabel>
              <Select
                name='contact-reason'
                labelId="reasonForContact"
                id="reasonForContact"
                value={reason}
                label="Reason for contact"
                onChange={handleReason}
                style={{ textAlign: 'left', backgroundColor:"white" }}
              >
                <MenuItem value={'Purchase Package'}>Purchase a package</MenuItem>
                <MenuItem value={'Bug Report'}>Report a bug</MenuItem>
                <MenuItem value={'Other'}>Other</MenuItem>
              </Select>
            </FormControl>

            {reason === "Purchase Package" ? (
              <FormControl fullWidth>
                {user && travelPackages.length > 0 ? (
                  <>
                    <InputLabel id="packages">Packages</InputLabel>
                    <Select
                      // name='selected-packages' /*Packages are now appended*/
                      labelId="packageSelection"
                      id="packageSelection"
                      multiple
                      value={selectedPackages.map(travelPackage => travelPackage.packageName)}
                      onChange={handleChange}
                      style={{ background: "white" }}
                      input={<OutlinedInput id="packagesSelect" label="Packages" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                    >
                      {travelPackages.map((travelPackage) => (
                        <MenuItem
                          key={travelPackage.packageId}
                          value={travelPackage.packageName}
                        >
                          {travelPackage.packageName}
                        </MenuItem>
                      ))}
                    </Select>
                    {selectedPackages.map((travelPackage) => (
                      <Box sx={{ my: 2 }} key={travelPackage.packageId}>
                          <Typography sx={{whiteSpace: 'pre-line'}} display={'inline'} variant='body2'>
                            { packageDates[travelPackage.packageName] ? (
                              `${travelPackage.packageName}:`
                            ) : ( 
                              `Select Date Range for ${travelPackage.packageName}`
                               )}
                          </Typography>
                          <DateRangePicker onChange={(dates) => handleDateChange(travelPackage.packageName, dates)} />
                      </Box>
                    ))}
                    <Typography sx={{ my: 1}} variant='body2' color='textSecondary'>Please include any plans, preferences, or instructions you have for us in your message.</Typography>
                  </>
                ) : user ? (
                  <Typography variant='body2' color='textSecondary'>You need to save a package to purchase one.</Typography>
                ) : (
                  <Typography variant='body2' color='textSecondary'>You must be logged in to purchase packages.</Typography>
                )}
              </FormControl>
            ) : ""}
            {reason === "Other" ?
              <Grid2 paddingTop={5} size={{ xs: 12 }} item='true'>
                <TextField name='subject' label="Subject" type="text" placeholder='Reason for message' required fullWidth style={{ background: "white", borderStyle: "solid" }}/>
              </Grid2>
              : ""}
            <Grid2 size={{ xs: 18 }} item='true'>
              <TextField name='message' label="Message" multiline rows={12} placeholder='Enter your message' fullWidth required style={{ background: "white", borderStyle: "solid" }}/>
            </Grid2>
            <Button startIcon={<SendIcon />} style={{ marginBottom: 10 }} type='submit' variant='contained' color='primary' fullWidth >Submit Form</Button>
          </Grid2>
        </form>
        <span>{result}</span>
      </CardContent>
    </Card>
  )
}