import React from "react";
import PropTypes from "prop-types";
import Box  from "@mui/material/Box";
import MuiSelect from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MuiFormControl from "@mui/material/FormControl";

const FormControl = styled(MuiFormControl)(({ theme }) => ({
  "& .MuiPaper-root.MuiMenu-paper.MuiPaper-root.MuiPopover-paper": {
    maxHeight: "400px",
    maxWidth: "320px",
    background: "red",
  },
}));

function CountryStateFilter({ onCountryChange }) {
  const country = JSON.parse(localStorage.getItem("country"));

  return (
    <Box display="flex" justifyContent="flex-end">
      <FormControl sx={{ ml: 1, minWidth: 120 }}>
        <MuiSelect
          size="small"
          native
          onChange={onCountryChange}
          displayEmpty
          defaultValue=""
        >
          <option value="">Choose Country</option>
          {country &&
            country.map((sort) => (
              <option value={sort.iso3} key={sort.iso3}>
                {sort.country}
              </option>
            ))}
        </MuiSelect>
      </FormControl>
    </Box>
  );
}

export default React.memo(CountryStateFilter);

CountryStateFilter.propTypes = {
  onCountryChange: PropTypes.func,
};
