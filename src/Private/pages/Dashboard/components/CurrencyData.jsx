import React from "react";
import { Paper } from "@mui/material";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Row from "App/components/Row/Row";
import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";

const DUMMY_DATA = [
    {
        currency: "USD",
        rate: 133.86,
        drop: 1.2,
        isDropped: true,
    },
    {
        currency: "EUR",
        rate: 145.86,
        drop: 0.2,
        isDropped: false,
    },
    {
        currency: "GBP",
        rate: 170.86,
        drop: 2.2,
        isDropped: true,
    },
    {
        currency: "CHD",
        rate: 150.19,
        drop: 1.2,
        isDropped: false,
    },
    {
        currency: "AUD",
        rate: 88.92,
        drop: 1.2,
        isDropped: true,
    },
    {
        currency: "CAD",
        rate: 97.78,
        drop: 1.2,
        isDropped: false,
    },
    {
        currency: "CAD",
        rate: 97.78,
        drop: 1.2,
        isDropped: false,
    },
];

const Container = styled(Paper)(({ theme }) => ({
    padding: "16px",
}));

const BoldText = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: 16,
}));

export default function DashboardCurrencyData() {
    const todayDate = dateUtils.getFormattedDate(new Date());
    return (
        <Container>
            <Row gap={2}>
                <Column
                    sx={(theme) => ({
                        width: "fit-content",
                        padding: "0px 16px 0px 0px",
                        borderRight: `1px solid ${theme.palette.divider}`,
                    })}
                >
                    <Typography fontWeight={600}>As of {todayDate}</Typography>
                    <Row alignItems="center">
                        <Typography fontSize={16}>SELL</Typography>
                        <Switch />
                        <Typography fontSize={16}>BUY</Typography>
                    </Row>
                </Column>
                <Row
                    flex={1}
                    alignItems="center"
                    gap={"17px"}
                    sx={{
                        overflowX: "auto",
                    }}
                >
                    {DUMMY_DATA.map((data, index) => {
                        return (
                            <Row key={data.currency} gap={"2px"}>
                                <BoldText>{data.currency}</BoldText>
                                <BoldText>{data.rate}</BoldText>
                                <BoldText
                                    sx={data.isDropped ? { color: "red" } : { color: "green" }}
                                >{`(${data.drop})`}</BoldText>
                            </Row>
                        );
                    })}
                </Row>
            </Row>
        </Container>
    );
}
