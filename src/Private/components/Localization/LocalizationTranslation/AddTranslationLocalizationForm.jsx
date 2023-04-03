import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import HookForm from "App/core/hook-form/HookForm";
import { yupResolver } from "@hookform/resolvers/yup";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import { AddButton, CancelButton } from "../../AllButtons/Buttons";
import { useEffect } from "react";
import actions from "../../../pages/Setup/LanguageSetup/store/actions";

const translationFormSchema = Yup.object().shape({
    translated_text: Yup.string().required("Required Field"),
    language_id: Yup.string().required("Required Field"),
});

const AddTranslationForm = ({ update, id, onSubmit, initial }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.get_all_language_option());
    }, []);

    const { response: languageData, loading: lang_loading } = useSelector((state) => state.get_all_language_option);

    const methods = useForm({
        defaultValues: initial,
        resolver: yupResolver(translationFormSchema),
    });

    const { reset, setValue, getValues } = methods;

    const languageCountryOptions =
        languageData?.data?.length !== 0 &&
        languageData?.data?.map((item) => {
            return { label: item.language_name, value: item.language_id };
        });

    const handleSubmit = (data) => {
        let newData = {};
        if (update) {
            newData = { translated_text: data?.translated_text, localization_id: id };
        } else {
            newData = { ...data, localization_id: id };
        }
        onSubmit(newData);

        reset();
    };
    return (
        <HookForm onSubmit={handleSubmit} {...methods}>
            <Grid container item xs={12} direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormTextField name="translated_text" label="Translated Text" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormSelect
                        name="language_id"
                        options={languageCountryOptions}
                        label="Language Country"
                        disabled={update}
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

export default AddTranslationForm;
