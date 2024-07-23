import React from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import MuiFormControl from "@mui/material/FormControl";
import MuiSelect from "@mui/material/Select";

const FilterWrapper = styled(Box)(({ theme }) => ({
    paddingBottom: "2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const HeaderWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const DropWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const FormControl = styled(MuiFormControl)(({ theme }) => ({
    "& .MuiPaper-root.MuiMenu-paper.MuiPaper-root.MuiPopover-paper": {
        marginTop: "20px",
    },
}));

const Select = styled(MuiSelect)(({ theme }) => ({
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
}));

function Filter({ handleSort, handleOrder, title, state, sortData, orderData }) {
    return (
        <FilterWrapper>
            <HeaderWrapper>
                <Typography sx={{ fontSize: "22px" }}>{title}</Typography>
            </HeaderWrapper>

            <DropWrapper>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                    <FormControl sx={{ ml: 1, minWidth: 120 }}>
                        <Select
                            onChange={handleSort}
                            displayEmpty
                            defaultValue={state.sort_by}
                            renderValue={(selected) => {
                                if (selected === "created_ts") {
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

export default Filter;
