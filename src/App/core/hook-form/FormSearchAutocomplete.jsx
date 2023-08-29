import { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";

import InputAdornment from "@mui/material/InputAdornment";
import CircularProgress from "@mui/material/CircularProgress";
import { FormControl, FormHelperText, InputLabel } from "@mui/material";
import Api from "App/services/api";
import { set } from "date-fns";
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
        size = "medium",
        fullWidth,
        labelKey,
        valueKey,
        paramkey,
        apiEndpoint,
        variant,
        required,
    } = props;

    useEffect(() => {
        if (searchedText === "") setSelected(null);

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const { data } = await api.get(`${apiEndpoint}?${paramkey}=${searchedText}`);
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
        
    }, [options, value]);

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
                            if (option === null) setValue(name, undefined);
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
                                    setSearchedText(e.target.value);
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

export default FormSearchAutoComplete;
