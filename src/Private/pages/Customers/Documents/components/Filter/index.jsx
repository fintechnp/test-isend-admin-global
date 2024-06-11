import React from "react";
import Box from "@mui/material/Box";
import MuiSelect from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";

import Row from "App/components/Row/Row";

import { KycDocumentStatusOptions } from "../../data/KycDocumentStatus";
import useId from "@mui/material/utils/useId";

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
    "& .MuiPaper-root.MuiMenu-paper.MuiPaper-root.MuiPopover-paper": {
        maxHeight: "400px !important",
        maxWidth: "320px",
        background: "red",
    },
}));

const sortData = [
    { key: "None", value: "" },
    { key: "Type", value: "type" },
    { key: "Name", value: "name" },
    { key: "Created By", value: "created_by" },
];

const orderData = [
    { key: "Ascending", value: "ASC" },
    { key: "Descending", value: "DESC" },
];

function Filter({ handleSearch, handleSort, onStatusChange, handleOrder, state }) {
    const statusId = useId();

    return (
        <Row mt={1}>
            <Box>
                <TextField
                    size="small"
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
                />
            </Box>

            <Row flex={1} justifyContent="flex-end">
                <FormControl sx={{ ml: 1, minWidth: 120 }}>
                    <InputLabel id={statusId}>Status</InputLabel>
                    <Select
                        labelId={statusId}
                        onChange={onStatusChange}
                        displayEmpty
                        label="Status"
                        defaultValue={state.status}
                        renderValue={(selected) => {
                            if (selected.length === 0) {
                                return (
                                    <Typography component="p" sx={{ opacity: 0.6 }}>
                                        Status
                                    </Typography>
                                );
                            }
                            const option = KycDocumentStatusOptions.find((option) => option.value === selected);
                            return option?.label;
                        }}
                    >
                        {KycDocumentStatusOptions.map((option) => (
                            <MenuItem value={option.value} key={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl sx={{ ml: 1, minWidth: 120 }}>
                    <Select
                        onChange={handleSort}
                        displayEmpty
                        defaultValue={state.sort_by}
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
            </Row>
        </Row>
    );
}

export default Filter;
