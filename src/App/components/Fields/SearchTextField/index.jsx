import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import React, { useEffect, useRef, useState } from "react";

const SearchTextField = React.memo(({ debounceTime = 500, onChange, ...rest }) => {
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
        )
      }}
      size="small"
      placeholder="Search"
      value={value}
      onChange={handleChange}
    />
  );
})

export default SearchTextField;
