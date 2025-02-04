import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import Paper from "App/components/Paper/Paper";
import React from "react";

const Container = styled(Paper)(({ theme }) => ({}));

const OverallReportHeading = () => {
    return (
        <Container>
            <Typography align="center" fontWeight={700} fontSize={16}>
                Overall report
            </Typography>
        </Container>
    );
};

export default OverallReportHeading;
