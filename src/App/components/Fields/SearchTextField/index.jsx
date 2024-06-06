import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useEffect, useRef, useState } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import isEmpty from "App/helpers/isEmpty";

const SearchTextField = React.memo(({ debounceTime = 500, onChange, onClear, onClick, ...rest }) => {
    const [value, setValue] = useState("");
    const timeout = useRef();

    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);

        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            if (typeof onChange === "function") {
                onChange(newValue || "");
            }
        }, debounceTime);
    };

    useEffect(() => {
        return () => clearTimeout(timeout)
    }, [])

    return (
        <TextField
            {...rest}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                endAdornment:
                    !isEmpty(value) && typeof onClear === "function" ? (
                        <InputAdornment position="end">
                            <IconButton
                                color="error"
                                onClick={() => {
                                    setValue("");
                                    onClear();
                                }}
                            >
                                <ClearRoundedIcon />
                            </IconButton>
                        </InputAdornment>
                    ) : null,
            }}
            size="small"
            placeholder={rest?.placeholder ?? "Search"}
            value={value}
            onChange={handleChange}
            onClick={onClick}
        />
    );
});

SearchTextField.propTypes = {
    debounceTime: PropTypes.number,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onClick: PropTypes.func,
};

export default SearchTextField;
