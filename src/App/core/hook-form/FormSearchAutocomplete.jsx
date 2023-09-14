import { useEffect, useState, memo } from "react";
import PropTypes from "prop-types";
import * as qs from "qs";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import { Controller, useFormContext } from "react-hook-form";

import Api from "App/services/api";

import debounce from "App/helpers/debounce";
// import http from "services/httpService";
// import { useQuery } from "@tanstack/react-query";
// import FormInputWrapper from "components/input/FormInputWrapper";

const api = new Api();

function FormSearchAutoComplete(props) {
    const [selected, setSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [searchedText, setSearchedText] = useState("");

    const {
        name,
        label,
        size = "small",
        fullWidth,
        labelKey,
        valueKey,
        paramkey,
        apiEndpoint,
        variant,
        required,
        defaultQueryParams,
    } = props;

    useEffect(() => {
        if (searchedText === "") setSelected(null);

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { data } = await api.get(
                    `${apiEndpoint}?${qs.stringify({
                        ...defaultQueryParams,
                        [paramkey]: searchedText,
                    })}`,
                );
                setApiData(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [searchedText]);

    const options = apiData?.map((v) => ({
        label: v[labelKey],
        value: v[valueKey],
    }));

    const {
        control,
        setValue,
        watch,
        formState: { errors },
        clearErrors,
    } = useFormContext();

    const value = watch(name);

    useEffect(() => {
        const selected = options?.find((o) => o.value === value);
        setSelected(selected ?? null);
    }, [value]);

    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            render={() => (
                <FormControl fullWidth variant={variant} error={!!errors[name]} required={required}>
                    <InputLabel>{searchedText === "" && !selected ? label : ""}</InputLabel>
                    <Autocomplete
                        placeholder={label}
                        fullWidth={fullWidth}
                        disablePortal
                        value={selected}
                        options={options ?? []}
                        onChange={(_e, option) => {
                            if (option === null) setValue(name, null);
                            else setValue(name, option.value);
                            clearErrors(name);
                        }}
                        getOptionLabel={(option) => option.label ?? ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {/* {isLoading ? <CircularProgress color="inherit" size={20} /> : null} */}
                                            {params.InputProps.endAdornment}
                                        </InputAdornment>
                                    ),
                                }}
                                size={size}
                                error={!!errors[name]?.message}
                                onChange={(e) => {
                                    debounce(setSearchedText(e.target.value), 500);
                                }}
                            />
                        )}
                        // popupIcon={<ChevronDownIcon />}
                        loading={isLoading}
                        isOptionEqualToValue={(option, value) => {
                            if (value === undefined) return false;
                            return option.value === value.value;
                        }}
                    />
                    <FormHelperText>{errors[name]?.message ?? ""}</FormHelperText>
                </FormControl>
            )}
        />
    );
}

export default memo(FormSearchAutoComplete);

FormSearchAutoComplete.propTypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium", "large"]),
    fullWidth: PropTypes.bool,
    labelKey: PropTypes.string.isRequired,
    valueKey: PropTypes.string.isRequired,
    paramkey: PropTypes.string.isRequired,
    apiEndpoint: PropTypes.string.isRequired,
    variant: PropTypes.string,
    required: PropTypes.bool,
    defaultQueryParams: PropTypes.object,
};
