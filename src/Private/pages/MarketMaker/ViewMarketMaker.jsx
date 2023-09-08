import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { CountryName } from "App/helpers";
import buildRoute from "App/helpers/buildRoute";
import Button from "App/components/Button/Button";
import routePaths from "Private/config/routePaths";
import { MarketMakerActions as actions } from "./store";
import PageContent from "App/components/Container/PageContent";
import { RenderField, Title, TitleWrapper } from "../Customers/CustomerDetails/CustomerDetails";
import MarketMakerKybListing from "Private/components/MarketMaker/MarketMakerKybListing";
import MarketMakerKycListing from "Private/components/MarketMaker/MarketMakerKycListing";
import BusinessTab from "Private/components/Business/BusinessTabs";

export default function ViewMarketMaker() {
    const dispatch = useDispatch();
    const { marketMakerId } = useParams();
    const navigate = useNavigate();

    const { response, loading } = useSelector((state) => state.get_market_maker_details);

    useEffect(() => {
        dispatch(actions.get_market_maker_details(marketMakerId));
    }, []);

    const tabData = [
        {
            id: 0,
            label: "KYB",
            element: <MarketMakerKybListing />,
        },
        {
            id: 1,
            label: "KYC",
            element: <MarketMakerKycListing />,
        },
    ];

    const marketMakerDetail = response && response?.data;
    return (
        <>
            <PageContent
                title="Market Maker Detais"
                topRightEndContent={
                    <Button
                        onClick={() => {
                            navigate(buildRoute(routePaths.agent.updateMarketMaker, marketMakerId));
                        }}
                    >
                        Update Market Maker
                    </Button>
                }
            >
                {loading ? (
                    <Title align="center">Fetching..</Title>
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
                                    label="Alowed Countries"
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
                                <RenderField label="Country" value={CountryName(marketMakerDetail?.address?.country)} />
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
                                        value={marketMakerDetail?.contactPerson?.designationId}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <RenderField label="Mobile No" value={marketMakerDetail?.contactPerson?.mobileNo} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <RenderField label="Phone No" value={marketMakerDetail?.contactPerson?.phoneNo} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <RenderField
                                        label="Extension"
                                        value={marketMakerDetail?.contactPerson?.extension}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    </>
                )}
            </PageContent>
            <PageContent>
                <BusinessTab tabsData={tabData} />
            </PageContent>
        </>
    );
}
