import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import { useForm } from "react-hook-form";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import Row from "App/components/Row/Row";
import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";

const sortData = [
    { label: "None", value: "" },
    { label: "Full Name", value: "name" },
    { label: "Email", value: "email" },
    { label: "Phone Number", value: "phoneNumber" },
];

const orderData = [
    { label: "Ascending", value: "ASC" },
    { label: "Descending", value: "DESC" },
];

export default function TableFilter({ onSubmit }) {
    const handleChange = (e) => {
        onSubmit?.({
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Row justifyContent="flex-end" mb={1}>
            <Box display="flex" gap={1}>
                <FormControl size="small" sx={{ minWidth: 130 }}>
                    <InputLabel id="select-sort-by">Sort By</InputLabel>
                    <Select
                        labelId="select-sort-by"
                        label="Sort By"
                        size="small"
                        name="sortBy"
                        sx={{
                            width: "130px",
                        }}
                        fullWidth
                        onChange={handleChange}
                    >
                        {sortData.map((d) => (
                            <MenuItem key={d.value} value={d.value}>
                                {d.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl size="small" sx={{ minWidth: 130 }}>
                    <InputLabel id="select-order-by">Order By</InputLabel>
                    <Select
                        labelId="select-order-by"
                        label="Sort By"
                        size="small"
                        name="orderBy"
                        onChange={handleChange}
                    >
                        {orderData.map((d) => (
                            <MenuItem key={d.value} value={d.value}>
                                {d.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Row>
    );
}

TableFilter.propTypes = {
    onSubmit: PropTypes.func,
};
