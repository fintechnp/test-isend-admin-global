import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import MuiSelect from "@mui/material/Select";

import React from "react";
import SearchTextField from "App/components/Fields/SearchTextField";
// import FilterTransactions from "../Dropdown";

const FilterWrapper = styled(Box)(({ theme }) => ({
    paddingTop: "8px",
    paddingBottom: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        gap: "8px",
        width: "100%",
    },
}));

const SearchBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexGrow: 1,
    width: "100%",
}));

const TextField = styled(MuiTextField)(({ theme }) => ({
    borderColor: theme.palette.border.light,
    width: "60%",
    "& .MuiOutlinedInput-input.MuiInputBase-input": {
        padding: "8px 0px",
        paddingRight: "8px",
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
    [theme.breakpoints.down("md")]: {
        width: "60%",
    },
}));

const Select = styled(MuiSelect)(({ theme }) => ({
    // minWidth: "max-content",
    "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
        padding: "8px 10px",
        paddingRight: "28px",
    },
    "& .MuiNativeSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
        padding: "8px 10px",
        paddingRight: "28px",
        maxWidth: "130px",
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
    width: "100%",
}));

const sortData = [
    { key: "None", value: "" },
    { key: "Partner Name", value: "agent_name" },
    { key: "Payout Country", value: "payout_country" },
    { key: "Payment Type", value: "payment_type" },
];

const orderData = [
    { key: "Ascending", value: "ASC" },
    { key: "Descending", value: "DESC" },
];

function Filter({ handleSearch, handleSort, handleOrder }) {
    return (
        <FilterWrapper>
            <SearchBox sx={{ columnGap: 1 }}>
                <SearchTextField
                    onChange={handleSearch}
                    sx={(theme) => ({
                        [theme.breakpoints.down("sm")]: {
                            width: "100%",
                        },
                    })}
                />
                {/* <TextField
                    type="search"
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
                /> */}
            </SearchBox>

            <DropWrapper>
                <Box
                    sx={(theme) => {
                        return {
                            display: "flex",
                            flexDirection: "row",
                            gap: "8px",
                            width: "100%",
                            [theme.breakpoints.down("sm")]: {
                                flexDirection: "column",
                            },
                        };
                    }}
                >
                    <FormControl
                        sx={(theme) => ({
                            ml: 1,
                            minWidth: 120,

                            [theme.breakpoints.down("sm")]: {
                                width: "100%",
                                ml: 0,
                            },
                        })}
                    >
                        <Select
                            onChange={handleSort}
                            displayEmpty
                            defaultValue=""
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return (
                                        <Typography component="p" sx={{ opacity: 0.6 }}>
                                            Sort By
                                        </Typography>
                                    );
                                }
                                const value = sortData.filter((type) => type.value === selected);
                                return value[0]?.key;
                            }}
                        >
                            {sortData.map((sort) => (
                                <MenuItem value={sort.value} key={sort.value}>
                                    {sort.key}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl
                        sx={(theme) => ({
                            ml: 1,
                            minWidth: 120,

                            [theme.breakpoints.down("sm")]: {
                                width: "100%",
                                ml: 0,
                            },
                        })}
                    >
                        <Select
                            onChange={handleOrder}
                            displayEmpty
                            defaultValue="ASC"
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return (
                                        <Typography component="p" sx={{ opacity: 0.6 }}>
                                            Order By
                                        </Typography>
                                    );
                                }
                                const value = orderData.filter((type) => type.value === selected);
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
