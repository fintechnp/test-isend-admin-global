import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";

import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import PageContent from "App/components/Container/PageContent";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import { ResetButton, SearchButton } from "../AllButtons/Buttons";
import { localStorageGet } from "App/helpers/localStorage";

const orderByOptions = [
    { label: "Ascending", value: "ASC" },
    { label: "Descending", value: "DESC" },
];

export default function FilterForm({ sortByOptions = [], setFilterSchema, loading }) {
    const methods = useForm();

    const { reset } = methods;

    const statusOptions = localStorageGet("reference")
        ?.find((item) => item?.reference_type === 67)
        ?.reference_data?.map((referenceItem) => {
            return {
                label: referenceItem.name,
                value: +referenceItem.value,
            };
        });

    const handleSubmit = (data) => {
        setFilterSchema((prev) => {
            return {
                ...prev,
                ...data,
            };
        });
    };

    const handleReset = () => {
        reset();
    };
    return (
        <PageContent>
            <HookForm onSubmit={handleSubmit} {...methods}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormTextField name="marketMakerId" label="Market Maker (Now Business)" />
                    </Grid>

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
                </Grid>
            </HookForm>
        </PageContent>
    );
}
