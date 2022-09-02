import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";

import {
    Mode,
    CurrencyName,
    CountryName,
    FormatNumber,
    ReferenceName,
} from "./../../../../../App/helpers";

const InfoWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
}));

const LabelWrapper = styled(Box)(({ theme }) => ({
    opacitLy: 0.9,
    minWidth: "32%",
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

function ServiceDetails({ data }) {
    return (
        <Grid
            container
            rowSpacing={1}
            sx={{
                padding: "6px 12px",
                marginTop: "4px",
                backgroundColor: "background.main",
            }}
        >
            <Grid item xs={12}>
                <Grid
                    container
                    columnSpacing={2}
                    rowSpacing={1}
                    sx={{ paddingBottom: "8px" }}
                >
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
                            <LabelWrapper>Receiving Country:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.receiving_country
                                    ? CountryName(data?.receiving_country)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Receiving Currency:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.receiving_currency
                                    ? CurrencyName(data?.receiving_currency)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Payment Type:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.payment_type
                                    ? ReferenceName(1, data?.payment_type)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Minimum Amount:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.min_amount
                                    ? FormatNumber(data?.min_amount)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Maximum Amount:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.max_amount
                                    ? FormatNumber(data?.max_amount)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Customer Type:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.customer_type
                                    ? ReferenceName(37, data?.customer_type)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Charge Mode:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.charge_mode
                                    ? Mode(data?.charge_mode)
                                    : "0"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Charge Flat:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.charge_flat ? data?.charge_flat : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Charge Percentage:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.charge_per ? data?.charge_per : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>{" "}
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Additional Fee:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.additional_fee
                                    ? data?.additional_fee
                                    : "0.00"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Send Commission Type:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.send_commission_type
                                    ? Mode(data?.send_commission_type)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Send Commission Amount:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.send_commission_amount
                                    ? data?.send_commission_amount
                                    : "0.00"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Pay Commission Type:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.pay_commission_type
                                    ? Mode(data?.pay_commission_type)
                                    : "N/A"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Pay Commission Amount:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.pay_commission_amount
                                    ? data?.pay_commission_amount
                                    : "0.00"}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InfoWrapper>
                            <LabelWrapper>Is enabled?:</LabelWrapper>
                            <ValueWrapper sx={{ wordBreak: "break-all" }}>
                                {data?.is_active ? (
                                    <Tooltip
                                        title="Service charge enabled."
                                        arrow
                                    >
                                        <CheckCircleOutlineIcon
                                            fontSize="small"
                                            sx={{ color: "success.main" }}
                                        />
                                    </Tooltip>
                                ) : (
                                    <Tooltip
                                        title="Service charge disabled."
                                        arrow
                                    >
                                        <DoNotDisturbOnIcon
                                            fontSize="small"
                                            sx={{ color: "warning.main" }}
                                        />
                                    </Tooltip>
                                )}
                            </ValueWrapper>
                        </InfoWrapper>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default React.memo(ServiceDetails);
