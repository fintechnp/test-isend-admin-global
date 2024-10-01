import { useEffect, useState, memo, useRef } from "react";
import PropTypes from "prop-types";
import * as qs from "qs";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import { Controller, useFormContext, get } from "react-hook-form";

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
        required,
        defaultQueryParams,
        disabled,
        refetchKey,
        isAddMode = true,
        defaultValue,
        shouldRenderPrevData,
        pageNumberQueryKey = "PageNumber",
        pageSizeQueryKey = "PageSize",
        filterParams,
        callApiAtfirst = true,
    } = props;

    const [selected, setSelected] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const [apiData, setApiData] = useState([]);

    const [searchedText, setSearchedText] = useState("");

    const [position, setPosition] = useState(0);

    const [totalRecordCount, setTotalRecordCount] = useState();

    const params = useRef({
        [pageNumberQueryKey]: 1,
        [pageSizeQueryKey]: 20,
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

    const errorMessage = get(errors, name)?.message;

    // Use ref to keep track of previous endpoint
    const prevApiEndpoint = useRef(apiEndpoint);

    useEffect(() => {
        if (apiEndpoint !== prevApiEndpoint.current || filterParams) {
            // Clear API data when the endpoint changes
            setApiData([]);
            setSearchedText("");
            setSelected(null);
            params.current = { [pageNumberQueryKey]: 1, [pageSizeQueryKey]: 20 };
            prevApiEndpoint.current = apiEndpoint; // Update ref
        }
    }, [apiEndpoint, filterParams]);

    const fetchData = async () => {
        if (searchedText) {
            setApiData([]);
            params.current = { [pageNumberQueryKey]: 1, [pageSizeQueryKey]: 20 };
        }
        try {
            setIsLoading(true);
            const response = await api.get(
                `${apiEndpoint}?${qs.stringify({
                    ...defaultQueryParams,
                    ...params.current,
                    ...filterParams,
                    [paramkey]: searchedText,
                })}`,
            );
            if (shouldRenderPrevData && response.data.length !== 0) {
                setApiData((prev) => [...prev, ...response?.data]);
            }
            if (!shouldRenderPrevData && response.data.length !== 0) {
                setApiData(response?.data);
            }

            setTotalRecordCount(response?.pagination?.totalCount);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!isAddMode || !callApiAtfirst) return;
        fetchData();
    }, [searchedText, apiEndpoint, refetchKey, defaultQueryParams, filterParams]);

    useEffect(() => {
        if (isAddMode) return;
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await api.get(
                    `${apiEndpoint}?${qs.stringify({
                        [paramkey]: defaultValue,
                        ...filterParams,
                    })}`,
                );
                setApiData(response?.data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [defaultValue, filterParams]);

    useEffect(() => {
        if (listBox.current !== null) {
            listBox.current.scrollTop = position;
        }
    }, [position]);

    const loadMoreResults = () => {
        if (!totalRecordCount || apiData.length < totalRecordCount) {
            const currentParams = params.current || {};
            const updatedPageNumber = (currentParams[pageNumberQueryKey] || 0) + 1;
            params.current = { ...params.current, ...defaultQueryParams, [pageNumberQueryKey]: updatedPageNumber };
            fetchData();
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
        setSearchedText("");
    }, [value, apiData]);

    return (
        <Controller
            name={name}
            control={control}
            render={() => (
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
                            setSearchedText("");
                            params.current = {
                                ...params.current,
                                [pageNumberQueryKey]: 1,
                                [pageSizeQueryKey]: 20,
                            };
                        }
                    }}
                    getOptionLabel={(option) => option.label ?? ""}
                    size={size}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label={label}
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
                            onChange={(e) => {
                                debounce(() => setSearchedText(e.target.value), 500);
                                setApiData([]);
                            }}
                            error={!!errorMessage}
                            helperText={errorMessage}
                            required={required}
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
    filterParams: PropTypes.object,
};
