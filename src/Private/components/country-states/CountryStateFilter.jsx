import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import MuiSelect from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MuiFormControl from "@mui/material/FormControl";
import { localStorageSave } from "App/helpers/localStorage";

const FormControl = styled(MuiFormControl)(({ theme }) => ({
    "& .MuiPaper-root.MuiMenu-paper.MuiPaper-root.MuiPopover-paper": {
        maxHeight: "400px",
        maxWidth: "100%",
        overflow: "auto",
        border: "1px solid red",
        background: "red",
        width: "100%",
    },
}));

function CountryStateFilter({ onCountryChange, countries }) {
    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        localStorageSave("loginCountry", selectedCountry);
        onCountryChange(event);
    };

    return (
        <Box display="flex" justifyContent="flex-end">
            <FormControl sx={{ ml: 1, minWidth: 120 }}>
                <MuiSelect size="small" native onChange={handleCountryChange} displayEmpty defaultValue="">
                    <option value="">Choose Country</option>
                    {countries &&
                        countries.map((sort) => (
                            <option value={sort.value} key={sort.value}>
                                {sort.label}
                            </option>
                        ))}
                </MuiSelect>
            </FormControl>
        </Box>
    );
}

CountryStateFilter.propTypes = {
    onCountryChange: PropTypes.func,
    countries: PropTypes.array,
};

export default React.memo(CountryStateFilter);
