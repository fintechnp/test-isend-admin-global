import { useEffect, useRef, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";
import { useDispatch, useSelector } from "react-redux";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import { Controller, useFormContext } from "react-hook-form";
import CircularProgress from "@mui/material/CircularProgress";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

import Api from "App/services/api";

import { userProfileSetupActions } from "Private/pages/Users/ProfileSetups/store";

const api = new Api();

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function FormUserProfileSelect(props) {
    const isOptionsMapped = useRef(false);

    const { name, label, size = "small", fullWidth, variant, required, disabled, error } = props;

    const dispatch = useDispatch();

    const { response, loading } = useSelector((state) => state.list_user_profile_setup_for_select);

    const [selected, setSelected] = useState([]);

    const {
        control,
        setValue,
        watch,
        formState: { errors },
        clearErrors,
    } = useFormContext();

    const ids = watch(name) ?? [];

    useEffect(() => {
        dispatch(
            userProfileSetupActions.list_user_profile_setup_for_select({
                page_number: 1,
                page_size: 1000,
            }),
        );
    }, []);

    useEffect(() => {
        if (response?.data && ids && !isOptionsMapped.current) {
            const selectedOptions = response?.data?.filter((role) => ids.includes(role.id));
            setSelected(selectedOptions);
            isOptionsMapped.current = true;
        }
    }, [response?.data, ids]);

    return (
        <Controller
            name={name}
            control={control}
            render={() => (
                <FormControl fullWidth variant={variant} error={!!errors[name]} required={required}>
                    <Autocomplete
                        multiple
                        limitTags={2}
                        placeholder={label}
                        fullWidth={fullWidth}
                        value={selected}
                        options={response?.data ?? []}
                        disableCloseOnSelect
                        onChange={(_e, option, reason) => {
                            setSelected(option);
                            const selectedIds = option?.map((o) => o.id) ?? [];
                            setValue(name, selectedIds);
                        }}
                        getOptionLabel={(option) => option.role_name}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox icon={icon} checkedIcon={checkedIcon} checked={selected} />
                                {option.role_name}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={label}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </InputAdornment>
                                    ),
                                }}
                                size={size}
                                error={!!errors[name]?.message}
                            />
                        )}
                        disabled={disabled}
                        isOptionEqualToValue={(option, value) => {
                            return option.id === value.id;
                        }}
                        size="small"
                        onBlur={() => clearErrors(name)}
                    />
                    <FormHelperText error={true}> {error ?? errors[name]?.message ?? ""}</FormHelperText>
                </FormControl>
            )}
        />
    );
}

export default FormUserProfileSelect;
