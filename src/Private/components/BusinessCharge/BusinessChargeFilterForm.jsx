import { Box, Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import HookForm from "App/core/hook-form/HookForm";
import { relatedToEnum } from "./BusinessChargeForm";
import apiEndpoints from "Private/config/apiEndpoints";
import FormSelect from "App/core/hook-form/FormSelect";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import PageContent from "App/components/Container/PageContent";
import { ResetButton, SearchButton } from "../AllButtons/Buttons";
import FormSearchAutoComplete from "App/core/hook-form/FormSearchAutocomplete";

const relatedToOptions = [
    {
        label: "Business",
        value: "business",
    },
    {
        label: "MarketMaker",
        value: "marketmaker",
    },
];

export default function FilterForm({ setFilterSchema }) {
    const methods = useForm();
    const dispatch = useDispatch();

    const { reset, watch } = methods;

    const relatedTo = watch("RelatedTo");

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
                        <FormSelect name="RelatedTo" options={relatedToOptions ?? []} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                display: relatedTo === relatedToEnum.business ? "block" : "none",
                            }}
                        >
                            <FormSearchAutoComplete
                                name="relatedId"
                                label="Business Id"
                                apiEndpoint={apiEndpoints.business.getAll}
                                paramkey="BusinessName"
                                valueKey="businessId"
                                labelKey="name"
                            />
                        </Box>
                        <Box
                            sx={{
                                display: relatedTo === relatedToEnum.marketmaker ? "block" : "none",
                            }}
                        >
                            <FormSearchAutoComplete
                                name="relatedId"
                                label="Agent"
                                apiEndpoint={apiEndpoints.marketMaker.getAll}
                                paramkey="Name"
                                valueKey="marketMakerId"
                                labelKey="name"
                                pageNumberQueryKey="Page"
                            />
                        </Box>
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
