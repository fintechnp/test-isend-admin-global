import React from "react";
import Grid from "@mui/material/Grid";
import { useFormContext } from "react-hook-form";

import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import FormDateTimePicker from "App/core/hook-form/FormDateTimePicker";

const CampaignInformationForm = ({ isAddMode, campaignCodesOptions, countryData, campaignStatusOptions }) => {
    const { register, control } = useFormContext();

    return (
        <Grid container spacing="16px">
            {isAddMode && (
                <>
                    <Grid item xs={12} md={6} lg={3}>
                        <FormTextField name="Campaign.CampaignName" label="Campaign Name" control={control} />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <FormSelect
                            type="number"
                            name="Campaign.CampaignType"
                            label="Campaign Type"
                            options={campaignCodesOptions}
                            control={control}
                        />
                    </Grid>

                    <Grid item xs={12} md={6} lg={3}>
                        <FormSelect
                            type="number"
                            name="Campaign.ValidCountry"
                            label="Valid Country"
                            options={countryData}
                            control={control}
                        />
                    </Grid>
                </>
            )}

            <Grid item xs={12} md={6} lg={3}>
                <FormDateTimePicker name="Campaign.StartDate" label="Start Date Time" control={control} />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <FormDateTimePicker name="Campaign.EndDate" label="End Date Time" control={control} />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <FormTextField type="number" name="Campaign.Budget" label="Budget" control={control} />
            </Grid>

            <Grid item xs={12} md={6} lg={3}>
                <FormSelect name="Campaign.Status" label="Status" options={campaignStatusOptions} control={control} />
            </Grid>
        </Grid>
    );
};

export default CampaignInformationForm;
