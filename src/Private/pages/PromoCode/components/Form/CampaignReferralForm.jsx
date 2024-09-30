import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { useFormContext } from "react-hook-form";
import Typography from "@mui/material/Typography";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

import FormSelect from "App/core/hook-form/FormSelect";
import FormTextField from "App/core/hook-form/FormTextField";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";

const CampaignReferralForm = ({ triggerReferrerFields, addtriggerReferrerFields, removetriggerReferrerFields }) => {
    const { control } = useFormContext();

    return (
        <>
            <Grid marginTop={3} marginBottom={2} item xs={12}>
                <Typography variant="h6">Trigger Configuration</Typography>
            </Grid>
            {triggerReferrerFields.map((field, index) => (
                <React.Fragment key={`${field.id}_field`}>
                    {/* Referrer Section */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} lg={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body2" fontSize={14} fontWeight={500}>
                                        Referrer
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormSelect
                                        required
                                        label="Referrer Need KYC?"
                                        name={`ReferralFamilyCondition.${index}.referrerneedkyc`}
                                        options={[
                                            { value: true, label: "True" },
                                            { value: false, label: "False" },
                                        ]}
                                        control={control}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormTextField
                                        required
                                        type="number"
                                        label="Referrer Least Transactions"
                                        name={`ReferralFamilyCondition.${index}.referrerleasttransactions`}
                                        control={control}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormTextField
                                        required
                                        type="number"
                                        label="Minimum Referee"
                                        name={`ReferralFamilyCondition.${index}.minimumreferrer`}
                                        control={control}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>

                        <Grid item xs={12} lg={6}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="body2" fontSize={14} fontWeight={500}>
                                        Referee
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <FormSelect
                                        required
                                        label="Referee Need KYC?"
                                        name={`ReferralFamilyCondition.${index}.refereeneedkyc`}
                                        options={[
                                            { value: true, label: "True" },
                                            { value: false, label: "False" },
                                        ]}
                                        control={control}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <FormTextField
                                        required
                                        type="number"
                                        label="Referee Least Transactions"
                                        name={`ReferralFamilyCondition.${index}.refereeleasttransactions`}
                                        control={control}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <FormTextField
                                        required
                                        type="number"
                                        label="KYC Verifying Days"
                                        name={`ReferralFamilyCondition.${index}.kycverifyingdays`}
                                        control={control}
                                    />
                                </Grid>
                            </Grid>
                            {/* <Grid item xs={1}>
                                    <Divider orientation="vertical"  />
                                </Grid> */}
                        </Grid>
                    </Grid>
                </React.Fragment>
            ))}
        </>
    );
};

export default CampaignReferralForm;
