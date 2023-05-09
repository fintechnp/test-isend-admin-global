import * as yup from "yup";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import { AddButton, CancelButton } from "../AllButtons/Buttons";
import FormTextField from "App/core/hook-form/FormTextField";

const localizationTypeOptions = [{ label: "Api", value: "API" }];

const languageValueSchema = yup.object().shape({
    localization_key: yup.string().required("Localization Key is required"),
    localization_value: yup.string().required("Localization Value is required"),
});

const AddLanguageValue = ({ initial, update, onSubmit }) => {
    const methods = useForm({
        defaultValues: initial,
        resolver: yupResolver(languageValueSchema),
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
