import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import TotalCustomerIcon from "./Icon/TotalCustomerIcon";
import KycVerifiedIcon from "./Icon/KycVerifiedIcon";
import KycRejectedIcon from "./Icon/KycRejectedIcon";
import KycExpiredIcon from "./Icon/KycExpiredIcon";
import KycNotStartedIcon from "./Icon/KycNotStartedIcon";

import actions from "../store/actions";
import cleanObject from "App/helpers/cleanObject";

const Wrapper = styled(Box)(({ theme }) => ({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    background: theme.palette.common.white,
    padding: "16px",
    gap: "16px",
    borderRadius: "8px",
    minWidth: "203px",
    flexWrap: "wrap",
}));

export default function KycStat({ fromDate, toDate, pageName }) {
    const dispatch = useDispatch();

    const { loading: isLoading, response } = useSelector((state) => state.get_all_customer_kyc_count_by_status);

    const data = response?.data;

    useEffect(() => {
        const query = {
            from_date: fromDate,
            to_date: toDate,
        };

        dispatch(actions.get_all_customer_kyc_count_by_status(cleanObject(query)));
    }, [fromDate, toDate]);

    const statsData = [
        {
            label: "Total Customers",
            icon: <TotalCustomerIcon />,
            count: data?.totalCustomer ?? 0,
        },
        {
            label: "KYC Verified",
            icon: <KycVerifiedIcon />,
            count: data?.kycVerifiedCount ?? 0,
        },
        {
            label: "KYC Rejected",
            icon: <KycRejectedIcon />,
            count: data?.kycRejectCount ?? 0,
        },
        {
            label: "KYC Expired",
            icon: <KycExpiredIcon />,
            count: data?.kycExpiredCount ?? 0,
        },
        {
            label: "KYC Not Started",
            icon: <KycNotStartedIcon />,
            count: data?.customerWithNoKycCount ?? 0,
        },
        ...(pageName === "customer_report"
            ? [
                  {
                      label: "Total Inactive",
                      icon: <KycExpiredIcon />,
                      count: data?.totalInactiveCustomerCount ?? 0,
                  },
                  {
                      label: "Total Deleted",
                      icon: <KycRejectedIcon />,
                      count: data?.totalDeletedCustomerCount ?? 0,
                  },
              ]
            : []),
    ];

    return (
        <Box display="flex" gap="16px">
            {statsData.map((stat, index) => (
                <Wrapper key={index}>
                    {stat.icon}
                    <Box display="flex" flexDirection="column">
                        <Typography fontSize="0.857rem" lineHeight="1rem" color="text.secondary">
                            {stat.label}
                        </Typography>
                        {isLoading ? (
                            <Skeleton width="100px" />
                        ) : (
                            <Typography fontSize="1.286rem" lineHeight="2rem" fontWeight={500}>
                                {stat.count}
                            </Typography>
                        )}
                    </Box>
                </Wrapper>
            ))}
        </Box>
    );
}
