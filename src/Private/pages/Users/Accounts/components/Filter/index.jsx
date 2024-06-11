import React from "react";
import MuiSelect from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import MuiTextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import SearchTextField from "App/components/Fields/SearchTextField";
import FilterButton from "App/components/Button/FilterButton";

const FilterWrapper = styled(Box)(({ theme }) => ({
    paddingTop: "8px",
    paddingBottom: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
}));

const SearchBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexGrow: 1,
}));

const Select = styled(MuiSelect)(({ theme }) => ({
    minWidth: "max-content",
    "& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input": {
        padding: "8px 10px",
        paddingRight: "28px",
    },
    "& .MuiSvgIcon-root.MuiSelect-icon": {
        color: theme.palette.border.main,
    },
}));

const DropWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const sortData = [
    { key: "None", value: "" },
    { key: "Name", value: "name" },
    { key: "User Type", value: "user_type" },
    { key: "Created Date", value: "created_ts" },
    { key: "Email", value: "email" },
];

const orderData = [
    { key: "Ascending", value: "ASC" },
    { key: "Descending", value: "DESC" },
];

function Filter({ handleSearch, onClickFilter, isOpenFilterForm, handleSort, handleOrder }) {

    return (
        <FilterWrapper>
            <SearchBox>
                <SearchTextField onChange={handleSearch} />
            </SearchBox>

            <DropWrapper>
                <FilterButton onClick={onClickFilter} isOpen={isOpenFilterForm} />
                <Box>
                    <FormControl sx={{ ml: 1, minWidth: 120 }}>
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
                    <FormControl sx={{ ml: 1, minWidth: 120 }}>
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
