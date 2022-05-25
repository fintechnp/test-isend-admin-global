import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import MuiFormControl from "@mui/material/FormControl";
import MuiSelect from "@mui/material/Select";

import React from "react";

const FilterWrapper = styled(Box)(({ theme }) => ({
    paddingTop: "8px",
    paddingBottom: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const SearchBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexGrow: 1,
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
    borderColor: theme.palette.border.light,
    width: "50%",
    "& .MuiOutlinedInput-input.MuiInputBase-input": {
        padding: "8px 0px",
    },
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
        paddingLeft: "10px",
    },
    "&: hover": {
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: theme.palette.border.main,
            borderWidth: "2px",
        },
    },
    "& .MuiSvgIcon-root": {
        fill: theme.palette.border.main,
    },
}));

const FormControl = styled(MuiFormControl)(({ theme }) => ({
    "& .MuiPaper-root.MuiMenu-paper.MuiPaper-root.MuiPopover-paper": {
        maxHeight: "400px",
        maxWidth: "320px",
        background: "red",
    },
}));

const Select = styled(MuiSelect)(({ theme }) => ({
    // minWidth: "max-content",
    "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
        padding: "8px 10px",
        paddingRight: "28px",
    },
    "& .MuiSvgIcon-root.MuiSelect-icon": {
        color: theme.palette.border.main,
    },
    "& .MuiPaper-root.MuiMenu-paper.MuiPaper-root.MuiPopover-paper": {
        maxHeight: "400px !important",
        maxWidth: "320px",
        background: "red",
    },
}));

const DropWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const sortData = [
    { key: "None", value: "" },
    { key: "Country", value: "receiving_country" },
    { key: "Payment Type", value: "payment_type" },
    { key: "Customer Type", value: "customer_type" },
];

const orderData = [
    { key: "Ascending", value: "ASC" },
    { key: "Descending", value: "DESC" },
];

function Filter({ handleSearch, handleOrder, handleSort }) {
    return (
        <FilterWrapper>
            <SearchBox>
                <TextField
                    variant="outlined"
                    placeholder="Search"
                    onChange={handleSearch}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </SearchBox>

            <DropWrapper>
                <Box>
                    {handleSort && (
                        <FormControl sx={{ ml: 1, minWidth: 120 }}>
                            <Select
                                onChange={handleSort}
                                displayEmpty
                                defaultValue=""
                                renderValue={(selected) => {
                                    if (selected.length === 0) {
                                        return (
                                            <Typography
                                                component="p"
                                                sx={{ opacity: 0.6 }}
                                            >
                                                Sort By
                                            </Typography>
                                        );
                                    }
                                    const value = sortData.filter(
                                        (type) => type.value === selected
                                    );
                                    return value[0]?.key;
                                }}
                            >
                                {sortData.map((order) => (
                                    <MenuItem
                                        value={order.value}
                                        key={order.value}
                                    >
                                        {order.key}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    <FormControl sx={{ ml: 1, minWidth: 120 }}>
                        <Select
                            onChange={handleOrder}
                            displayEmpty
                            defaultValue="ASC"
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return (
                                        <Typography
                                            component="p"
                                            sx={{ opacity: 0.6 }}
                                        >
                                            Order By
                                        </Typography>
                                    );
                                }
                                const value = orderData.filter(
                                    (type) => type.value === selected
                                );
                                return value[0]?.key;
                            }}
                        >
                            {orderData.map((order) => (
                                <MenuItem value={order.value} key={order.value}>
                                    {order.key}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DropWrapper>
        </FilterWrapper>
    );
}

export default Filter;
