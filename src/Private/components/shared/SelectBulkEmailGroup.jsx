import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import app from "App/config/app";
import Api from "App/services/api";
import isEmpty from "App/helpers/isEmpty";
import debounce from "App/helpers/debounce";
import buildRoute from "App/helpers/buildRoute";
import apiEndpoints from "Private/config/apiEndpoints";

const http = new Api();

export default function SelectBulkEmailGroup(props) {
    const {
        id,
        name,
        label,
        error,
        helperText,
        required,
        size,
        disabled,
        fullWidth,
        variant,
        value,
        onSelected,
        ...rest
    } = props;

    const [selectedValue, setSelectedValue] = useState({ label: "---SELECT---", value: "" });
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [params, setParams] = useState({
        page_size: 20,
        page_number: 1,
        sort_by: "group_name",
        order_by: "ASC",
    });

    const handleSearchChange = (e) => {
        debounce(() => {
            setParams({
                ...params,
                search: e.target.value,
            });
        }, 500);
    };

    /**
     * fetch bulkEmailGroups
     */
    const fetchBulkEmailGroups = async () => {
        setIsLoading(true);
        try {
            let endpoint = `${app.apiBaseUrl + "/" + apiEndpoints.bulkEmailGroup.list}?${new URLSearchParams(params)}`;
            let response = await http.get(endpoint);
            let data = response.data;
            if (data) {
                data = data.map((p) => ({ label: p.group_name, value: p.group_id }));
                // let index = options.findIndex((o) => o.value === selectedValue?.value);
                // if (index === -1) data.unshift(selectedValue);
                setOptions(data);
            }
        } catch (err) {
            console.error(err);
        }
        setIsLoading(false);
    };

    /**
     * handle on autocomplete change
     */
    const handleChange = (e, value) => {
        e.preventDefault();
        setSelectedValue(value);
        if (typeof onSelected === "function") onSelected(value?.value || undefined);
    };

    /**
     * fetch bulkEmailGroup
     */
    const fetchBulkEmailGroup = async (bulkEmailGroupId) => {
        try {
            let endpoint = buildRoute(apiEndpoints.bulkEmailGroup.get, bulkEmailGroupId);
            let response = await http.get(endpoint);
            let bulkEmailGroup = response?.data;
            if (bulkEmailGroup) {
                let index = options.findIndex((o) => o?.value === bulkEmailGroup.group_id);
                if (index === -1)
                    setOptions([...options, { label: bulkEmailGroup.group_name, value: bulkEmailGroup.group_id }]);
                setSelectedValue({ label: bulkEmailGroup.group_name, value: bulkEmailGroup.group_id });
            }
        } catch (err) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (params?.search?.length > 1) fetchBulkEmailGroups();
    }, [JSON.stringify(params)]);

    useEffect(() => {
        if (isEmpty(value)) fetchBulkEmailGroups();
    }, []);

    // useEffect(() => {
    //   if (!open) setOptions([]);
    // }, [open]);

    useEffect(() => {
        if (value) {
            fetchBulkEmailGroup(value);
        }
    }, []);

    return (
        <Autocomplete
            id={id}
            value={selectedValue}
            // {...(value ? { value: selectedValue } : {})}
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            onChange={handleChange}
            options={options}
            loading={isLoading}
            autoHighlight
            getOptionLabel={(option) => option?.label ?? ""}
            isOptionEqualToValue={(option, value) => option?.value === value?.value}
            renderOption={(props, option) => (
                <Box
                    component="li"
                    sx={{ "& > img": { px: 2, py: 4, flexShrink: 0, border: "1px solid red" } }}
                    {...props}
                    key={option?.value ?? "t" + Math.random()}
                >
                    {option?.label}
                </Box>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    onChange={handleSearchChange}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    variant={variant}
                    fullWidth={fullWidth}
                    error={error}
                    helperText={helperText}
                    required={required}
                />
            )}
            size={size}
            {...rest}
        />
    );
}

SelectBulkEmailGroup.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
    error: PropTypes.bool,
    helperText: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(["medium", "small", "large"]),
    fullWidth: PropTypes.bool.isRequired,
    variant: PropTypes.oneOf(["outlined", "standard", "filled"]),
    color: PropTypes.oneOf(["primary", "secondary", "error", "info", "success", "warning"]),
    onSelected: PropTypes.func,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

SelectBulkEmailGroup.defaultProps = {
    id: "select-bulk-email-" + Math.random(),
    label: "Select Bulk Email Group",
    error: false,
    helperText: "",
    required: false,
    disabled: false,
    fullWidth: true,
    size: "small",
    variant: "outlined",
};
