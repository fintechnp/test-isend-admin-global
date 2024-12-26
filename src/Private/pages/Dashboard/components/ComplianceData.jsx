import React from "react";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import DashBoardSendIcon from "App/components/Icon/DashBoardSendIcon";
import DashboardReceiveIcon from "App/components/Icon/DashboardReceiveIcon";
import { useSelector } from "react-redux";
import numberUtils from "App/utils/numberUtils";
import calculatePercentageDifference from "App/helpers/calculatePercentageDifference";
import { Skeleton } from "@mui/material";

export default function ComplianceData() {
    const theme = useTheme();

    const { response: getComplianceResponse, loading: isComplianceLoading } = useSelector(
        (state) => state.get_compliance_count_by_status,
    );

    const { response: getPreviousComplianceResponse, loading: isPreviousLoading } = useSelector(
        (state) => state.get_compliance_count_by_status_previous,
    );

    const previousComplianceCountData = getPreviousComplianceResponse?.data ?? [];

    const complianceCountData = getComplianceResponse?.data ?? [];

    const complianceData = [
        {
            label: "Suspicious",
            value: numberUtils.format(complianceCountData?.suspiciousCount ?? 0),
            differenceInPercentage: calculatePercentageDifference(
                complianceCountData?.suspiciousCount ?? 0,
                previousComplianceCountData?.suspiciousCount ?? 0,
            ),
            isDropped:
                (complianceCountData?.suspiciousCount ?? 0) < (previousComplianceCountData?.suspiciousCount ?? 0),
        },
        {
            label: "Blocked",
            value: numberUtils.format(complianceCountData?.blockedCount ?? 0),
            differenceInPercentage: calculatePercentageDifference(
                complianceCountData?.blockedCount ?? 0,
                previousComplianceCountData?.blockedCount ?? 0,
            ),
            isDropped: (complianceCountData?.blockedCount ?? 0) < (previousComplianceCountData?.blockedCount ?? 0),
        },
    ];

    const isLoading = isComplianceLoading || isPreviousLoading;

    return (
        <Box>
            <Typography fontWeight={700} fontSize={16}>
                Compliance
            </Typography>
            <Column gap={"6px"}>
                {complianceData.map((data, index) => (
                    <Column key={index} mt={1} gap={1}>
                        <Typography
                            sx={{
                                color: theme.palette.text.secondary,
                            }}
                        >
                            {data.label}
                        </Typography>

                        {isLoading ? (
                            <Skeleton variant="text" width={130} />
                        ) : (
                            <Row gap={1} alignItems="center">
                                <Typography fontSize={16} fontWeight={700}>
                                    {data.value}
                                </Typography>
                                <Box>{data.isDropped ? <DashboardReceiveIcon /> : <DashBoardSendIcon />}</Box>
                                <Typography
                                    sx={{
                                        color: data.isDropped ? theme.palette.error.main : theme.palette.success.main,
                                    }}
                                >
                                    {data.differenceInPercentage}%{""}
                                </Typography>
                            </Row>
                        )}
                    </Column>
                ))}
            </Column>
        </Box>
    );
}
