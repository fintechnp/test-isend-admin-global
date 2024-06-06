import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Popper from "@mui/material/Popper";
import TextField from "@mui/material/TextField";
import React, { useMemo, useRef, useState } from "react";

import Center from "../Center/Center";
import { DateRangePicker as CustomerDateRangePicker } from "../DateRangePicker";
import Paper from "../Paper/Paper";

export default function DateRangePicker({ FromDateProps, ToDateProps, onChange, ...rest }) {
    const [dateRange, setDateRange] = React.useState({});

    const [open, setOpen] = useState(false);

    const inputContainerRef = useRef();

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {};

    const canBeOpen = open && Boolean(anchorEl);

    const id = canBeOpen ? "transition-popper" : undefined;

    const handleFormDateClick = () => {
        setAnchorEl(inputContainerRef.current);
        setOpen((previousOpen) => !previousOpen);
        FromDateProps?.onClick();
    };

    const handleToDateClick = () => {
        setAnchorEl(inputContainerRef.current);
        setOpen((previousOpen) => !previousOpen);
        ToDateProps?.onClick();
    };

    const handleChange = (range) => {
        setOpen((previousOpen) => !previousOpen);
        console.log(range);
        setDateRange(range);
    };

    const startDate = useMemo(() => {
        return dateRange ? dayjs(dateRange.startDate).format("DD/MM/YYYY") : null;
    }, [dateRange]);

    const endDate = useMemo(() => {
        return dateRange ? dayjs(dateRange.endDate).format("DD/MM/YYYY") : null;
    }, [dateRange]);

    return (
        <Box sx={{ position: "relative" }}>
            <Box ref={inputContainerRef} display="flex" aria-describedby={id} flexDirection="row" gap="8px" {...rest}>
                {/* <DateRangePicker open={open} toggle={toggle} onChange={(range) => setDateRange(range)} /> */}
                <TextField
                    sx={{ width: "140px" }}
                    name="fromDate"
                    placeholder="DD/MM/YYY"
                    {...FromDateProps}
                    value={startDate}
                    onClick={handleFormDateClick}
                />
                <Center>-</Center>
                <TextField
                    sx={{ width: "140px" }}
                    name="fromDate"
                    placeholder="DD/MM/YYY"
                    {...ToDateProps}
                    value={endDate}
                    onClick={handleToDateClick}
                />
            </Box>

            {/* <CustomerDateRangePicker open={open} onChange={handleChange} /> */}

            <Popper id={id} open={open} anchorEl={anchorEl} transition sx={{ position: "relative" }}>
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <CustomerDateRangePicker open={open} onChange={handleChange} />
                        </Paper>
                    </Fade>
                )}
            </Popper>
        </Box>
    );
}
