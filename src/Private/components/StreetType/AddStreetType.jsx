import Grid from "@mui/material/Grid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import { AddButton, CancelButton } from "../AllButtons/Buttons";

const localizationTypeOptions = [{ label: "Api", value: "API" }];

const streetTypeSchema = yup.object().shape({
    country: yup.string().required("Country is required"),
    street_code: yup.string().required("Street Code is required"),
    street_name: yup.string().required("Street Name is required"),
});

const AddStreetType = ({ initial, update, onSubmit }) => {
    const methods = useForm({
        defaultValues: initial,
        resolver: yupResolver(streetTypeSchema),
    });

    const { reset, setValue, getValues } = methods;

    const handleSubmit = (data) => {
        onSubmit(data);
        reset();
    };
    const country = JSON.parse(localStorage.getItem("country"));

    const countryOptions = country?.map((data) => {
        return { label: data.country, value: data.iso3 };
    });
    return (
        <HookForm onSubmit={handleSubmit} {...methods}>
            <Grid container item xs={12} direction="row" spacing={2}>
                <Grid item xs={12} sm={6}>
                    <FormSelect name="country" options={countryOptions} label="Country" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormTextField name="street_code" label="Street Code" />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormTextField name="street_name" label="Street Name" />
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

export default AddStreetType;
