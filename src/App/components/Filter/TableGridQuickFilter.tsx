import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";

const DEFAULT_SORT_BY_FIELD_NAME = "sort_by";
const DEFAULT_ORDER_BY_FIELD_NAME = "order_by";

function valuesValidator(props, propName, componentName) {
    const sortByFieldName = props.sortByFieldName || DEFAULT_SORT_BY_FIELD_NAME;
    const orderByFieldName = props.orderByFieldName || DEFAULT_ORDER_BY_FIELD_NAME;

    if (typeof props.values !== "object") {
        return new Error(`${componentName} requires 'values' prop to be an object`);
    }

    if (!props.values.hasOwnProperty(sortByFieldName)) {
        return new Error(`${componentName} requires 'values' prop to have a key '${sortByFieldName}'`);
    }

    if (!props.values.hasOwnProperty(orderByFieldName)) {
        return new Error(`${componentName} requires 'values' prop to have a key '${orderByFieldName}'`);
    }

    if (typeof props.values[sortByFieldName] !== "string") {
        return new Error(`${componentName} requires 'values.${sortByFieldName}' to be a string`);
    }

    if (typeof props.values[orderByFieldName] !== "string") {
        return new Error(`${componentName} requires 'values.${orderByFieldName}' to be a string`);
    }

    return null;
}

const orderData = [
    { key: "Ascending", value: "ASC" },
    { key: "Descending", value: "DESC" },
];

export default function TableGridQuickFilter({
    onSortByChange,
    onOrderByChange,
    sortByData = [],
    sortByFieldName = DEFAULT_SORT_BY_FIELD_NAME,
    orderByFieldName = DEFAULT_ORDER_BY_FIELD_NAME,
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
    values: valuesValidator,
    disabled: PropTypes.bool,
};
