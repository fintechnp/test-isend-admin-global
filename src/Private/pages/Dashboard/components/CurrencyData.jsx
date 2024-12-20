import React from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Paper from "App/components/Paper/Paper";
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

const CustomSwitch = styled((props) => <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />)(
    ({ theme }) => ({
        width: 30,
        height: 18,
        padding: 0,

        "& .MuiSwitch-switchBase": {
            padding: 0,
            margin: "4px",
            transitionDuration: "300ms",
            "&.Mui-checked": {
                transform: "translateX(12px)",
                color: "#fff",
                "& + .MuiSwitch-track": {
                    backgroundColor: theme.palette.primary.main,
                    opacity: 1,
                    border: 0,
                },
                "&.Mui-disabled + .MuiSwitch-track": {
                    opacity: 0.5,
                },
            },
            "&.Mui-focusVisible .MuiSwitch-thumb": {
                border: "6px solid #fff",
            },
            "&.Mui-disabled .MuiSwitch-thumb": {
                color: theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[600],
            },
            "&.Mui-disabled + .MuiSwitch-track": {
                opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
            },
        },
        "& .MuiSwitch-thumb": {
            boxSizing: "border-box",
            width: 10,
            height: 10,
        },

        "& .MuiSwitch-track": {
            borderRadius: 32 / 2,
            backgroundColor: "#C1C3C7",
            opacity: 1,
            transition: theme.transitions.create(["background-color"], {
                duration: 500,
            }),
        },
    }),
);

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
                    <Row alignItems="center" gap={1}>
                        <Typography fontSize={16}>SELL</Typography>
                        <CustomSwitch />
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
