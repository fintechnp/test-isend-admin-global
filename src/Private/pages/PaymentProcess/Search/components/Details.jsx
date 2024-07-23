import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";

import HasPermission from "Private/components/shared/HasPermission";

import { permissions } from "Private/data/permissions";
import { CurrencyName, CountryName, FormatDate, FormatNumber } from "App/helpers";

const Container = styled(Grid)(({ theme }) => ({
    padding: "6px 16px",
    margin: 0,
    borderRadius: "4px",
    backgroundColor: theme.palette.background.light,
    border: `1px solid ${theme.palette.border.main}`,
}));

const Header = styled(Box)(({ theme }) => ({
    paddingBottom: "4px",
    fontSize: "18px",
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

const RefundButton = styled(Button)(({ theme }) => ({
    minWidth: "200px",
    borderRadius: "2px",
    marginTop: "8px",
    textTransform: "capitalize",
    color: theme.palette.warning.dark,
    borderColor: theme.palette.warning.main,
    "&:hover": {
        color: theme.palette.warning.main,
        borderColor: theme.palette.warning.dark,
    },
}));

const BlockButton = styled(Button)(({ theme }) => ({
    minWidth: "200px",
    borderRadius: "2px",
    marginTop: "8px",
    marginLeft: "8px",
    textTransform: "capitalize",
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    "&:hover": {
        color: theme.palette.primary.dark,
        borderColor: theme.palette.primary.dark,
    },
}));

function Details({ data, handleBlockOrCancel }) {
    return (
        <Container container rowSpacing={1}>
            <Grid item xs={12}>
                <Box>
                    <Header>Transaction Details</Header>
                    <Divider />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Grid container columnSpacing={2} rowSpacing={1} sx={{ paddingBottom: "8px" }}>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Transaction Id:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>{data?.tid ? data?.tid : "N/A"}</ValueWrapper>
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
                                {data?.payout_agent_name ? data?.payout_agent_name : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Sender Country:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.send_country ? CountryName(data?.send_country) : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Payout Country:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.payout_country ? CountryName(data?.payout_country) : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Payout Currency:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.payout_currency ? CurrencyName(data?.payout_currency) : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Customer Name:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.customer_name ? data?.customer_name : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Beneficiary Name:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.beneficiary_name ? data?.beneficiary_name : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Rate:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.customer_rate ? FormatNumber(data?.customer_rate) : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Sending Amount:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.transfer_amount ? FormatNumber(data?.transfer_amount) : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Payout Amount:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.payout_amount ? FormatNumber(data?.payout_amount) : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Payout Location:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.payout_location_name ? data?.payout_location_name : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Created Date:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.created_ts ? FormatDate(data?.created_ts) : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" sx={{ pb: 1, pt: 0.5, ml: 0 }}>
                    <HasPermission permission={permissions.REFUND_TRANSACTION}>
                        <RefundButton variant="outlined" onClick={() => handleBlockOrCancel("cancel")}>
                            Refund this transaction
                        </RefundButton>
                    </HasPermission>
                    <HasPermission permission={permissions.BLOCK_TRANSACTION}>
                        <BlockButton variant="outlined" onClick={() => handleBlockOrCancel("block")}>
                            Block this transaction
                        </BlockButton>
                    </HasPermission>
                </Box>
            </Grid>
        </Container>
    );
}

export default React.memo(Details);
