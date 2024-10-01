import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import capitalize from "lodash/capitalize";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import InputAdornment from "@mui/material/InputAdornment";
import { Controller, useFormContext, get } from "react-hook-form";

import MenuItem from "@mui/material/MenuItem";
import useId from "@mui/material/utils/useId";

import Center from "App/components/Center/Center";
import getFlagUrl from "App/helpers/getFlagUrl";

function FormMobileNumber(props) {
    const selectDialingCodeId = useId();

    const mobileNumberId = useId();

    const {
        control,
        clearErrors,
        watch,
        setValue,
        formState: { errors },
    } = useFormContext();

    const {
        countryFieldName = "dialing_code_country",
        countryFieldLabel,
        mobileNumberFieldName,
        mobileNumberLabel,
        required,
        size = "small",
        options,
        variant,
        disabled,
        dialingCodeName = "dialing_code",
        label,
        countries = [],
        countrySelectKeyValueAsValue = "country_id",
        disableCountrySelect,
        ...rest
    } = props;

    const [popoverStyle, setPopoverStyle] = useState({
        offsetLeft: 0,
        width: 0,
    });

    const countryValue = watch(countryFieldName);

    const dialingCode = watch(dialingCodeName);

    useEffect(() => {
        if (countryValue) {
            const country = countries.find((c) => c[countrySelectKeyValueAsValue] === countryValue);
            setValue(dialingCodeName, country?.phoneCode);
        } else {
            setValue(dialingCodeName, "");
        }
    }, [countryValue]);

    useEffect(() => {
        const select = document.getElementById(selectDialingCodeId);
        const input = document.getElementById(mobileNumberId);

        const selectOffsetLeft = select?.getBoundingClientRect().left;
        const inputOffsetLeft = input?.getBoundingClientRect().left + input?.clientWidth;

        setPopoverStyle({
            offsetLeft: selectOffsetLeft,
            width: inputOffsetLeft - selectOffsetLeft,
        });
    }, [selectDialingCodeId, mobileNumberId]);

    return (
        <Box display="flex" gap={1}>
            {countryFieldName && (
                <Controller
                    name={countryFieldName}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <Select
                            {...field}
                            disabled={disableCountrySelect}
                            name={countryFieldName}
                            id={selectDialingCodeId}
                            error={!!get(errors, countryFieldName)?.message ?? get(errors, dialingCodeName)?.message}
                            onFocus={() => clearErrors([countryFieldName, dialingCodeName])}
                            onChange={(event) => {
                                const value = event.target.value;
                                const country = countries.find((v) => v[countrySelectKeyValueAsValue] === value);

                                setValue(countryFieldName, country[countrySelectKeyValueAsValue]);
                                setValue(dialingCodeName, country.phone_code);
                            }}
                            renderValue={(value) => {
                                const country = countries?.find((v) => v[countrySelectKeyValueAsValue] === value);

                                if (country) {
                                    return (
                                        <Center>
                                            <img
                                                src={getFlagUrl(country.iso2)}
                                                style={{
                                                    maxHeight: "12px",
                                                }}
                                                width="30"
                                                alt="country-flag"
                                            />
                                        </Center>
                                    );
                                }

                                return <div>{value}</div>;
                            }}
                            MenuProps={{
                                sx: {
                                    ".MuiMenu-paper": {
                                        left: `${popoverStyle.offsetLeft}px !important`,
                                        width: `${popoverStyle.width}px !important`,
                                    },
                                },
                            }}
                            sx={{
                                width: "84px",
                            }}
                            fullWidth
                            size={size}
                        >
                            <MenuItem value="" disabled>
                                None
                            </MenuItem>
                            {countries.map((country) => (
                                <MenuItem key={country.country_id} value={country[countrySelectKeyValueAsValue]}>
                                    <Box display="flex" gap={2}>
                                        <Box width="50px">(+{country.phone_code})</Box>
                                        <Typography>{capitalize(country?.country)}</Typography>
                                        <>{country[countrySelectKeyValueAsValue]}</>
                                    </Box>
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            )}

            <Controller
                name={mobileNumberFieldName}
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <TextField
                        {...field}
                        id={mobileNumberId}
                        label={label}
                        type="string"
                        error={!!get(errors, mobileNumberFieldName)?.message}
                        variant={variant}
                        fullWidth
                        required={required}
                        size={size}
                        onFocus={() => clearErrors(mobileNumberFieldName)}
                        disabled={disabled}
                        InputProps={{
                            sx: {
                                width: "100%",
                            },
                            autoComplete: "new-password",
                            startAdornment: <InputAdornment position="start">{dialingCode}</InputAdornment>,
                        }}
                        value={field.value || ""}
                    />
                )}
            />
        </Box>
    );
}

export default FormMobileNumber;
