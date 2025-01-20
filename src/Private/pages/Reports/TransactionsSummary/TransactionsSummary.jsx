import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Filter from "../Shared/Filter";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import withPermission from "Private/HOC/withPermission";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "../store/actions";
import { permissions } from "Private/data/permissions";
import referenceTypeId from "Private/config/referenceTypeId";
import useListFilterStore from "App/hooks/useListFilterStore";
import PartnerActions from "../../Setup/Partner/store/actions";
import { CountryName, CurrencyName, FormatNumber } from "App/helpers";

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
    sort_by: "send_country",
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

function TransactionsSummaryReports(props) {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const [filterSendPartner, setFilterSendPartner] = useState(stateSend);
    const [filterPayPartner, setFilterPayPartner] = useState(statePay);

    const { response: SummaryReports, loading: l_loading } = useSelector(
        (state) => state.get_transactions_summary_report,
    );

    const { response: SendPartner, loading: s_loading } = useSelector((state) => state.get_sending_partner);

    const sendPartnerOptions = SendPartner?.data?.map((data) => ({
        label: data.name,
        value: data.id,
    }));

    const { response: PayPartner, loading: p_loading } = useSelector((state) => state.get_payout_partner);

    const payoutParnterOptions = PayPartner?.data?.map((data) => ({
        label: data.name,
        value: data.id,
    }));

    const paymentTypeOptions = reference
        ?.filter((ref_data) => ref_data.reference_type === referenceTypeId.paymentType)[0]
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
        onQuickFilter,
        onPageChange,
        onRowsPerPageChange,
        onDeleteFilterParams,
        onFilterSubmit,
        reset,
    } = useListFilterStore({ initialState });

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "TRANSACTIONS_SUMMARY_REPORT_RESET" });
        dispatch({ type: "GET_SENDING_PARTNER_RESET" });
        dispatch({ type: "GET_PAYOUT_PARTNER_RESET" });
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.get_transactions_summary_report(filterSchema));
    }, [dispatch, filterSchema]);

    useEffect(() => {
        if (filterSendPartner.country) {
            dispatch(PartnerActions.get_sending_partner(filterSendPartner));
        }
    }, [dispatch, filterSendPartner]);

    useEffect(() => {
        if (filterPayPartner.country) {
            dispatch(PartnerActions.get_payout_partner(filterPayPartner));
        }
    }, [dispatch, filterPayPartner]);

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "tid",
            },
            {
                header: "From",
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
                header: () => (
                    <Box textAlign="left">
                        <Typography sx={{ fontSize: "13px" }}>To</Typography>
                    </Box>
                ),
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
                header: () => (
                    <Box textAlign="right">
                        <Typography sx={{ fontSize: "13px" }}>NOS</Typography>
                    </Box>
                ),
                accessorKey: "txn_cnt",
                cell: ({ getValue }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                            }}
                        >
                            {getValue() ? getValue() : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="right">
                        <Typography sx={{ fontSize: "13px" }}>Avg. Rate</Typography>
                    </Box>
                ),
                accessorKey: "average_customer_rate",
                cell: ({ getValue, row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
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
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="right">
                        <Typography sx={{ fontSize: "13px" }}>T. Charge</Typography>
                    </Box>
                ),
                accessorKey: "total_charge",
                cell: ({ getValue }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
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
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="right">
                        <Typography sx={{ fontSize: "13px" }}>Payout Amount</Typography>
                    </Box>
                ),
                accessorKey: "payout_amount",
                cell: ({ getValue, row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
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
                    </Box>
                ),
            },
        ],
        [],
    );

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Rate", value: "average_customer_rate" },
        { key: "Partner", value: "agent_name" },
        { key: "Sent Country", value: "send_country" },
        { key: "Payout Country", value: "payout_country" },
        { key: "Payout Amount", value: "payout_amount" },
    ];

    const handlePayPartner = (e) => {
        const updatedFilterSchema = {
            ...filterPayPartner,
            country: e.iso3,
        };
        setFilterPayPartner(updatedFilterSchema);
    };

    const handleSendPartner = (e) => {
        const updatedFilterSchema = {
            ...filterSendPartner,
            country: e.iso3,
        };
        setFilterSendPartner(updatedFilterSchema);
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
            type: fieldTypes.COUNTRY_SELECT,
            name: "send_country",
            label: "Send Country",
            onChange: handleSendPartner,
        },
        {
            type: fieldTypes.SELECT,
            name: "sending_agent_id",
            label: "Send Partner",
            options: sendPartnerOptions,
        },
        {
            type: fieldTypes.COUNTRY_SELECT,
            name: "payout_country",
            label: "Payout Country",
            onChange: handlePayPartner,
        },
        {
            type: fieldTypes.SELECT,
            name: "payout_agent_id",
            label: "Payout Partner",
            options: payoutParnterOptions,
        },
        {
            type: fieldTypes.SELECT,
            name: "payment_type",
            label: "Payment Type",
            options: paymentTypeOptions,
        },
    ];

    //Downloads
    const headers = [
        { label: "Name", key: "agent_name" },
        { label: "S. Country", key: "send_country" },
        { label: "P. Country", key: "payout_country" },
        { label: "No. Txn", key: "txn_cnt" },
        { label: "T. Charge", key: "total_charge" },
        { label: "Avg. Rate", key: "average_customer_rate" },
        { label: "Payout Amount", key: "payout_amount" },
        { label: "Created Time", key: "created_ts" },
    ];

    const csvReport = {
        title: "Report on Transactions Summary",
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
        dispatch(actions.download_report(updatedFilterSchema, "report/transaction_summary"));
    };

    return (
        <PageContent
            documentTitle="Transaction Summary"
            breadcrumbs={[
                {
                    label: "Reports",
                },
                {
                    label: "Transaction Summary",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    onSubmit={onFilterSubmit}
                    onClose={closeFilter}
                    open={isFilterOpen}
                    values={filterSchema}
                    fields={filterFields}
                    onDelete={onDeleteFilterParams}
                    title="Search Transactions"
                    onReset={reset}
                />
                <PageContentContainer
                    title="Transacations Summary Report"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                sortByData={sortData}
                                values={filterSchema}
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                disabled={l_loading}
                            />
                            <Filter
                                fileName="SummaryReport"
                                success={pd_success}
                                loading={pd_loading}
                                csvReport={csvReport}
                                state={filterSchema}
                                downloadData={downloadData}
                            />
                        </>
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

export default withPermission({ permission: [permissions.GENERATE_TRANSACTION_REPORT] })(TransactionsSummaryReports);
