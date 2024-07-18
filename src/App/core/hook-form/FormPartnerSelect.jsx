import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import isEqual from "lodash/isEqual";
import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";
import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";

import RefreshIconButton from "App/components/Button/RefreshIconButton";

import PartnerType from "App/data/PartnerType";

// example partner data
// {
//     "f_serial_no": 1,
//     "agent_id": 122,
//     "tid": 122,
//     "parent_agent_id": 0,
//     "name": "iSend Biz AUS",
//     "short_code": "ISBZAUS",
//     "agent_type": "BOTH",
//     "phone_number": "1449205552",
//     "email": "akriti.lamichhane@ipayremit.com",
//     "website": null,
//     "country": "AUS",
//     "postcode": "234",
//     "unit": "2345",
//     "street": "ghgfvdc",
//     "city": "fvbdcsx",
//     "state": "dfgbhfbv",
//     "address": "dc vgfbtg",
//     "contact_person_full_name": "Akriti Lamichhane",
//     "contact_person_post": "Director",
//     "contact_person_mobile": "1449205552",
//     "contact_person_email": "akriti.lamichhane@ipayremit.com",
//     "date_of_incorporation": "2022-02-22T00:00:00",
//     "business_license_number": "123456",
//     "business_license_expiry_date": "2027-07-04T00:00:00",
//     "balance": 1000000,
//     "credit_limit": 1,
//     "transaction_currency": "AUD",
//     "settlement_currency": "USD",
//     "tax_type": "VAT",
//     "date_format": "yyyy-mm-dd",
//     "is_prefunding": true,
//     "time_zone": "-720",
//     "transaction_limit": 100000,
//     "commission_currency": "AUD",
//     "bank_charge_currency": "AUD",
//     "status": null,
//     "approved_ts": "0001-01-01T00:00:00",
//     "approved_by": null,
//     "is_active": true,
//     "id": 0,
//     "created_ts": "2023-09-27T00:48:22.761826+08:00",
//     "created_by": "Test Admin",
//     "updated_ts": "2024-01-03T11:57:09.245199",
//     "updated_by": ""
// }

export default function FormPartnerSelect({
    label,
    name,
    size = "small",
    labelKey = "name",
    valueKey = "agent_id",
    queryParams,
    required = false,
    isOptional = false,
    onChange,
    ...rest
}) {
    const { setValue, watch, clearErrors } = useFormContext();

    const [selectedOption, setSelectedOption] = useState(null);

    const { response, loading: isLoading, query } = useSelector((state) => state.get_sending_partner);

    const options = response?.data ?? [];

    const dispatch = useDispatch();

    const value = watch(name);

    const requestQueryParams = {
        page_number: 1,
        page_size: 100,
        agent_type: PartnerType.SEND,
        country: "AUS",
        sort_by: "name",
        order_by: "DESC",
        ...queryParams,
    };

    const fetch = () => {
        dispatch({
            type: "GET_SENDING_PARTNER",
            query: requestQueryParams,
        });
    };

    useEffect(() => {
        if (options.length > 0 && isEqual(requestQueryParams, query)) return;

        fetch(requestQueryParams);
    }, [queryParams]);

    useEffect(() => {
        const options = response?.data ?? [];
        const option = options?.find((d) => d[valueKey] === value);
        setSelectedOption(option ?? null);
    }, [response]);

    return (
        <Box display="flex" gap={1}>
            <Autocomplete
                {...rest}
                fullWidth
                size={size}
                options={options}
                autoHighlight
                isOptionEqualToValue={(option, value) => option[valueKey] === value[valueKey]}
                onChange={(e, value, reason, details) => {
                    if (reason === "clear") {
                        setSelectedOption(null);
                    } else {
                        setSelectedOption(value);
                        setValue(name, value[valueKey]);
                    }
                    onChange?.(e, value, reason, details);
                }}
                value={selectedOption}
                getOptionLabel={(option) => option[labelKey]}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                        {option[labelKey]}
                    </Box>
                )}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={
                            <>
                                {label} {isOptional && <Typography variant="caption">(Optional)</Typography>}
                            </>
                        }
                        name={name}
                        size={size}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <InputAdornment position="end">
                                    {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </InputAdornment>
                            ),
                        }}
                        required={required}
                        fullWidth
                    />
                )}
                onFocus={() => clearErrors(name)}
            />
            <RefreshIconButton onClick={fetch} />
        </Box>
    );
}

FormPartnerSelect.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.string,
    options: PropTypes.oneOfType([
        PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            }),
        ),
        PropTypes.arrayOf(PropTypes.any),
    ]),
    labelKey: PropTypes.string,
    valueKey: PropTypes.string,
    queryParams: PropTypes.object,
    required: PropTypes.bool,
    isOptional: PropTypes.bool,
};
