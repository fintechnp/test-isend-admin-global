import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Loading } from "App/components";
import PageContent from "App/components/Container/PageContent";
import BusinessTab from "Private/components/Business/BusinessTabs";
import BusinessKycListing from "Private/components/Business/BusinessKycListing";
import BusinessKybListing from "Private/components/Business/BusinessKybListing";
import { TitleWrapper, Title, RenderField } from "App/components/Container";

import { businessActions } from "./store";

export default function ViewBusiness({ title }) {
    const dispatch = useDispatch();
    const { businessId } = useParams();

    const { response, loading } = useSelector((state) => state.get_business_details);

    useEffect(() => {
        dispatch(businessActions.get_business_details(businessId));
    }, []);

    const tabData = [
        {
            id: 0,
            label: "KYB",
            element: <BusinessKybListing />,
        },
        {
            id: 1,
            label: "KYC",
            element: <BusinessKycListing />,
        },
    ];
    return (
        <>
            <PageContent title={title || "View Business Detail"}>
                {loading ? (
                    <Grid item xs={12}>
                        <Loading loading={loading} />
                    </Grid>
                ) : (
                    <Grid container rowSpacing={1}>
                        <Grid item xs={12}>
                            <TitleWrapper>
                                <Title>Detail</Title>
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
            <PageContent>
                <BusinessTab tabsData={tabData} />
            </PageContent>
        </>
    );
}
