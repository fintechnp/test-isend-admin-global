import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";

const orderData = [
    { key: "Ascending", value: "ASC" },
    { key: "Descending", value: "DESC" },
];

export default function TableGridQuickFilter({
    onSortByChange,
    onOrderByChange,
    sortByData = [],
    sortByFieldName = "sort_by",
    orderByFieldName = "order_by",
    values,
    disabled,
}) {
    return (
        <Box display="flex" gap="16px">
            <FormControl sx={{ ml: 1, minWidth: 120 }}>
                <Select
                    size="small"
                    onChange={(e) => onSortByChange(sortByFieldName, e.target.value)}
                    name={sortByFieldName}
                    displayEmpty
                    value={values?.[sortByFieldName] ?? ""}
                    renderValue={(selected) => {
                        if (selected === "created_ts") {
                            return (
                                <Typography component="p" sx={{ opacity: 0.6 }}>
                                    Sort By
                                </Typography>
                            );
                        }
                        const value = sortByData.filter((type) => type.value === selected);
                        return value[0]?.key;
                    }}
                    disabled={disabled}
                >
                    {sortByData.map((sort) => (
                        <MenuItem key={sort.value} value={sort.value}>
                            {sort.key}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ ml: 1, minWidth: 120 }}>
                <Select
                    size="small"
                    onChange={(e) => onOrderByChange(orderByFieldName, e.target.value)}
                    name={orderByFieldName}
                    displayEmpty
                    value={values?.[orderByFieldName] ?? ""}
                    renderValue={(selected) => {
                        if (!selected) {
                            return (
                                <Typography component="p" sx={{ opacity: 0.6 }}>
                                    Order By
                                </Typography>
                            );
                        }
                        const value = orderData.filter((type) => type.value === selected);
                        return value[0]?.key;
                    }}
                    disabled={disabled}
                >
                    {orderData.map((order) => (
                        <MenuItem key={order.value} value={order.value}>
                            {order.key}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

TableGridQuickFilter.propTypes = {
    onSortByChange: PropTypes.func.isRequired,
    onOrderByChange: PropTypes.func.isRequired,
    sortByFieldName: PropTypes.string,
    orderByFieldName: PropTypes.string,

    SortBySelectProps: PropTypes.object,
    OrderBySelectProps: PropTypes.object,
    sortByData: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }),
    ).isRequired,
    values: PropTypes.shape({
        sort_by: PropTypes.string.isRequired,
        order_by: PropTypes.string.isRequired,
    }).isRequired,
    disabled: PropTypes.bool,
};
