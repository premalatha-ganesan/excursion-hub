import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

const DateRangePicker = ({ onChange }) => {
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        if (onChange) {
          onChange({ startDate, endDate });
        }
      };

    return (
        <div>
            <Button variant="contained" color='primary' onClick={handleOpen} sx={{ mt: 1}}  >
                {startDate && endDate
                    ? `Departure: ${dayjs(startDate).format("MM/DD/YYYY")} - Return: ${dayjs(endDate).format("MM/DD/YYYY")}`
                    : "Select Date Range"
                }
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent sx={{bgcolor:'#F2E8DC'}}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Departure"
                            value={startDate}
                            onChange={(date) => setStartDate(date)}
                            disablePast
                            sx={{ mb: 1,  bgcolor:"white" }}
                        />
                        <DatePicker
                            label="Return"
                            value={endDate}
                            onChange={(date) => setEndDate(date)}
                            disablePast
                            minDate={startDate}
                            sx={{ bgcolor:"white"}}
                        />
                    </LocalizationProvider>
                </DialogContent>
                <DialogActions sx={{bgcolor:"#F2E8DC"}}>
                    <Button  variant="contained" onClick={handleClose} color="primary">Continue</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DateRangePicker;
