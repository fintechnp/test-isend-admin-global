import React from "react";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";

import Row from "App/components/Row/Row";
import Paper from "App/components/Paper/Paper";
import Column from "App/components/Column/Column";
import Center from "App/components/Center/Center";
import TotalCustomerIcon from "App/components/Icon/TotalCustomerIcon";
import TotalTransactionIcon from "App/components/Icon/TotalTransactionIcon";
import TotalKycVerifiedCustomerIcon from "App/components/Icon/TotalKycVerifiedCustomerIcon";

import numberUtils from "App/utils/numberUtils";

const Container = styled(Paper)(({ theme }) => ({
    padding: "16px",
}));

export default function SummaryStat() {
    const theme = useTheme();

    const { loading: isLoadingTransactionStat, response: transactionCountByStatusResponse } = useSelector(
        (state) => state.get_transaction_count_by_status,
    );

    const { loading: isLoadingCustomerStatByDeviceType, response: customerCountByStatusResponse } = useSelector(
        (state) => state.get_customer_count_by_device_type,
    );

    const { loading: isLoadingCustomerKycStatByStatus, response: customerKycCountByStatusResponse } = useSelector(
        (state) => state.get_customer_kyc_count_by_status,
    );

    const transactionCountByStatusData = transactionCountByStatusResponse?.data;

    const customerCountByStatusData = customerCountByStatusResponse?.data;

    const customerKycCountByStatusData = customerKycCountByStatusResponse?.data;

    const statsData = [
        {
            isLoading: isLoadingTransactionStat,
            label: "Total Transaction",
            icon: <TotalTransactionIcon />,
            count: numberUtils.format(transactionCountByStatusData?.totalTransactionsCount),
            cardBgColor: "linear-gradient(94.93deg, #DCEDC8 0%, #F1F8E9 100.09%)",
        },
        {
            isLoading: isLoadingCustomerStatByDeviceType,
            label: "Total Customer",
            icon: <TotalCustomerIcon />,
            count: customerKycCountByStatusData?.totalCustomer ?? 0,
            cardBgColor: "linear-gradient(94.93deg, #FFF9C4 0%, #FFFDE7 100.09%)",
        },
        {
            isLoading: isLoadingCustomerKycStatByStatus,
            label: "Total KYC Verified User",
            icon: <TotalKycVerifiedCustomerIcon />,
            count: customerKycCountByStatusData?.kycVerifiedCount ?? 0,
            cardBgColor: "linear-gradient(94.93deg, #E1BEE7 0%, #F3E5F5 100.09%)",
        },
    ];

    return (
        <Container>
            <Grid container spacing="16px">
                {statsData.map((stat, index) => (
                    <Grid key={index} item xs={12} md={6} lg={4}>
                        <Row
                            key={index}
                            justifyContent="center"
                            alignItems="center"
                            sx={{
                                background: stat.cardBgColor,
                                borderRadius: "8px",
                                padding: "16px",
                                gap: "16px",
                            }}
                        >
                            <Center>{stat.icon}</Center>
                            <Column>
                                <Typography flex={1} color="text.primary" fontSize="0.857rem" lineHeight="1.143rem">
                                    {stat.label}
                                </Typography>
                                {stat.isLoading ? (
                                    <Skeleton width="50px" height="2rem" />
                                ) : (
                                    <Typography fontWeight={600} fontSize="1.286rem" lineHeight="2rem">
                                        {stat.count}
                                    </Typography>
                                )}
                            </Column>
                        </Row>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
