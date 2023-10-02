import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import Button from "App/components/Button/Button";
import routePaths from "Private/config/routePaths";
import PageContent from "App/components/Container/PageContent";
import MarketMakerKybListing from "Private/components/MarketMaker/MarketMakerKybListing";
import MarketMakerKycListing from "Private/components/MarketMaker/MarketMakerKycListing";
import { RenderField, Title, TitleWrapper } from "../Customers/CustomerDetails/CustomerDetails";

import Tabs from "App/components/Tab/Tabs";
import buildRoute from "App/helpers/buildRoute";
import { MarketMakerActions as actions } from "./store";
import referenceTypeId from "Private/config/referenceTypeId";
import { CountryNameById, ReferenceNameByDataId } from "App/helpers";
import Spacer from "App/components/Spacer/Spacer";
import { Loading } from "App/components";
import { Box, Typography } from "@mui/material";
import MarketMakerUserKycListing from "Private/components/MarketMaker/MarketMakerUserKycListing";

export default function ViewMarketMaker() {
    const dispatch = useDispatch();
    const { marketMakerId } = useParams();
    const navigate = useNavigate();

    const { response, loading } = useSelector((state) => state.get_market_maker_details);

    useEffect(() => {
        dispatch(actions.get_market_maker_details(marketMakerId));
    }, []);

    const tabs = [
        {
            key: "user",
            tabName: "User",
            tabContent: <MarketMakerUserKycListing userData={response?.data?.user ?? {}} loading={loading} />,
        },
        {
            key: "kyB",
            tabName: "KYB",
            tabContent: <MarketMakerKybListing />,
        },
        {
            key: "kyc",
            tabName: "KYC",
            tabContent: <MarketMakerKycListing />,
        },
    ];

    const marketMakerDetail = response && response?.data;
    return (
        <PageContent
            title="Agent Details"
            topRightEndContent={
                <Button
                    onClick={() => {
                        navigate(buildRoute(routePaths.agent.updateMarketMaker, marketMakerId));
                    }}
                >
                    Edit Agent
                </Button>
            }
        >
            {loading ? (
                <Loading loading />
            ) : (
                <>
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Basic Information</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid container spacing={1} mt={2}>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Name" value={marketMakerDetail?.name} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <RenderField label="Email" value={marketMakerDetail?.email} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Brand Name" value={marketMakerDetail?.brandName} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Registration No" value={marketMakerDetail?.registrationNo} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField
                                label="Registration Country"
                                value={CountryNameById(marketMakerDetail?.registeredCountryId)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Contact No" value={marketMakerDetail?.contactNo} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Website" value={marketMakerDetail?.website} />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <RenderField label="Registered Date" value={marketMakerDetail?.registeredDate} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Currency" value={marketMakerDetail?.currencyId} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField
                                label="Allowed Countries"
                                value={marketMakerDetail?.allowedCountries
                                    ?.map((item) => item?.countryName)
                                    ?.join(", ")}
                            />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} mt={2}>
                        <TitleWrapper>
                            <Title>Address Information</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Grid container spacing={1} mt={2}>
                        <Grid item xs={12} sm={6}>
                            <RenderField
                                label="Country"
                                value={CountryNameById(marketMakerDetail?.address?.countryId)}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Post Code" value={marketMakerDetail?.address?.postCode} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Unit" value={marketMakerDetail?.address?.unit} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Street" value={marketMakerDetail?.address?.street} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="City" value={marketMakerDetail?.address?.city} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="State" value={marketMakerDetail?.address?.state} />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <RenderField label="Address" value={marketMakerDetail?.address?.address} />
                        </Grid>
                    </Grid>
                    <Grid item xs={12} mt={3}>
                        <TitleWrapper>
                            <Title>Contact Person Information</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                        <Grid container spacing={1} mt={2}>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="name" value={marketMakerDetail?.contactPerson?.name} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField
                                    label="Designation"
                                    value={ReferenceNameByDataId(
                                        referenceTypeId.designations,
                                        marketMakerDetail?.contactPerson?.designationId,
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Extension" value={marketMakerDetail?.contactPerson?.extension} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Mobile No" value={marketMakerDetail?.contactPerson?.mobileNo} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <RenderField label="Phone No" value={marketMakerDetail?.contactPerson?.phoneNo} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Title>Documents</Title>
                            <Divider sx={{ flexGrow: 1, ml: 1 }} />
                        </TitleWrapper>
                    </Grid>
                    <Spacer />
                    <Grid container spacing={2}>
                        {marketMakerDetail?.documents?.map((item, i) => {
                            return (
                                <Grid item xs={4} key={i}>
                                    <Typography>{item?.documentName}</Typography>
                                    <a href={item?.documentLink} target="_blank">
                                        <img
                                            src={item?.documentLink}
                                            alt={item?.documentName}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                            }}
                                        />
                                    </a>
                                </Grid>
                            );
                        })}
                    </Grid>
                </>
            )}
            <Spacer />
            <Box mt={2}>
                <Tabs tabs={tabs} />
            </Box>
        </PageContent>
    );
}
