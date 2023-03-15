import { useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import LoadingButton from "@mui/lab/LoadingButton";

import actions from "./../store/actions";
import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";

const FormWrapper = styled(Grid)(({ theme }) => ({
    padding: "0px 12px",
}));

const FieldWrapper = styled(Grid)(({ theme }) => ({
    padding: "1px 4px",
}));

const ButtonWrapper = styled(Grid)(({ theme }) => ({
    padding: "4px 0px",
    paddingRight: "4px",
}));

const ResetButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    marginTop: "8px",
    textTransform: "capitalize",
    border: `1px solid ${theme.palette.warning.main}`,
    background: theme.palette.warning.main,
    "&:hover": {
        background: theme.palette.warning.dark,
        border: `1px solid ${theme.palette.warning.main}`,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const SearchButton = styled(LoadingButton)(({ theme }) => ({
    minWidth: "100px",
    color: "#fff",
    borderRadius: "2px",
    marginTop: "8px",
    textTransform: "capitalize",
    background: theme.palette.primary.main,
    "&:hover": {
        background: theme.palette.primary.dark,
        border: `1px solid ${theme.palette.primary.main}`,
    },
    "& .MuiCircularProgress-root": {
        color: theme.palette.primary.contrastText,
    },
}));

const orderByOptions = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
];

const FilterLanguage = ({ sortByOptions }) => {
    const methods = useForm();
    const dispatch = useDispatch();

    const { reset, setValue, getValues } = methods;

    const handleSubmit = (data) => {
        dispatch(actions.get_all_language_value(data));
        reset();
    };

    const handleReset = () => {
        reset();
    };
    return (
        <Grid item xs={12}>
            <HookForm onSubmit={handleSubmit} {...methods}>
                <FormWrapper container direction="row">
                    <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                        <FormTextField name="localization_key" label="Localization Key" />
                    </FieldWrapper>
                    <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                        <FormSelect name="order_by" options={orderByOptions} label="Order By" />
                    </FieldWrapper>
                    <FieldWrapper item xs={12} sm={6} style={{ marginTop: "0.5rem" }}>
                        <FormSelect name="sort_by" options={sortByOptions} label="Sort By" />
                    </FieldWrapper>
                    <Grid item xs={12}>
                        <ButtonWrapper
                            container
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            columnSpacing={2}
                        >
                            <Grid item>
                                <ResetButton size="small" variant="outlined" onClick={handleReset}>
                                    Reset
                                </ResetButton>
                            </Grid>
                            <Grid item>
                                <SearchButton size="small" variant="outlined" type="submit">
                                    Search
                                </SearchButton>
                            </Grid>
                        </ButtonWrapper>
                    </Grid>
                </FormWrapper>
            </HookForm>
        </Grid>
    );
};

export default FilterLanguage;
