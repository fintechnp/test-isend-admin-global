import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import MuiToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Row from "App/components/Row/Row";
import numberUtils from "App/utils/numberUtils";
import Column from "App/components/Column/Column";

import DashboardCardChart from "./DashboardCardChart";
import Paper from "App/components/Paper/Paper";
import HasPermission from "Private/components/shared/HasPermission";
import { permissions } from "Private/data/permissions";

const Container = styled(Paper)(({ theme }) => ({
    padding: "16px",
}));

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
        fontWeight: 600,
        lineHeight: "20px",
        backgroundColor: theme.palette.common.white,
        color: theme.palette.text.baseMain,
        padding: "10px 26px 10px 26px",
        border: "none",
        width: 140,
        margin: 0,
        "&:first-of-type": {
            borderRadius: 10,
        },
        "&:last-of-type": {
            borderRadius: 10,
        },
    },

    "& .MuiToggleButtonGroup-grouped:not(.Mui-selected)": {
        // marginRight: "-1px",
    },
    "& .MuiToggleButtonGroup-grouped.Mui-selected": {
        backgroundColor: theme.palette.background.primarySecond,
        "&:first-of-type": {
            // borderRight: `1px solid ${theme.palette.stroke.primary}`,
        },
        "&:not(:first-of-type):not(:last-of-type)": {
            //  borderLeft: `1px solid ${theme.palette.stroke.primary}`,
            borderRight: `1px solid ${theme.palette.stroke.primary}`,
        },
        "&:last-of-type": {
            //  borderLeft: `1px solid ${theme.palette.stroke.primary}`,
        },
    },
}));

export default function OverallCustomerReport() {
    const theme = useTheme();

    const [transCategory, setTransCategory] = useState("amount");

    const handleTransCategoryChange = (e) => {
        e.target.value === "amount" ? setTransCategory("amount") : setTransCategory("count");
    };

    const { response: getOverallTransaction, loading: isTransactionCountLoading } = useSelector(
        (state) => state.get_overall_transaction_report,
    );

    const { response: getOverallCustomerByStatus, loading: isOverallCustomerByStatusLoading } = useSelector(
        (state) => state.get_overall_customers_report,
    );

    const customerOverallCountByStatusData = getOverallCustomerByStatus?.data;

    const transactionOverallData = getOverallTransaction?.data;

    const overallTransactionData = {
        transaction: {
            totalTransactionCount: numberUtils.format(transactionOverallData?.totalTransactionsCount),
            totalTransactionAmount: `$ ${numberUtils.format(transactionOverallData?.totalTransactionsAmount)}`,

            childrenData: [
                {
                    title: "Pending",
                    totalCount: numberUtils.format(transactionOverallData?.pendingCount),
                    totalAmount: `$ ${numberUtils.format(transactionOverallData?.pendingAmount)}`,
                },
                {
                    title: "Payout",
                    totalCount: numberUtils.format(transactionOverallData?.payoutCount),
                    totalAmount: `$ ${numberUtils.format(transactionOverallData?.pendingAmount)}`,
                },
                {
                    title: "Cancelled",
                    totalCount: numberUtils.format(transactionOverallData?.cancelledCount),
                    totalAmount: `$ ${numberUtils.format(transactionOverallData?.cancelledAmount)}`,
                },
            ],
        },
        customer: {
            totalCustomer: numberUtils.format(customerOverallCountByStatusData?.totalCustomer ?? 0),

            childrenData: [
                {
                    title: "Verified",
                    total: numberUtils.format(customerOverallCountByStatusData?.kycVerifiedCount ?? 0),
                },
                {
                    title: "Rejected",
                    total: numberUtils.format(customerOverallCountByStatusData?.kycRejectCount ?? 0),
                },
                {
                    title: "Expired",
                    total: numberUtils.format(customerOverallCountByStatusData?.kycExpiredCount ?? 0),
                },
                {
                    title: "Not Started",
                    total: numberUtils.format(customerOverallCountByStatusData?.customerWithNoKycCount ?? 0),
                },
                {
                    title: "Nearly Expired",
                    total: numberUtils.format(customerOverallCountByStatusData?.kycExpiringCount ?? 0),
                },
            ],
        },
    };

    return (
        <Container>
            <Column>
                <Typography fontWeight={700} fontSize={14}>
                    Overall Customer
                </Typography>

                <Column mt={1} gap={1}>
                    <Typography
                        sx={{
                            color: theme.palette.text.secondary,
                        }}
                    >
                        Total Customer
                    </Typography>

                    {isOverallCustomerByStatusLoading ? (
                        <>
                            <Skeleton variant="text" width={130} />
                            <Skeleton variant="rectangular" height={50} width="100%" />
                        </>
                    ) : (
                        <>
                            <Row gap={1} alignItems="center">
                                <Typography fontSize={16} fontWeight={700}>
                                    {overallTransactionData.customer.totalTransaction}
                                </Typography>
                            </Row>
                            <Box
                                sx={{
                                    width: "100%",
                                    height: 50,
                                }}
                            >
                                <DashboardCardChart />
                            </Box>
                        </>
                    )}

                    <Column gap={"6px"}>
                        {overallTransactionData.customer.childrenData.map((data, index) => (
                            <Column key={index} mt={1} gap={1}>
                                <Typography
                                    sx={{
                                        color: theme.palette.text.secondary,
                                    }}
                                >
                                    {data.title}
                                </Typography>

                                {isOverallCustomerByStatusLoading ? (
                                    <>
                                        <Skeleton variant="text" width={130} />
                                    </>
                                ) : (
                                    <Row gap={1} alignItems="center">
                                        <Typography fontSize={16} fontWeight={700}>
                                            {data.total}
                                        </Typography>
                                    </Row>
                                )}
                            </Column>
                        ))}
                    </Column>
                </Column>
            </Column>
        </Container>
    );
}
