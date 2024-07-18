import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "App/components";
import PageContent from "App/components/Container/PageContent";
import { TitleWrapper, Title, RenderField } from "App/components/Container";

import singleTransactionActions from "Private/features/b2b-transactions/singleTransactionActions";

export default function ViewBatchTransaction({ title }) {
    const dispatch = useDispatch();
    const { batchTransactionId } = useParams();

    const { response, loading } = useSelector((state) => state.get_single_transaction_by_id);

    useEffect(() => {
        dispatch(singleTransactionActions.get_single_transaction(batchTransactionId));
    }, []);

    return (
        <PageContent title="Batch Transaction">
            {loading ? (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            ) : (
                <Grid container rowSpacing={1}>
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Details</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Name" value={response?.data?.name} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Business Type" value={response?.data?.businessType} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Email" value={response?.data?.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Brand Name" value={response?.data?.brandName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Currency" value={response?.data?.currency} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Phone No" value={response?.data?.phoneNo} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Registered Country " value={response?.data?.registeredCountryName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField
                            label="Registered Country Extension "
                            value={response?.data?.registeredCountryPhoneExt}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Registered Date " value={response?.data?.registeredDate} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Registered Entity " value={response?.data?.registeredEntity} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Registeration No " value={response?.data?.registrationNo} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Status" value={response?.data?.status} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Website" value={response?.data?.website} />
                    </Grid>

                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Address Detail</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Address" value={response?.data?.address?.address} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="City" value={response?.data?.address?.city} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Country" value={response?.data?.address?.country} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Country Details" value={response?.data?.address?.countryDetails} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Post Code" value={response?.data?.address?.postCode} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="State" value={response?.data?.address?.state} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Street" value={response?.data?.address?.street} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Unit" value={response?.data?.address?.unit} />
                    </Grid>

                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Contact Person Detail</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Name" value={response?.data?.contactPersonName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Email" value={response?.data?.contactPersonEmail} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Phone Extension" value={response?.data?.contactPersonExtension} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Mobile Number" value={response?.data?.contactPersonMobileNumber} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RenderField label="Phone Number" value={response?.data?.contactPersonPhoneNumber} />
                    </Grid>
                </Grid>
            )}
        </PageContent>
    );
}
