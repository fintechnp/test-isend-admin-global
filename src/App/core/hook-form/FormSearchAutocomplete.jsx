import { useEffect, useState, memo, useRef } from "react";
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
import { CircularProgress } from "@mui/material";

const api = new Api();

function FormSearchAutoComplete(props) {
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
        disabled,
        refetchKey,
        error,
        isAddMode = true,
        defaultValue,
        shouldRenderPrevData,
        pageNumberQueryKey = "PageNumber",
    } = props;

    const [selected, setSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [searchedText, setSearchedText] = useState("");

    const [position, setPosition] = useState(0);

    const [totalRecordCount, setTotalRecordCount] = useState();

    const [params, setParams] = useState({
        [pageNumberQueryKey]: 1,
        PageSize: 20,
    });

    const {
        control,
        setValue,
        watch,
        formState: { errors },
        clearErrors,
    } = useFormContext();

    const listBox = useRef(null);

    const value = watch(name);

    useEffect(() => {
        if (!isAddMode) return;
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await api.get(
                    `${apiEndpoint}?${qs.stringify({
                        ...defaultQueryParams,
                        ...params,
                        [paramkey]: searchedText,
                    })}`,
                );
                if (shouldRenderPrevData) {
                    setApiData((prev) => [...prev, ...response?.data]);
                }
                setApiData(response?.data);
                setTotalRecordCount(response?.pagination?.totalCount);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [searchedText, apiEndpoint, refetchKey, params, defaultQueryParams]);

    useEffect(() => {
        if (isAddMode) return;
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await api.get(
                    `${apiEndpoint}?${qs.stringify({
                        [paramkey]: defaultValue,
                    })}`,
                );
                setApiData(response?.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [defaultValue]);

    useEffect(() => {
        if (listBox.current !== null) {
            listBox.current.scrollTop = position;
        }
    }, [position]);

    const loadMoreResults = () => {
        if (!totalRecordCount || apiData.length < totalRecordCount) {
            setParams({ ...params, ...defaultQueryParams, [pageNumberQueryKey]: (params[pageNumberQueryKey] += 1) });
        }
    };

    const handleScroll = (event) => {
        listBox.current = event.currentTarget;
        const x = event.currentTarget.scrollTop + event.currentTarget.clientHeight;
        if (event.currentTarget.scrollHeight - x <= 1) {
            setPosition(x);
            loadMoreResults();
        }
    };

    const options = apiData?.map((v) => ({
        label: v[labelKey],
        value: v[valueKey],
    }));

    useEffect(() => {
        const selected = options?.find((o) => o.value === value);

        setSelected(selected ?? "");
    }, [value, apiData]);

    return (
        <Controller
            name={name}
            control={control}
            render={() => (
                <FormControl fullWidth variant={variant} error={!!errors[name]} required={required}>
                    <InputLabel>{searchedText === "" && !selected ? label : ""}</InputLabel>
                    <Autocomplete
                        placeholder={label}
                        fullWidth={fullWidth}
                        value={selected}
                        options={options ?? []}
                        onChange={(_e, option, reason) => {
                            if (option === null) setValue(name, null);
                            else setValue(name, option.value);
                            clearErrors(name);
                            if (reason === "clear") {
                                setApiData([]);
                                setSearchedText("");
                                setParams({
                                    ...params,
                                    [pageNumberQueryKey]: 1,
                                    PageSize: 20,
                                });
                            }
                        }}
                        getOptionLabel={(option) => option.label ?? ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </InputAdornment>
                                    ),
                                }}
                                size={size}
                                error={!!errors[name]?.message}
                                onChange={(e) => {
                                    debounce(() => setSearchedText(e.target.value), 500);
                                }}
                            />
                        )}
                        getOptionDisabled={(option) => {
                            return isLoading;
                        }}
                        disabled={disabled}
                        isOptionEqualToValue={(option, value) => {
                            if (value === undefined) return false;
                            return option.value === value.value;
                        }}
                        ListboxProps={{
                            onScroll: handleScroll,
                        }}
                    />
                    <FormHelperText error={true}> {error ?? errors[name]?.message ?? ""}</FormHelperText>
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
    error: PropTypes.string,
    pageNumberQueryKey: PropTypes.string,
    defaultValue: PropTypes.string,
    relatedIdQueryKey: PropTypes.string,
    shouldRenderPrevData: PropTypes.bool,
};
