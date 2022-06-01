import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import {
    CurrencyName,
    CountryName,
    FormatDate,
    FormatNumber,
} from "./../../../../App/helpers";

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

function Details({ data }) {
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
                    <Header>Transaction Details</Header>
                    <Divider />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Grid
                    container
                    columnSpacing={2}
                    rowSpacing={1}
                    sx={{ paddingBottom: "8px" }}
                >
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Transaction Id:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.tid ? data?.tid : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Pin Number:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.pin_number ? data?.pin_number : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Sending Partner:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.agent_name ? data?.agent_name : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Payout Partner:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.payout_agent_name
                                    ? data?.payout_agent_name
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Sender Country:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.sending_country
                                    ? CountryName(data?.sending_country)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Payout Country:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.payout_country
                                    ? CountryName(data?.payout_country)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Payout Currency:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.payout_currency
                                    ? CurrencyName(data?.payout_currency)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Customer Name:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.customer_name
                                    ? data?.customer_name
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Beneficiary Name:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.beneficiary_name
                                    ? data?.beneficiary_name
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Rate:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.customer_rate
                                    ? FormatNumber(data?.customer_rate)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Sending Amount:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.transfer_amount
                                    ? FormatNumber(data?.transfer_amount)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Payout Amount:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.payout_amount
                                    ? data?.payout_amount
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Payout Location:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.payout_location_name
                                    ? FormatNumber(data?.payout_location_name)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Created Date:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.created_ts
                                    ? FormatDate(data?.created_ts)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default React.memo(Details);
