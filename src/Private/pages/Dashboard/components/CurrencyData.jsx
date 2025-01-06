import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useTheme } from "@emotion/react";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Paper from "App/components/Paper/Paper";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";

import Row from "App/components/Row/Row";
import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
import FormSelect from "App/core/hook-form/FormSelect";
import useListFilterStore from "App/hooks/useListFilterStore";
import { ExchangeRateAction } from "Private/pages/Setup/ExchangeRate/store";

import { DashboardAction } from "../store";

const Container = styled(Paper)(({ theme }) => ({
    padding: "16px",
}));

const BoldText = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    fontSize: 16,
}));

const initialState = {
    page_number: 1,
    page_size: 100,
};

function DashboardCurrencyData() {
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

    return (
        <Container>
            <Row gap={2}>
                <Column
                    sx={(theme) => ({
                        width: "30rem",
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
                        <Grid item xs={12} md={6}>
                            <FormSelect name="agent_name" label="Agent Name" options={agentData} />
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
                            <Row key={index} gap="2px">
                                {isLoading ? (
                                    <Skeleton variant="rectangular" width={500} height={20} />
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

export default DashboardCurrencyData;
