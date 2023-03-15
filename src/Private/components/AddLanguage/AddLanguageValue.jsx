import Grid from "@mui/material/Grid";
import { LoadingButton } from "@mui/lab";
import { useForm } from "react-hook-form";
import { styled } from "@mui/material/styles";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";

const CancelButton = styled(LoadingButton)(({ theme }) => ({
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

const AddButton = styled(LoadingButton)(({ theme }) => ({
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

const localizationTypeOptions = [{ label: "Api", value: "API" }];

const AddLanguageValue = ({ initial, update, onSubmit }) => {
    const methods = useForm({
        defaultValues: initial,
    });

    const { reset, setValue, getValues } = methods;

    const handleSubmit = (data) => {
        onSubmit(data);
        reset();
    };
    return (
        <HookForm onSubmit={handleSubmit} {...methods}>
            <Grid container item xs={12} direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormTextField name="localization_key" label="Localization Key" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormTextField name="localization_value" label="Localization Value" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormSelect
                        disabled
                        name="translation_type"
                        options={localizationTypeOptions}
                        label="Translation Type"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        columnSpacing={2}
                        style={{ padding: "4px 0px", paddingRight: "4px" }}
                    >
                        <Grid item>
                            <CancelButton size="small" variant="outlined">
                                Cancel
                            </CancelButton>
                        </Grid>
                        <Grid item>
                            <AddButton size="small" variant="outlined" type="submit">
                                {update ? "Update" : "  Add"}
                            </AddButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </HookForm>
    );
};

export default AddLanguageValue;
