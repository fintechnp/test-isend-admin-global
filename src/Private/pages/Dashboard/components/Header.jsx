import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid'
import Paper from "@mui/material/Paper";
import Row from "App/components/Row/Row";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Column from "App/components/Column/Column";
import ToggleButton from "@mui/material/ToggleButton";
import { useDispatch, useSelector } from "react-redux";
import MuiToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import Center from "App/components/Center/Center";
import DateRangePicker from "App/components/Form/DateRangePicker";

import actions from "../store/actions";
import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import { RangeType } from "App/data/RangeType";
import { inputBorderRadius } from "App/theme/theme";

const HeaderContainer = styled(Paper)(({ theme }) => ({
    padding: "16px",
    "& .MuiInputBase-root,.MuiToggleButtonGroup-grouped": {
        height: "40px",
    },
    "& .DateRangeSelector-root": {
        marginRight: "16px",
    },
}));

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
    "& .MuiToggleButtonGroup-grouped": {
        fontWeight: 600,
        lineHeight: "20px",
        backgroundColor: theme.palette.common.white,
        color: theme.palette.text.baseMain,
        padding: "10px 12px",
        margin: 0,
        "&:first-of-type": {
            borderRadius: `${inputBorderRadius.outer} 0 0 ${inputBorderRadius.outer}`,
        },
        "&:last-of-type": {
            borderRadius: `0 ${inputBorderRadius.outer} ${inputBorderRadius.outer} 0`,
        },
    },
    "& .MuiToggleButtonGroup-grouped:not(.Mui-selected)": {
        // marginRight: "-1px",
    },
    "& .MuiToggleButtonGroup-grouped.Mui-selected": {
        backgroundColor: theme.palette.background.primarySecond,
        "&:first-of-type": {
            borderRight: `1px solid ${theme.palette.stroke.primary}`,
        },
        "&:not(:first-of-type):not(:last-of-type)": {
            borderLeft: `1px solid ${theme.palette.stroke.primary}`,
            borderRight: `1px solid ${theme.palette.stroke.primary}`,
        },
        "&:last-of-type": {
            borderLeft: `1px solid ${theme.palette.stroke.primary}`,
        },
    },
}));

export default function Header() {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(true);

    const [dateRange, setDateRange] = useState({});

    const { loading: isLoadingTransactionStat } = useSelector((state) => state.get_transaction_count_by_status);

    const { loading: isLoadingCustomerStatByDeviceType } = useSelector(
        (state) => state.get_customer_count_by_device_type,
    );

    const { loading: isLoadingCustomerKycStatByStatus } = useSelector(
        (state) => state.get_customer_kyc_count_by_status,
    );

    const isLoading = isLoadingTransactionStat || isLoadingCustomerStatByDeviceType || isLoadingCustomerKycStatByStatus;

    const { params } = useSelector((state) => state.dashboard_filter_params);

    const handleChangeDateRangeSelector = () => {
        //
    };

    const handleChangeRangeSelector = (e) => {
        const rangeType = e.target.getAttribute("value");
        const date = dateUtils.getDateRange(e.target.getAttribute("value"));
        const query = {
            form_date: date.startDate,
            to_date: date.endDate,
            previous_from_date: date.previousStartDate,
            previous_end_date: date.previousEndDate,
        };
        dispatch(actions.change_dashboard_filter_params({ ...query, rangeType }));
        handleChange(query);
    };

    const handleChange = (query) => {
        const current = { from_date: query.form_date, end_date: query.to_date };
        const previous = { from_date: query.previous_from_date, end_date: query.previous_end_date };
        dispatch(actions.get_customer_count_by_device_type(current));
        dispatch(actions.get_customer_kyc_count_by_status(current));
        dispatch(actions.get_transaction_count_by_status(current));
        dispatch(actions.get_customer_kyc_count_by_status_previous(previous));
    };

    useEffect(() => {
        if (isEmpty(params?.form_date) && isEmpty(params?.to_date)) {
            const date = dateUtils.getDateRange(RangeType.DAILY);
            const query = {
                form_date: date.startDate,
                to_date: date.endDate,
                previous_from_date: date.previousStartDate,
                previous_end_date: date.previousEndDate,
            };
            dispatch(actions.change_dashboard_filter_params({ ...query, rangeType: RangeType.DAILY }));
            handleChange(query);
        }
    }, [params]);

    const toggle = () => setOpen(!open);

    return (
        <HeaderContainer elevation={0}>
            <Row>
                <Column>
                    <Typography variant="h6">Dashboard</Typography>
                    <Typography fontSize="0.857rem" lineHeight="1rem" color="text.secondary">
                        Dashboard / Dashboard
                    </Typography>
                </Column>
                {/* <Box className="DateRangeSelector-root" display="flex" flexDirection="row" gap={1}>
                    <DateRangePicker />
                </Box> */}
                <ToggleButtonGroup
                    className="RangeSelector-root"
                    value={params?.rangeType ? [params.rangeType] : []}
                    onChange={handleChangeRangeSelector}
                    aria-label="range selector"
                    disabled={isLoading}
                >
                    <ToggleButton value={RangeType.DAILY} aria-label="daily">
                        Daily
                    </ToggleButton>
                    <ToggleButton value={RangeType.WEEKLY} aria-label="weekly">
                        Weekly
                    </ToggleButton>
                    <ToggleButton value={RangeType.MONTHLY} aria-label="monthly">
                        Monthly
                    </ToggleButton>
                    <ToggleButton value={RangeType.YEARLY} aria-label="yearly">
                        Yearly
                    </ToggleButton>
                </ToggleButtonGroup>
            </Row>
        </HeaderContainer>
    );
}
