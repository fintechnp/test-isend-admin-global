import dayjs from "dayjs";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import React, { useEffect, useMemo, useRef, useState } from "react";

import Center from "../Center/Center";
import { DateRangePicker as CustomerDateRangePicker } from "../DateRangePicker";

export default function DateRangePicker({ FromDateProps, ToDateProps, onChange, value, ...rest }) {
    const [dateRange, setDateRange] = React.useState({});

    const [open, setOpen] = useState(false);

    const inputContainerRef = useRef();

    const [anchorEl, setAnchorEl] = useState(null);

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
        setDateRange(range);
        onChange?.(range);
    };

    useEffect(() => {
        setDateRange(value);
    }, [value]);

    const handleClose = () => setOpen(false);

    return (
        <Box sx={{ position: "relative" }}>
            <Box ref={inputContainerRef} display="flex" aria-describedby={id} flexDirection="row" gap="8px" {...rest}>
                <TextField
                    sx={{ width: "140px" }}
                    name="fromDate"
                    placeholder="DD/MM/YYY"
                    {...FromDateProps}
                    value={dateRange?.startDate ? dayjs(dateRange.startDate).format("DD/MM/YYYY") : ""}
                    onClick={handleFormDateClick}
                />
                <Center>-</Center>
                <TextField
                    sx={{ width: "140px" }}
                    name="fromDate"
                    placeholder="DD/MM/YYY"
                    {...ToDateProps}
                    value={dateRange?.endDate ? dayjs(dateRange.endDate).format("DD/MM/YYYY") : ""}
                    onClick={handleToDateClick}
                />
            </Box>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <CustomerDateRangePicker
                    open
                    toggle={handleClose}
                    initialDateRange={{
                        startDate: null,
                        endDate: null,
                    }}
                    onChange={handleChange}
                    closeOnClickOutside
                />
            </Popover>
        </Box>
    );
}
