import React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { FormatDate, ReferenceName } from "./../../../../../App/helpers";
import { Typography } from "@mui/material";

const Container = styled(Grid)(({ theme }) => ({
    backgroundColor: theme.palette.background.main,
    padding: "6px 16px",
    margin: 0,
}));

const LoadContainer = styled(Grid)(({ theme }) => ({
    height: "100%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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

const EmailBody = styled(Box)(({ theme }) => ({
    width: "100%",
    opacitLy: 0.8,
    padding: "8px",
    fontSize: "15px",
    marginBottom: "8px",
    wordBreak: "break-all",
    color: theme.palette.text.main,
    background: theme.palette.background.light,
}));

function Details({ data, loading }) {
    if (loading) {
        return (
            <LoadContainer>
                <Typography>Loading...</Typography>
            </LoadContainer>
        );
    }

    return (
        <Container container rowSpacing={1}>
            <Grid item xs={12}>
                <InfoWrapper>
                    <LabelWrapper>Sender:</LabelWrapper>
                    <ValueWrapper sx={{ wordBreak: "break-all" }}>
                        {data?.email_by ? data?.email_by : "N/A"}
                    </ValueWrapper>
                </InfoWrapper>
            </Grid>
            <Grid item xs={12}>
                <InfoWrapper>
                    <LabelWrapper>To:</LabelWrapper>
                    <ValueWrapper sx={{ wordBreak: "break-all" }}>
                        {data?.email_to ? data?.email_to : "N/A"}
                    </ValueWrapper>
                </InfoWrapper>
            </Grid>
            {data?.email_cc && (
                <Grid item xs={12}>
                    <InfoWrapper>
                        <LabelWrapper>CC:</LabelWrapper>
                        <ValueWrapper sx={{ wordBreak: "break-all" }}>
                            {data?.email_cc ? data?.email_cc : "N/A"}
                        </ValueWrapper>
                    </InfoWrapper>
                </Grid>
            )}
            {data?.email_bcc && (
                <Grid item xs={12}>
                    <InfoWrapper>
                        <LabelWrapper>BCC:</LabelWrapper>
                        <ValueWrapper sx={{ wordBreak: "break-all" }}>
                            {data?.email_bcc ? data?.email_bcc : "N/A"}
                        </ValueWrapper>
                    </InfoWrapper>
                </Grid>
            )}
            <Grid item xs={12}>
                <InfoWrapper>
                    <LabelWrapper>Subject:</LabelWrapper>
                    <ValueWrapper sx={{ wordBreak: "break-all" }}>
                        {data?.email_subject ? data?.email_subject : "N/A"}
                    </ValueWrapper>
                </InfoWrapper>
            </Grid>
            <Grid item xs={12}>
                <InfoWrapper>
                    <LabelWrapper>Created:</LabelWrapper>
                    <ValueWrapper sx={{ wordBreak: "break-all" }}>
                        {data?.created_ts
                            ? FormatDate(data?.created_ts)
                            : "N/A"}
                    </ValueWrapper>
                </InfoWrapper>
            </Grid>
            <Grid item xs={12}>
                <InfoWrapper>
                    <LabelWrapper>Status:</LabelWrapper>
                    <ValueWrapper sx={{ wordBreak: "break-all" }}>
                        {data?.status ? ReferenceName(88, data?.status) : "N/A"}
                    </ValueWrapper>
                </InfoWrapper>
            </Grid>
            <Grid item xs={12}>
                <InfoWrapper>
                    <LabelWrapper>Body:</LabelWrapper>
                    <EmailBody
                        sx={{ wordBreak: "break-all" }}
                        dangerouslySetInnerHTML={{ __html: data?.email_body }}
                    />
                </InfoWrapper>
            </Grid>
        </Container>
    );
}

export default React.memo(Details);
