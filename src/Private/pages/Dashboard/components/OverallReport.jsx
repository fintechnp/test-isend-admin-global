import React from "react";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

import Column from "App/components/Column/Column";
import ComplianceData from "./ComplianceData";
import OverallTransactionAndCustomer from "./OverallTransactionAndCustomer";

const Container = styled(Paper)(({ theme }) => ({
    padding: "16px",
}));

export default function OverallReport() {
    return (
        <Column gap={2}>
            <Container>
                <OverallTransactionAndCustomer />
            </Container>
            <Container>
                <ComplianceData />
            </Container>
        </Column>
    );
}
