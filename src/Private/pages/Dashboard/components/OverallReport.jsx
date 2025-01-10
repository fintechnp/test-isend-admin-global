import React from "react";
import { styled } from "@mui/material/styles";

import Paper from "App/components/Paper/Paper";
import Column from "App/components/Column/Column";

import ComplianceData from "./ComplianceData";
import OverallTransactionAndCustomer from "./OverallTransactionAndCustomer";

const Container = styled(Paper)(({ theme }) => ({
    padding: "16px",
}));

export default function OverallReport() {
    return (
        <Column gap={2}>
            {/* <OverallTransactionAndCustomer />
            <ComplianceData /> */}
        </Column>
    );
}
