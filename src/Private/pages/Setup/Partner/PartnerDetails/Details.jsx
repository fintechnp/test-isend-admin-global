import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import { CurrencyName, CountryName, FormatDate, FormatNumber } from "./../../../../../App/helpers";

const Header = styled(Box)(({ theme }) => ({
    paddingBottom: "4px",
    fontSize: "17px",
    fontWeight: 500,
    color: theme.palette.primary.main,
}));

const InfoWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
}));

const LabelWrapper = styled(Box)(({ theme }) => ({
    opacitLy: 0.9,
    minWidth: "30%",
    fontSize: "15px",
    wordBreak: "break-all",
    color: theme.palette.text.dark,
}));

const ValueWrapper = styled(Box)(({ theme }) => ({
    opacitLy: 0.8,
    paddingLeft: "8px",
    fontSize: "15px",
    wordBreak: "break-all",
    color: theme.palette.text.main,
}));

function PartnerDetails({ data }) {
    return (
        <Grid
            container
            rowSpacing={1}
            sx={{
                padding: "6px 16px",
                margin: 0,
                backgroundColor: "background.main",
            }}
        >
            <Grid item xs={12}>
                <Box>
                    <Header>Basic Information</Header>
                    <Divider />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Grid container columnSpacing={2} rowSpacing={1} sx={{ paddingBottom: "8px" }}>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Partner Name:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.name ? data?.name : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Short Code:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.short_code ? data?.short_code : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Partner Type:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.agent_type ? data?.agent_type : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Phone Number:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.phone_number ? data?.phone_number : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Email:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.email ? data?.email : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Country:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.country ? CountryName(data?.country) : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Post Code:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.postcode ? data?.postcode : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Unit:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.unit ? data?.unit : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Street:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.street ? data?.street : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>City:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.city ? data?.city : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>{" "}
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>State:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.state ? data?.state : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Address:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.address ? data?.address : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Website:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.website ? data?.website : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Header>Contact Person</Header>
                    <Divider />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Grid container columnSpacing={2} rowSpacing={1} sx={{ paddingBottom: "8px" }}>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Fullname:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.contact_person_full_name ? data?.contact_person_full_name : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Post:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.contact_person_post ? data?.contact_person_post : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Mobile Number:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.contact_person_mobile ? data?.contact_person_mobile : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Email:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.contact_person_email ? data?.contact_person_email : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <Header>Business Information</Header>
                    <Divider />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Grid container columnSpacing={2} rowSpacing={1} sx={{ paddingBottom: "8px" }}>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Incorporation Date:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.date_of_incorporation ? FormatDate(data?.date_of_incorporation) : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Business License Number:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.business_license_number ? data?.business_license_number : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>License Exp. Date:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.business_license_expiry_date
                                    ? FormatDate(data?.business_license_expiry_date)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Balance:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.balance ? FormatNumber(data?.balance) : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Credit Limit:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.credit_limit ? data?.credit_limit : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Transaction Currency:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.transaction_currency ? CurrencyName(data?.transaction_currency) : "N/A"}
                                {data?.transaction_currency && `[${data?.transaction_currency}]`}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Settlement Currency:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.settlement_currency ? CurrencyName(data?.settlement_currency) : "N/A"}
                                {data?.settlement_currency && `[${data?.settlement_currency}]`}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Tax Type:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.tax_type ? data?.tax_type : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Date Format:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.date_format ? data?.date_format : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Time Zone:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.time_zone ? data?.time_zone : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Transaction Limit:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.transaction_limit ? data?.transaction_limit : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Commission Currency:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.commission_currency ? CurrencyName(data?.commission_currency) : "N/A"}
                                {data?.commission_currency && `[${data?.commission_currency}]`}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Bank Charge Currency:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.bank_charge_currency ? CurrencyName(data?.bank_charge_currency) : "N/A"}
                                {data?.bank_charge_currency && `[${data?.bank_charge_currency}]`}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Is Prefunding?:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.is_prefunding ? "Yes" : "No"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default React.memo(PartnerDetails);
