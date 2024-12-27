import Box from "@mui/material/Box";
import { Helmet } from "react-helmet-async";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiIconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import Header from "../components/Header";
import Filter from "../components/Filter";
import Column from "App/components/Column/Column";
import withPermission from "Private/HOC/withPermission";
import { Delete } from "./../../../../../App/components";
import FilterButton from "App/components/Button/FilterButton";
import SubmitButton from "App/components/Button/SubmitButton";
import PageContent from "App/components/Container/PageContent";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import Table, { TablePagination } from "./../../../../../App/components/Table";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "../store/actions";
import dateUtils from "App/utils/dateUtils";
import { permissions } from "Private/data/permissions";
import useListFilterStore from "App/hooks/useListFilterStore";
import { CountryName, CurrencyName } from "./../../../../../App/helpers";

const MenuContainer = styled("div")(({ theme }) => ({
    margin: "8px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
    background: theme.palette.background.dark,
}));

const SwitchWrapper = styled(Box)(({ theme }) => ({
    "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked": {
        opacity: 0.8,
        color: theme.palette.primary.main,
    },
}));

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    color: "border.main",
}));

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "15px",
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "",
    order_by: "DESC",
};

const ExchangeRateList = (props) => {
    const { id, name, sending_currency } = useParams();
    const [params] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const sendingAgentId = params.get("sending_agent_id");

    const { response: rateList, loading: g_loading } = useSelector((state) => state.get_exchange_rate_by_partner);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_excahnge_rate);
    const { success: a_success } = useSelector((state) => state.add_exchange_rate);
    const { success: u_success } = useSelector((state) => state.update_partner);
    const { loading: isRefreshing, success: isSuccess } = useSelector((state) => state.refresh_exchange_rate);

    const {
        isFilterOpen,
        closeFilter,
        openFilter,
        onFilterSubmit,
        onQuickFilter,
        onRowsPerPageChange,
        onPageChange,
        onDeleteFilterParams,
        reset,
        filterSchema,
    } = useListFilterStore({ initialState });

    const handleOnRefreshExchangeRate = () => {
        dispatch(actions.refresh_exchange_rate({ sendingAgentId }));
    };

    useEffect(() => {
        if (id) {
            dispatch(actions.get_exchange_rate_by_partner(id, filterSchema));
        }
        dispatch({ type: "ADD_EXCHANGE_RATE_RESET" });
        dispatch({ type: "UPDATE_EXCHANGE_RATE_RESET" });
        dispatch({ type: "DELETE_EXCHANGE_RATE_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "exchange_rate_id",
            },
            {
                header: () => (
                    <Box>
                        <Typography>Receive Country/Currency</Typography>
                    </Box>
                ),
                accessorKey: "receiving_country",
                cell: ({ getValue, row }) => (
                    <Box>
                        <StyledText component="p">{getValue() ? CountryName(getValue()) : ""}</StyledText>
                        <Typography
                            sx={{
                                opacity: 0.6,
                                fontSize: "12px",
                                lineHeight: 1,
                            }}
                        >
                            {row?.original?.receiving_currency
                                ? CurrencyName(row?.original?.receiving_currency)
                                : "N/A"}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box>
                        <Typography>Sending/Base Currency</Typography>
                    </Box>
                ),
                accessorKey: "sending_currency",
                cell: ({ getValue, row }) => (
                    <Box>
                        <StyledText component="p">{getValue() ? CurrencyName(getValue()) : ""}</StyledText>
                        <Typography
                            sx={{
                                opacity: 0.6,
                                fontSize: "12px",
                                lineHeight: 1,
                            }}
                        >
                            {row?.original?.base_currency ? CurrencyName(row?.original?.base_currency) : "N/A"}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box sx={{ textAlign: "center" }}>
                        <Typography>Customer Rate</Typography>
                    </Box>
                ),
                accessorKey: "customer_rate",
                cell: ({ getValue, row }) => (
                    <Box sx={{ textAlign: "center" }}>
                        <StyledText component="p">{getValue() ? getValue() : ""}</StyledText>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="center">
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessorKey: "show",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Tooltip title="Exchange Rate Details" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(`/setup/exchange-rate/details/${row?.original?.exchange_rate_id}`)
                                }
                            >
                                <RemoveRedEyeOutlinedIcon
                                    sx={{
                                        fontSize: "20px",
                                        "&:hover": {
                                            background: "transparent",
                                        },
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <HasPermission permission={permissions.EDIT_EXCHANGE_RATE}>
                            <Tooltip title="Edit Exchange Rate" arrow>
                                <IconButton
                                    onClick={() =>
                                        navigate(`/setup/exchange-rate/update/${row.original.exchange_rate_id}`)
                                    }
                                >
                                    <EditOutlinedIcon
                                        sx={{
                                            fontSize: "20px",
                                            "&:hover": {
                                                background: "transparent",
                                            },
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        </HasPermission>
                        <HasPermission permission={permissions.DELETE_EXCHANGE_RATE}>
                            <Delete
                                id={row.original.tid}
                                handleDelete={handleDelete}
                                loading={d_loading}
                                tooltext="Delete Exchange Rate"
                            />
                        </HasPermission>
                    </Box>
                ),
            },
        ],
        [],
    );

    const sortData = [
        { key: "None", value: "" },
        { key: "Rate", value: "customer_rate" },
        { key: "Sending Currency", value: "sending_currency" },
        { key: "Receiving Currency", value: "receiving_currency" },
    ];

    const handleDelete = (id) => {
        dispatch(actions.delete_exchange_rate(id));
    };

    const handleOnRefreshExchangeRateSuccess = () => {
        dispatch(actions.get_exchange_rate_by_partner(id, filterSchema));
    };

    const lastUpdatedAt = useMemo(() => {
        return rateList?.data?.[0]?.updated_ts;
    }, [rateList]);

    const filterFields = [
        {
            label: "Search",
            name: "search",
            type: fieldTypes.TEXTFIELD,
        },
    ];

    useEffect(() => {
        if (isSuccess) {
            dispatch(actions.reset_refresh_exchange_rate());
            handleOnRefreshExchangeRateSuccess();
        }
    }, [isSuccess]);

    return (
        <PageContent
            documentTitle={props.title}
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "PartnerWise Exchage Rate",
                    link: "/setup/exchange-rate",
                },
                {
                    label: `Exchange Rate List of ${name}`,
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Exchange Rate List"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    values={filterSchema}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                    fields={filterFields}
                />
                <PageContentContainer
                    title={`Exchange Rate List of ${name}`}
                    topRightContent={
                        <>
                            {sendingAgentId && (
                                <Box display="flex" alignItems="center">
                                    {lastUpdatedAt && (
                                        <Box display="flex" flexDirection="row">
                                            <Typography mr={2}>Last updated at:</Typography>
                                            <Typography mr={2}>{dateUtils.getFormattedDate(lastUpdatedAt)}</Typography>
                                        </Box>
                                    )}
                                    <HasPermission permission={permissions.PULL_EXCHANGE_RATE_FROM_IPAY}>
                                        <SubmitButton
                                            type="button"
                                            size="medium"
                                            variant="outlined"
                                            onClick={handleOnRefreshExchangeRate}
                                            isLoading={isRefreshing}
                                        >
                                            Pull exchange rate from IPAY
                                        </SubmitButton>
                                    </HasPermission>
                                </Box>
                            )}
                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                values={filterSchema}
                                disabled={d_loading}
                                sortByData={sortData}
                            />
                            <Header buttonText="Add Exchange Rate" id={id} sending_currency={sending_currency} />
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={rateList?.data || []} loading={g_loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={rateList?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_EXCHANGE_RATE] })(ExchangeRateList);
