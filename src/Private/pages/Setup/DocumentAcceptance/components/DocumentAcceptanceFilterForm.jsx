import { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { useForm } from "react-hook-form";
import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import PageContent from "App/components/Container/PageContent";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

import { documentForOptions } from "../data/documentFor";

export default function DocumentAcceptanceFilterForm({ setFilterSchema, loading, handleReset }) {
    const methods = useForm();

    const { handleSubmit, reset, watch } = methods;

    const countriesList = JSON.parse(localStorage.getItem("country"));
    const finalCountriesList = countriesList.map((country) => ({
        label: country.country,
        value: country.iso3,
    }));

    const selectedCountry = watch("country");

    const documentFor = watch("document_for");

    useEffect(() => {
        if (selectedCountry) {
            setFilterSchema((prev) => ({ ...prev, country: selectedCountry, document_for: documentFor }));
        }
    }, [selectedCountry, documentFor, setFilterSchema]);

    const handleFormReset = () => {
        reset();
        handleReset();
    };

    return (
        <PageContent>
            <HookForm onSubmit={handleSubmit} {...methods}>
                <Grid container direction="row" spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="country" label="Country" options={finalCountriesList} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormSelect name="document_for" label="Document For" options={documentForOptions} />
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
                                <Button
                                    color="error"
                                    size="small"
                                    variant="contained"
                                    onClick={handleFormReset}
                                    disabled={loading}
                                >
                                    Reset
                                </Button>
                            </Grid>
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            </HookForm>
        </PageContent>
    );
}
