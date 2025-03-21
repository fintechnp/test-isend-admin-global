import PropTypes from "prop-types";
import MuiSelect from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import MuiFormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

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
    width: "70%",
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
}));

const paymentTypeData = [
    { key: "None", value: "" },
    { key: "Bank Transfer", value: "B" },
    { key: "Cash Payment", value: "C" },
    { key: "Wallet", value: "W" },
];

const orderData = [
    { key: "Ascending", value: "ASC" },
    { key: "Descending", value: "DESC" },
];

function FundingSourceFilter({ state, onSearch, onCountryChange, onChangeOrder }) {
    const country = JSON.parse(localStorage.getItem("country"));

    return (
        <FilterWrapper>
            <SearchBox>
                <TextField
                    type="search"
                    variant="outlined"
                    placeholder="Search"
                    onChange={onSearch}
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
                    <FormControl sx={{ ml: 1, minWidth: 120 }}>
                        <Select native onChange={onCountryChange} displayEmpty defaultValue="">
                            <option value="">All Country</option>
                            {country &&
                                country.map((sort) => (
                                    <option value={sort.iso3} key={sort.iso3}>
                                        {sort.country}
                                    </option>
                                ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ ml: 1, minWidth: 120 }}>
                        <Select
                            onChange={onChangeOrder}
                            displayEmpty
                            defaultValue={state.order_by}
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

export default React.memo(FundingSourceFilter);

FundingSourceFilter.propTypes = {
    state: PropTypes.object,
    onSearch: PropTypes.func,
    onCountryChange: PropTypes.func,
    onChangeOrder: PropTypes.func,
};
