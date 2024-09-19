import React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { useFormContext } from "react-hook-form";
import Typography from "@mui/material/Typography";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

const CampaignReferralForm = ({ triggerReferrerFields, addtriggerReferrerFields, removetriggerReferrerFields }) => {
    const { control } = useFormContext();

    return (
        <Grid container spacing={2}>
            <Grid marginTop={3} marginBottom={2} item xs={12}>
                <Typography variant="h6">Trigger Configuration</Typography>
            </Grid>
            {triggerReferrerFields.map((field, index) => (
                <Grid container spacing={2} item key={`${field.id}_field`}>
                    <Grid item xs={12} md={6} lg={3}>
                        <FormSelect
                            label="Referrer Need KYC?"
                            name={`ReferralFamilyCondition.${index}.referrerneedkyc`}
                            options={[
                                { value: true, label: "True" },
                                { value: false, label: "False" },
                            ]}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <FormTextField
                            type="number"
                            label="Referrer Least Transactions"
                            name={`ReferralFamilyCondition.${index}.referrerleasttransactions`}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <FormSelect
                            label="Referee Need KYC?"
                            name={`ReferralFamilyCondition.${index}.refereeneedkyc`}
                            options={[
                                { value: true, label: "True" },
                                { value: false, label: "False" },
                            ]}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <FormTextField
                            type="number"
                            label="Referee Least Transactions"
                            name={`ReferralFamilyCondition.${index}.refereeleasttransactions`}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <FormTextField
                            type="number"
                            label="Minimum Referrer"
                            name={`ReferralFamilyCondition.${index}.minimumreferrer`}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12} md={6} lg={3}>
                        <FormTextField
                            type="number"
                            label="KYC Verifying Days"
                            name={`ReferralFamilyCondition.${index}.kycverifyingdays`}
                            control={control}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonWrapper>
                            <Button
                                variant="contained"
                                size="small"
                                onClick={() => {
                                    addtriggerReferrerFields({
                                        referrerneedkyc: "",
                                        referrerleasttransactions: 0,
                                        refereeneedkyc: "",
                                        refereeleasttransactions: 0,
                                        minimumreferrer: 0,
                                        kycverifyingdays: 0,
                                    });
                                }}
                            >
                                Add Condition
                            </Button>
                            {index > 0 ? (
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="error"
                                    onClick={() => removetriggerReferrerFields(index)}
                                >
                                    <ClearOutlinedIcon />
                                </Button>
                            ) : (
                                <Button variant="contained" size="small" color="error" disabled>
                                    <ClearOutlinedIcon />
                                </Button>
                            )}
                        </ButtonWrapper>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

export default CampaignReferralForm;
