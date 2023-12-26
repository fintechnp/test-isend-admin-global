import React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import MuiSelect from "@mui/material/Select";
import { styled } from "@mui/material/styles";
import MuiFormControl from "@mui/material/FormControl";
import { localStorageSave } from "App/helpers/localStorage";
import { useFormContext, Controller } from "react-hook-form";
import Form from "Private/pages/Users/Accounts/components/AddAccount/Form";
import { FormHelperText } from "@mui/material";

const FormControl = styled(MuiFormControl)(({ theme }) => ({
    "& .MuiPaper-root.MuiMenu-paper.MuiPaper-root.MuiPopover-paper": {
        maxHeight: "400px",
        maxWidth: "100%",
        overflow: "auto",

        background: "#fff",
        width: "100%",
    },
}));

function CountryStateFilter({ onCountryChange, countries, name }) {
    const handleCountryChange = (event) => {
        const selectedCountry = event.target.value;
        localStorageSave("loginCountry", selectedCountry);
        onCountryChange(event);
    };

    const {
        formState: { errors },
    } = useFormContext();

    return (
        <Controller
            name={name}
            render={({ field }) => {
                return (
                    <Box display="flex" justifyContent="flex-end">
                        <FormControl sx={{}} fullWidth>
                            <MuiSelect
                                size="small"
                                native
                                onChange={handleCountryChange}
                                displayEmpty
                                defaultValue=""
                                sx={{}}
                            >
                                <option value="" disabled>
                                    Choose Sending Country
                                </option>
                                {countries &&
                                    countries.map((sort) => (
                                        <option value={sort.value} key={sort.value}>
                                            {sort.label}
                                        </option>
                                    ))}
                            </MuiSelect>

                            <FormHelperText error={errors[name] && true}>
                                {errors[name] && errors[name].message}
                            </FormHelperText>
                        </FormControl>
                    </Box>
                );
            }}
        />
    );
}

CountryStateFilter.propTypes = {
    onCountryChange: PropTypes.func,
    countries: PropTypes.array,
};

export default React.memo(CountryStateFilter);
