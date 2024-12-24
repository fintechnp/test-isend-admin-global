import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Paper from "App/components/Paper/Paper";
import Typography from "@mui/material/Typography";

import Row from "App/components/Row/Row";
import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
import { Button, Skeleton } from "@mui/material";

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

    const [checked, setChecked] = useState(true);

    const handleChange = (e) => {
        setChecked(e.target.checked);
    };

    const DUMMY_DATA = [
        {
            currency: "USD",
            buyRate: 133.86,
            sellRate: 133.4,
            drop: 1.2,
            isDropped: true,
        },
        {
            currency: "EUR",
            buyRate: 145.86,
            sellRate: 145.4,
            drop: 0.2,
            isDropped: false,
        },
        {
            currency: "GBP",
            buyRate: 170.86,
            sellRate: 170.4,
            drop: 2.2,
            isDropped: true,
        },
        {
            currency: "CHD",
            buyRate: 150.19,
            sellRate: 150.4,
            drop: 1.2,
            isDropped: false,
        },
        {
            currency: "AUD",
            buyRate: 88.92,
            sellRate: 88.42,
            drop: 1.2,
            isDropped: true,
        },
        {
            currency: "CAD",
            buyRate: 97.78,
            sellRate: 97.4,
            drop: 1.2,
            isDropped: false,
        },
        {
            currency: "CAD",
            buyRate: 97.78,
            sellRate: 97.4,
            drop: 1.2,
            isDropped: false,
        },
    ];

    const isLoading = false;

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

                        <CustomSwitch checked={checked} onChange={handleChange} />
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
                                <>
                                    {isLoading ? (
                                        <Skeleton variant="text" width={100} height="100%" />
                                    ) : (
                                        <>
                                            <BoldText>{data.currency}</BoldText>
                                            <BoldText>{checked ? data.buyRate : data.sellRate}</BoldText>
                                            <BoldText
                                                sx={data.isDropped ? { color: "red" } : { color: "green" }}
                                            >{`(${data.drop})`}</BoldText>
                                        </>
                                    )}
                                </>
                            </Row>
                        );
                    })}
                </Row>
            </Row>
        </Container>
    );
}
