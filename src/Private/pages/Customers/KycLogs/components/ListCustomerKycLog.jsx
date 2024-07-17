import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Fade from "@mui/material/Fade";
import Grow from "@mui/material/Grow";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
import KycLogsIcon from "App/components/Icon/KycLogIcon";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import PageContentContainer from "App/components/Container/PageContentContainer";
import Loader from "App/components/Loader/Loader";

import { kycLogsActions } from "../store";
import { useParams } from "react-router-dom";
import { getKycLogsStatus } from "../data/kycLogsStatus";
import routePaths from "Private/config/routePaths";
import buildRoute from "App/helpers/buildRoute";

const StatusStepper = styled(Stack)(({ theme }) => ({
    flexDirection: "column",
    alignItems: "center",
    marginRight: theme.spacing(2),
    position: "relative",
    "&::after": {
        content: '""',
        position: "absolute",
        left: "15px",
        top: "40px",
        bottom: "-20px",
        width: "1px",
        borderLeft: "2px dashed #0D4992",
        display: "block",
    },
}));

const initialState = {
    page_number: 1,
    page_size: 5,
};

export default function ListCustomerKycLog() {
    const dispatch = useDispatch();

    const { customerId } = useParams();

    const { filterSchema, onFilterSubmit } = useListFilterStore({
        ...initialState,
        customer_id: customerId,
    });

    const {
        response: kycLogs,
        loading: isLoading,
        success: isSuccess,
        loadingMore: isLoadingMore,
    } = useSelector((state) => state.get_customer_kyc_logs);

    const data = kycLogs?.data ?? [];

    const totalCount = kycLogs?.pagination?.totalCount ?? 0;

    useEffect(() => {
        dispatch(
            kycLogsActions.get_kyc_logs({
                ...filterSchema,
                customer_id: customerId,
            }),
        );
    }, [dispatch, customerId]);

    const handleGetMore = (e) => {
        const currentPage = filterSchema.page_number || 1;
        const updatedFilter = {
            ...filterSchema,
            page_number: currentPage + 1,
            customer_id: customerId,
        };
        onFilterSubmit(updatedFilter);

        dispatch(
            kycLogsActions.get_more_kyc_logs({
                ...filterSchema,
                customer_id: customerId,
            }),
        );
    };

    const getAttemptSuffix = (number) => {
        const suffixes = ["th", "st", "nd", "rd"];
        const v = number % 100;
        return v > 10 && v < 20 ? suffixes[0] : suffixes[number % 10] || suffixes[0];
    };

    const renderLogs = () => {
        if (isLoading) {
            return <Loader />;
        } else if (isSuccess && data.length === 0) {
            return <Typography alignSelf="center">No KYC logs found.</Typography>;
        }

        return (
            <>
                {data.map((item, index) => {
                    const attempt = totalCount - index;
                    const finalSuffix = getAttemptSuffix(attempt);

                    return (
                        <Grow in={true} timeout={1000} key={index}>
                            <Fade in={true} timeout={1000}>
                                <Box sx={{ display: "flex", mb: 2 }}>
                                    <StatusStepper
                                        sx={{
                                            "&::after": {
                                                display: index === data.length - 1 ? "none" : "block",
                                            },
                                        }}
                                    >
                                        <KycLogsIcon sx={{ zIndex: 1 }} />
                                    </StatusStepper>

                                    <Box flex={1}>
                                        <Stack direction="row" alignItems="center" spacing={1} mb={0.5}>
                                            <Typography
                                                fontWeight={600}
                                            >{`${attempt}${finalSuffix} Attempt -`}</Typography>
                                            <Typography>KYC {getKycLogsStatus(item?.verification_status)}</Typography>
                                        </Stack>

                                        <Typography variant="body2" color="text.secondary" mb={1}>
                                            {dateUtils.getLocalDateTimeFromUTC(item?.created_ts)}
                                        </Typography>

                                        <Typography color="text.secondary" mb={2}>
                                            {item?.status_message}
                                        </Typography>

                                        {/* TODO: For showing the document images must be implemented in api */}
                                        {/* <Grid container spacing={2}>
                                            <Grid item>
                                                <img
                                                    src="https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                                    alt="photo"
                                                    style={{
                                                        height: "60px",
                                                        width: "60px",
                                                        borderRadius: "8px",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </Grid>
                                        </Grid> */}
                                    </Box>
                                </Box>
                            </Fade>
                        </Grow>
                    );
                })}
            </>
        );
    };

    return (
        <PageContent
            documentTitle="KYC Logs"
            breadcrumbs={[
                {
                    label: "Customers",
                    link: routePaths.ListCustomer,
                },
                {
                    label: customerId,
                    link: buildRoute(routePaths.ViewCustomer, customerId),
                },
                {
                    label: "KYC Logs",
                },
            ]}
        >
            <Column gap="16px">
                <PageContentContainer title="KYC Status">
                    {renderLogs()}

                    {(() => {
                        if (isLoadingMore) {
                            return <Loader />;
                        } else if (data.length < totalCount) {
                            return (
                                <Button
                                    sx={{
                                        mr: "auto",
                                    }}
                                    fontWeight={600}
                                    onClick={handleGetMore}
                                >
                                    See More <ExpandMoreOutlinedIcon />
                                </Button>
                            );
                        }
                    })()}
                </PageContentContainer>
            </Column>
        </PageContent>
    );
}
