import moment from "moment";
import { reset } from "redux-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useMemo, useRef } from "react";

import Filter from "../Shared/Filter";
import Column from "App/components/Column/Column";
import withPermission from "Private/HOC/withPermission";
import Table, { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "../store/actions";
import { permissions } from "Private/data/permissions";
import referenceTypeId from "Private/config/referenceTypeId";
import useListFilterStore from "App/hooks/useListFilterStore";
import PartnerActions from "../../Setup/Partner/store/actions";
import { CountryName, CurrencyName, FormatNumber, FormatDate, ReferenceName } from "App/helpers";

const CustomerWrapper = styled("div")(({ theme }) => ({
    margin: "12px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
    background: theme.palette.background.dark,
}));

const StyledName = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    fontSize: "14px",
    color: theme.palette.text.dark,
    textTransform: "capitalize",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "agent_name",
    order_by: "ASC",
};

const stateSend = {
    page_number: 1,
    page_size: 100,
    agent_type: "SEND",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

const statePay = {
    page_number: 1,
    page_size: 100,
    agent_type: "PAY",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

function CancelledTransactions(props) {
    const dispatch = useDispatch();

    const { response: CancelledTransactions, loading: l_loading } = useSelector((state) => state.get_cancelled_report);

    const { response: SendPartner, loading: s_loading } = useSelector((state) => state.get_sending_partner);

    const sendPartnerOptions = SendPartner?.data?.map((data) => ({
        label: data.name,
        value: data.agent_id,
    }));

    const { response: PayPartner, loading: p_loading } = useSelector((state) => state.get_payout_partner);

    const payoutPartnerOptions = PayPartner?.data?.map((data) => ({
        label: data.name,
        value: data.agent_id,
    }));

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        filterSchema,
        onDeleteFilterParams,
        onQuickFilter,
        reset,
        onFilterSubmit,
        onPageChange,
        onRowsPerPageChange,
    } = useListFilterStore({ initialState });

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "CANCELLED_TRANSACTIONS_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.get_cancelled_report(filterSchema));
    }, [dispatch, filterSchema]);

    useEffect(() => {
        dispatch(PartnerActions.get_sending_partner(stateSend));
        dispatch(PartnerActions.get_payout_partner(statePay));
    }, [dispatch]);

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "tid",
            },
            {
                header: "Transaction Id",
                accessorKey: "transaction_id",
            },
            {
                header: "Partner",
                accessorKey: "agent_name",
                cell: ({ getValue }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p">{getValue() ? getValue() : "N/A"}</StyledName>
                    </Box>
                ),
            },
            {
                header: "Type/Currency",
                accessorKey: "payment_type",
                cell: ({ getValue, row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            fontSize: "12px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {getValue() ? ReferenceName(referenceTypeId.paymentType, getValue()) : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {row?.original?.collected_currency
                                ? CurrencyName(row?.original?.collected_currency)
                                : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Payout Country",
                accessorKey: "payout_country",
                cell: ({ getValue, row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            fontSize: "12px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {getValue() ? CountryName(getValue()) : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {row?.original?.payout_currency ? CurrencyName(row?.original?.payout_currency) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Rate/Charge",
                accessorKey: "customer_rate",
                cell: ({ getValue, row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                            }}
                        >
                            {getValue() ? FormatNumber(getValue()) : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {row?.original?.service_charge ? FormatNumber(row?.original?.service_charge) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Sent/Payout Amount",
                accessorKey: "collected_amount",
                cell: ({ getValue, row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                            }}
                        >
                            {getValue() ? FormatNumber(getValue()) : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {row?.original?.payout_amount ? FormatNumber(row?.original?.payout_amount) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="left">
                        <Typography sx={{ fontSize: "15px" }}>Refund Date</Typography>
                    </Box>
                ),
                accessorKey: "refund_ts",
                cell: ({ getValue }) => (
                    <Box textAlign="left">
                        <StyledName component="p" value={getValue()}>
                            {FormatDate(getValue())}
                        </StyledName>
                    </Box>
                ),
            },
        ],
        [],
    );

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Partner", value: "agent_name" },
        { key: "Rate", value: "average_customer_rate" },
        { key: "Payout Amount", value: "payout_amount" },
        { key: "Sent Country", value: "send_country" },
    ];

    const orderData = [
        { key: "Ascending", value: "ASC" },
        { key: "Descending", value: "DESC" },
    ];

    //Downloads
    const headers = [
        { label: "Customer Name", key: "customer_name" },
        { label: "Txn Id", key: "transaction_id" },
        { label: "S. Currency", key: "collected_currency" },
        { label: "Rate", key: "customer_rate" },
        { label: "Charge", key: "service_charge" },
        { label: "Collected", key: "collected_amount" },
        { label: "Payout", key: "payout_amount" },
        { label: "Status", key: "transaction_status" },
        { label: "Created", key: "created_ts" },
    ];

    const csvReport = {
        title: "Report on Cancelled Transactions",
        start: filterSchema?.from_date,
        end: filterSchema?.to_date,
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: 10000,
        };
        dispatch(actions.download_report(updatedFilterSchema, "report/transaction_cancel"));
    };

    const filterFields = [
        {
            type: fieldTypes.DATE,
            name: "from_date",
            label: "From Date",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            name: "to_date",
            label: "To Date",
            props: {
                withEndDayTimezone: true,
            },
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "transaction_id",
            label: "Transaction ID",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "customer_id",
            label: "Customer ID",
        },
        {
            type: fieldTypes.SELECT,
            name: "sending_agent_id",
            label: "Sending Agent",
            options: sendPartnerOptions,
        },
        {
            type: fieldTypes.SELECT,
            name: "payout_agent_id",
            label: "Payout Agent",
            options: payoutPartnerOptions,
        },
    ];

    return (
        <PageContent
            documentTitle="Cancelled Transactions"
            breadcrumbs={[
                { label: "Generate Reports" },
                {
                    label: "Cancelled Transactions",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Transactions"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                    onSubmit={onFilterSubmit}
                    values={filterSchema}
                    fields={filterFields}
                />
                <PageContentContainer
                    title="Cancelled Transactions"
                    topRightContent={
                        <Filter
                            fileName="CancelledReport"
                            success={pd_success}
                            loading={pd_loading}
                            csvReport={csvReport}
                            state={filterSchema}
                            downloadData={downloadData}
                        />
                    }
                >
                    <TanstackReactTable
                        columns={columns}
                        data={CancelledTransactions?.data || []}
                        loading={l_loading}
                    />
                </PageContentContainer>
                <TablePagination
                    paginationData={CancelledTransactions?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}

export default withPermission({ permission: permissions.GENERATE_CANCELLED_TRANSACTION_REPORT })(CancelledTransactions);
