import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useEffect, useRef, useState } from "react";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";

import isEmpty from "App/helpers/isEmpty";

const SearchTextField = React.memo(({ debounceTime = 500, onChange, onClear, onClick, ...rest }) => {
    const firstRender = useRef(true);
    const [value, setValue] = useState("");
    const timeout = useRef();

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        clearTimeout(timeout.current);

        timeout.current = setTimeout(() => {
            if (typeof onChange === "function" && !firstRender.current) {
                onChange(value || "");
            }
        }, debounceTime);

        firstRender.current = false;

        return () => clearTimeout(timeout.current);
    }, [value]);

    return (
        <TextField
            {...rest}
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
                ...(typeof onClear === "function" && !isEmpty(value)
                    ? {
                          endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton
                                      color="error"
                                      onClick={() => {
                                          setValue("");
                                          onClear?.();
                                      }}
                                  >
                                      <ClearRoundedIcon />
                                  </IconButton>
                              </InputAdornment>
                          ),
                      }
                    : undefined),
            }}
            size="small"
            placeholder={rest?.placeholder ?? "Search"}
            value={value}
            onChange={handleChange}
            onClick={onClick}
        />
    );
});

export default SearchTextField;

SearchTextField.propTypes = {
    debounceTime: PropTypes.number,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onClick: PropTypes.func
};
