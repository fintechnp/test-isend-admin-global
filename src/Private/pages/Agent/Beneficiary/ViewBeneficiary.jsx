import Grid from "@mui/material/Grid";
import { useParams } from "react-router";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "App/components";
import { ReferenceName } from "App/helpers";
import Spacer from "App/components/Spacer/Spacer";
import PageContent from "App/components/Container/PageContent";
import { RenderField, Title, TitleWrapper } from "App/components/Container";

import { beneficiaryActions as actions } from "./store";

export default function ViewBeneficiary() {
    const dispatch = useDispatch();
    const { beneficiaryId } = useParams();

    const { response, loading } = useSelector((state) => state.get_beneficiary_details);

    useEffect(() => {
        dispatch(actions.get_beneficiary_details(beneficiaryId));
    }, []);

    const beneficiaryData = response?.data;
    return (
        <PageContent title="View Beneficiary Details" documentTitle="View Beneficiary Details">
            {loading ? (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            ) : (
                <Grid container rowSpacing={1}>
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Beneficiary Details</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <RenderField label="Beneficiary Type" value={beneficiaryData?.beneficiary_type} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Related To" value={beneficiaryData?.related_to} />
                    </Grid>

                    {response?.data?.beneficiary_type_id === 1 && (
                        <>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="First Name" value={beneficiaryData?.first_name} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Middle Name" value={beneficiaryData?.middle_name} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Last Name" value={beneficiaryData?.last_name} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Gender" value={beneficiaryData?.gender} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Identity type" value={beneficiaryData?.identity_type} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Identity No" value={beneficiaryData?.identity_no} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField
                                    label="Identity issued date"
                                    value={beneficiaryData?.identity_issued_date}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField
                                    label="Identity expiry date"
                                    value={beneficiaryData?.identity_expiry_date}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField
                                    label="Identity issued country"
                                    value={beneficiaryData?.identity_issue_country}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Date of Birth" value={beneficiaryData?.date_of_birth} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Birth country" value={beneficiaryData?.birth_country} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Citizenship country" value={beneficiaryData?.citizenship_country} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Relation" value={beneficiaryData?.relation} />
                            </Grid>
                        </>
                    )}
                    {response?.data?.beneficiary_type_id === 2 && (
                        <>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Name" value={beneficiaryData?.name} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField
                                    label="Country of Registration"
                                    value={beneficiaryData?.registered_country}
                                />
                            </Grid>
                        </>
                    )}
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Currency" value={beneficiaryData?.currency} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Email" value={beneficiaryData?.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Mobile Number" value={beneficiaryData?.mobile_number} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Phone Number" value={beneficiaryData?.phone_number} />
                    </Grid>
                    <Spacer />
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Address Details</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Country" value={beneficiaryData?.address_country} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Post Code" value={beneficiaryData?.address_postcode} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Unit" value={beneficiaryData?.address_unit} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Street" value={beneficiaryData?.address_street} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="City" value={beneficiaryData?.address_city} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="State" value={beneficiaryData?.address_state} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Address" value={beneficiaryData?.address} />
                    </Grid>
                    <Spacer />

                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Payment Details</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Payment Type" value={ReferenceName(1, beneficiaryData?.payment_type_id)} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Delivery option" value={beneficiaryData?.delivery_option} />
                    </Grid>

                    {beneficiaryData?.payment_type_id === "B" && (
                        <>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Bank branch" value={beneficiaryData?.bank_branch} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Account number" value={beneficiaryData?.account_number} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Account Name" value={beneficiaryData?.account_name} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Branch identifier" value={beneficiaryData?.branch_identifier} />
                            </Grid>
                        </>
                    )}
                </Grid>
            )}
        </PageContent>
    );
}
