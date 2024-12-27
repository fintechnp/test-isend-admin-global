import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Paper from "App/components/Paper/Paper";
import Typography from "@mui/material/Typography";

import Row from "App/components/Row/Row";
import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
import { useDispatch, useSelector } from "react-redux";
import useListFilterStore from "App/hooks/useListFilterStore";
import { ExchangeRateAction } from "Private/pages/Setup/ExchangeRate/store";
import CurrencyForm from "./form/CurrencyForm";
import { FormProvider, useForm } from "react-hook-form";
import { Box, Grid } from "@mui/material";
import FormSelect from "App/core/hook-form/FormSelect";
import { DashboardAction } from "../store";
import { useTheme } from "@emotion/react";

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

const initialState = {
    page_number: 1,
    page_size: 100,
};

export default function DashboardCurrencyData() {
    const dispatch = useDispatch();
    const todayDate = dateUtils.getFormattedDate(new Date());
    const [checked, setChecked] = useState(true);
    const theme = useTheme();

    const methods = useForm({});

    const { watch } = methods;

    const sendingAgentValue = watch("agent_name");

    const { response: exchangeRateResponse, loading: g_loading } = useSelector((state) => state.get_all_exchange_rate);

    const { filterSchema } = useListFilterStore({ initialState });

    const { response: dashboardExchangeRateSummary, loading: isLoading } = useSelector(
        (state) => state.get_exchange_rate_summary,
    );

    useEffect(() => {
        dispatch(
            DashboardAction.get_exchange_rate_summary({
                id: sendingAgentValue,
            }),
        );
    }, [dispatch, sendingAgentValue]);

    useEffect(() => {
        dispatch(ExchangeRateAction.get_all_exchange_rate(filterSchema));
    }, [dispatch, filterSchema]);

    const agentData = exchangeRateResponse?.data?.map((item) => ({
        label: item?.agent_name,
        value: item.sending_agent_id,
    }));

    const dashboardExchangeRateData = dashboardExchangeRateSummary?.data?.map((item) => ({
        customerRate: item?.customerRate,
        rateDifference: item?.rateDifference,
    }));

    const isPositive = (value) => {
        return value >= 0;
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

    return (
        <Container>
            <Row gap={2}>
                <Column
                    sx={(theme) => ({
                        width: "35rem",
                        padding: "0px 16px 0px 0px",
                        borderRight: `1px solid ${theme.palette.divider}`,
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                    })}
                >
                    <Row>
                        <Typography>As of {todayDate}</Typography>
                    </Row>
                    <FormProvider {...methods}>
                        <Grid container>
                            <Grid item xs={12} md={6}>
                                <FormSelect name="agent_name" label="Agent Name" options={agentData} />
                            </Grid>
                        </Grid>
                    </FormProvider>
                </Column>
                <Row
                    flex={1}
                    alignItems="center"
                    gap={"17px"}
                    sx={{
                        overflowX: "auto",
                    }}
                >
                    {dashboardExchangeRateData?.length > 0 ? (
                        dashboardExchangeRateData.map((data, index) => (
                            <Row key={index} gap={"2px"}>
                                {isLoading ? (
                                    <Skeleton variant="text" width={300} height="100%" />
                                ) : (
                                    <>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                width: "11rem",
                                            }}
                                        >
                                            <BoldText>{data?.customerRate}</BoldText>
                                            <BoldText
                                                sx={{
                                                    marginLeft: 0.5,
                                                    color: isPositive(data?.rateDifference)
                                                        ? theme.palette.success.main
                                                        : theme.palette.error.main,
                                                }}
                                            >
                                                {`(${Math.abs(data?.rateDifference)})`}
                                            </BoldText>
                                        </Box>
                                    </>
                                )}
                            </Row>
                        ))
                    ) : (
                        <p>No data available</p>
                    )}
                </Row>
            </Row>
        </Container>
    );
}
