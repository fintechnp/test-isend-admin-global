import { reset } from "redux-form";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";

import Filter from "../Shared/Filter";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import withPermission from "Private/HOC/withPermission";
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
import { CountryName, CurrencyName, FormatDate, FormatNumber } from "App/helpers";

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

function TransactionsSuspiciousReports(props) {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const [filterPayPartner, setFilterPayPartner] = useState(statePay);

    const { response: SummaryReports, loading: l_loading } = useSelector(
        (state) => state.get_suspicious_transactions_report,
    );

    const { response: SendPartner, loading: s_loading } = useSelector((state) => state.get_sending_partner);

    const sendPartnerOptions = SendPartner?.data?.map((data) => ({
        label: data.name,
        value: data.agent_id,
    }));

    const { response: PayPartner, loading: p_loading } = useSelector((state) => state.get_payout_partner);

    const payPartnerOptions = PayPartner?.data?.map((data) => ({
        label: data.name,
        value: data.agent_id,
    }));

    const paymentTypeOptions = reference
        ?.filter((ref_data) => ref_data.reference_type === referenceTypeId.paymentType)[0]
        .reference_data.map((data) => ({
            label: data.name,
            value: data.value,
        }));

    const statusOptions = reference
        ?.filter((ref_data) => ref_data.reference_type === referenceTypeId.transactionStatus)[0]
        .reference_data.map((data) => ({
            label: data.name,
            value: data.value,
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
        onFilterSubmit,
        onPageChange,
        onRowsPerPageChange,
        onQuickFilter,
    } = useListFilterStore({ initialState });

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_suspicious_reports"));
        dispatch({ type: "SUSPICIOUS_TRANSACTIONS_REPORT_RESET" });
        dispatch({ type: "GET_PAYOUT_PARTNER_RESET" });
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.get_suspicious_transactions_report(filterSchema));
    }, [dispatch, filterSchema]);

    useEffect(() => {
        dispatch(PartnerActions.get_sending_partner(stateSend));
    }, [dispatch]);

    useEffect(() => {
        if (filterPayPartner.country) {
            dispatch(PartnerActions.get_payout_partner(filterPayPartner));
        }
    }, [dispatch, filterPayPartner]);

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "transaction_id",
                cell: ({ getValue, row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ opacity: 0.8 }}>
                            <Link to={`/transactions/details/${row.original.tid}`} style={{ textDecoration: "none" }}>
                                {getValue() ? getValue() : "N/A"}
                            </Link>
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Partner",
                accessorKey: "agent_name",
                cell: ({ getValue, row }) => (
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
                header: "Send Country",
                accessorKey: "send_country",
                cell: ({ getValue }) => (
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
                header: "Amount",
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
                        <Typography sx={{ fontSize: "15px" }}>Date</Typography>
                    </Box>
                ),
                accessorKey: "created_ts",
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

    const handlePayPartner = (e) => {
        const updatedFilterSchema = {
            ...filterPayPartner,
            country: e.iso3,
        };
        setFilterPayPartner(updatedFilterSchema);
    };

    //Downloads
    const headers = [
        { label: "Customer Name", key: "customer_name" },
        { label: "Txn Id", key: "tid" },
        { label: "S. Currency", key: "collected_currency" },
        { label: "Rate", key: "customer_rate" },
        { label: "Charge", key: "service_charge" },
        { label: "Collected", key: "collected_amount" },
        { label: "Payout", key: "payout_amount" },
        { label: "Status", key: "transaction_status" },
        { label: "Created", key: "created_ts" },
    ];

    const csvReport = {
        title: "Report on Suspicious Transactions",
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
        dispatch(actions.download_report(updatedFilterSchema, "report/transaction_suspicious"));
    };

    const filterFields = [
        {
            type: fieldTypes.DATE,
            name: "from _date",
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
            name: "pin_number",
            label: "Pin Number",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "customer_id",
            label: "Customer ID",
        },
        {
            type: fieldTypes.COUNTRY_SELECT,
            name: "payout_country",
            label: "Payout Country",
            onChange: handlePayPartner,
        },
        {
            type: fieldTypes.SELECT,
            name: "sending_agent_id",
            label: "Send Partner",
            options: sendPartnerOptions,
        },
        {
            type: fieldTypes.SELECT,
            name: "payout_agent_id",
            label: "Payout Partner",
            options: payPartnerOptions,
        },
        {
            type: fieldTypes.SELECT,
            name: "payment_type",
            label: "Payment Type",
            options: paymentTypeOptions,
        },
        {
            type: fieldTypes.SELECT,
            name: "status",
            label: "Status",
            options: statusOptions,
        },
    ];

    return (
        <PageContent
            documentTitle="Suspicious Transactions"
            breadcrumbs={[
                {
                    label: "General Reports",
                },
                {
                    label: "Suspicious Transactions",
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
                    fields={filterFields}
                    onSubmit={onFilterSubmit}
                    onClose={closeFilter}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                    values={filterSchema}
                />

                <PageContentContainer
                    title="Suspicious Transactions"
                    topRightContent={
                        <Filter
                            fileName="SuspiciousReport"
                            success={pd_success}
                            loading={pd_loading}
                            csvReport={csvReport}
                            state={filterSchema}
                            downloadData={downloadData}
                        />
                    }
                >
                    <TanstackReactTable columns={columns} data={SummaryReports?.data || []} loading={l_loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={SummaryReports?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.GENERATE_SUSPICIOUS_TRANSACTION_REPORT] })(
    TransactionsSuspiciousReports,
);
