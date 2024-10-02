import * as Yup from "yup";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useMemo, useRef } from "react";

import Row from "App/components/Row/Row";
import dateUtils from "App/utils/dateUtils";
import { ReferenceName } from "App/helpers";
import getFlagUrl from "App/helpers/getFlagUrl";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { isAfter } from "date-fns";
import actions from "../store/actions";
import isEmpty from "App/helpers/isEmpty";
import PartnerType from "App/data/PartnerType";
import buildRoute from "App/helpers/buildRoute";
import Filter from "../../Reports/Shared/Filter";
import routePaths from "Private/config/routePaths";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import downloadActions from "../../Reports/store/actions";
import referenceTypeId from "Private/config/referenceTypeId";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import StatusBadge from "Private/pages/PaymentProcess/data/StatusBadge";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "border.main",
    textTransform: "capitalize",
}));

const initialState = {
    page_number: 1,
    page_size: 10,
    status: null,
    from_date: dateUtils.getDateBeforeTwoWeeks(),
    to_date: dateUtils.getTodayDate(),
    sort_by: "created_ts",
    order_by: "DESC",
};

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

const schema = Yup.object().shape({
    from_date: Yup.string()
        .nullable()
        .test({
            name: "from-to-pair",
            message: "From Date is required",
            test: function (value) {
                const { to_date } = this.parent;
                // If to_date is provided but from_date is missing, show error on from_date
                return !to_date || !!value;
            },
        })
        .optional(),

    to_date: Yup.string()
        .nullable()
        .test({
            name: "from-to-pair",
            message: "To Date is required",
            test: function (value) {
                const { from_date } = this.parent;
                // If from_date is provided but to_date is missing, show error on to_date
                return !from_date || !!value;
            },
        })
        .when("from_date", {
            is: (value) => !isEmpty(value),
            then: (schema) =>
                schema.test({
                    name: "is-after",
                    message: "To Date must be after From Date",
                    test: function (value) {
                        const { from_date } = this.parent;
                        return value ? isAfter(new Date(value), new Date(from_date)) : true;
                    },
                }),
        }),
});

function Search(props) {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const { response: transactionsData, loading: l_loading } = useSelector((state) => state.get_transactions);

    const paymentTypeOptions =
        reference
            ?.filter((ref) => ref.reference_type === referenceTypeId.paymentType)[0]
            .reference_data.map((data) => ({ label: data.name, value: data.value })) ?? [];

    const statusOptions =
        reference
            ?.filter((ref) => ref.reference_type === referenceTypeId.transactionStatus)[0]
            .reference_data.map((data) => ({ label: data.name, value: data.value })) ?? [];

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "GET_TRANSACTIONS_RESET" });
    }, [dispatch]);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        filterSchema,
        onDeleteFilterParams,
        onRowsPerPageChange,
        onPageChange,
        onQuickFilter,
        onFilterSubmit,
        reset,
    } = useListFilterStore({
        initialState,
        resetInitialStateDate: true,
    });

    useEffect(() => {
        dispatch(actions.get_transactions(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },

            {
                header: "Transaction ID",
                accessorKey: "tid",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ opacity: 0.8 }}>
                            <Link
                                to={buildRoute(routePaths.viewTransaction, {
                                    id: row.original.tid,
                                    customerId: row.original.customer_id,
                                })}
                                style={{ textDecoration: "none" }}
                            >
                                {row?.original?.tid ? row?.original?.tid : "N/A"}
                            </Link>
                        </StyledName>
                    </Box>
                ),
            },

            {
                header: "Sender & Receiver Details",
                cell: ({ row }) => (
                    <Box>
                        <Row
                            gap={2}
                            sx={{
                                marginBottom: "3px",
                            }}
                        >
                            <Typography variant="body1">CN :</Typography>
                            <BadgeAvatar
                                avatarUrl={getFlagUrl(row.original.send_country_iso2)}
                                avatarDimension={20}
                                smallAvatarDimension={0}
                            />
                            <Typography>
                                {row.original.customer_name}&nbsp;({row.original.customer_id})
                            </Typography>
                        </Row>
                        <Divider
                            sx={{
                                width: "100%",
                            }}
                        />
                        <Row
                            gap={2}
                            sx={{
                                marginTop: "5px",
                            }}
                        >
                            <Typography>BN :</Typography>
                            <BadgeAvatar
                                avatarUrl={getFlagUrl(row.original.payout_country_iso2)}
                                avatarDimension={20}
                                smallAvatarDimension={0}
                            />
                            <Typography variant="body2">
                                {row.original.beneficiary_name}&nbsp;({row?.original?.beneficiary_id})
                            </Typography>
                        </Row>
                    </Box>
                ),
            },

            {
                header: "Contact Details",
                cell: ({ row }) => (
                    <Column sx={{ wordBreak: "break-all" }}>
                        <Typography variant="body1">{row?.original?.customer_phone}</Typography>
                        <Typography variant="body1">{row?.original?.customer_email}</Typography>
                    </Column>
                ),
            },

            {
                header: "Created Date & Time",
                cell: ({ row }) => (
                    <Column sx={{ wordBreak: "break-all" }}>
                        <Typography variant="body1">
                            {dateUtils.getLocalDateFromUTC(row?.original?.created_ts)}
                        </Typography>
                        <Typography variant="body2">
                            {dateUtils.getLocalTimeFromUTC(row?.original?.created_ts)}
                        </Typography>
                    </Column>
                ),
            },

            {
                header: "FX Rate",
                accessorKey: "payout_cost_rate",
            },

            {
                header: "Transfer Amount",
                cell: ({ row }) => (
                    <Typography variant="body1">
                        {row?.original?.payout_currency}&nbsp;
                        {row?.original?.payout_amount}
                    </Typography>
                ),
            },

            {
                header: "Service Charge",
                cell: ({ row }) => (
                    <Typography variant="body1">
                        {row?.original?.payout_currency}&nbsp;
                        {row?.original?.service_charge}
                    </Typography>
                ),
            },

            {
                header: "Collected Amount",
                cell: ({ row }) => (
                    <Typography variant="body1">
                        {row?.original?.collected_currency}&nbsp;
                        {row?.original?.collected_amount}
                    </Typography>
                ),
            },

            {
                header: "Deposit Type",
                cell: ({ row }) => <Typography variant="body1">{row?.original?.deposit_type}</Typography>,
            },

            {
                header: "Payment Type",
                cell: ({ row }) => (
                    <Typography variant="body1">{ReferenceName(1, row?.original?.payment_type)}</Typography>
                ),
            },

            {
                header: "Payout Amount",
                cell: ({ row }) => (
                    <Typography variant="body1">
                        {row?.original?.payout_currency}&nbsp;
                        {row?.original?.payout_amount}
                    </Typography>
                ),
            },
            {
                header: "Transaction Status",
                accessorKey: "transaction_status_code",
                cell: ({ row }) => (
                    <StatusBadge
                        status={
                            isEmpty(row?.original?.status) ? row.original.transaction_status_code : row.original.status
                        }
                    />
                ),
            },
            {
                header: "Send Status",
                accessorKey: "send_status_code",
                cell: ({ row }) => <StatusBadge status={row.original.send_status_code} />,
            },
            {
                header: "Partner",
                accessorKey: "agent_name",
            },
        ],
        [],
    );

    const filterFields = [
        {
            type: fieldTypes.DATE,
            label: "From Date",
            name: "from_date",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            label: "To Date",
            name: "to_date",
            props: {
                withEndDayTimezone: true,
            },
        },
        {
            type: fieldTypes.TEXTFIELD,
            label: "Full Name",
            name: "full_name",
        },
        {
            type: fieldTypes.TEXTFIELD,
            label: "Transaction Id",
            name: "transaction_id",
        },
        {
            type: fieldTypes.TEXTFIELD,
            label: "Pin Number",
            name: "pin_number",
        },
        {
            type: fieldTypes.TEXTFIELD,
            label: "Customer Id",
            name: "customer_id",
        },
        {
            type: fieldTypes.TEXTFIELD,
            label: "Email",
            name: "email",
        },
        {
            type: fieldTypes.TEXTFIELD,
            label: "Mobile Number",
            name: "mobile",
        },
        {
            type: fieldTypes.COUNTRY_SELECT,
            label: "Payout Country",
            name: "payout_country",
        },
        {
            type: fieldTypes.PARTNER_SELECT,
            label: "Sending Agent",
            name: "sending_agent_id",
            partnerType: PartnerType.SEND,
        },
        {
            type: fieldTypes.PARTNER_SELECT,
            label: "Payout Agent",
            name: "payout_agent_id",
            partnerType: PartnerType.PAY,
        },
        {
            type: fieldTypes.SELECT,
            label: "Payment Type",
            name: "payment_type",
            options: paymentTypeOptions,
        },
        {
            type: fieldTypes.SELECT,
            label: "Status",
            name: "status",
            options: statusOptions,
        },
    ];

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Name", value: "first_name" },
        { key: "Partner", value: "register_agent_id" },
        { key: "Country", value: "country" },
    ];

    //Downloads
    const csvReport = {
        title: "Report on Transactions",
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
        dispatch(downloadActions.download_report(updatedFilterSchema, "transaction"));
    };

    return (
        <PageContent
            documentTitle="Search Transactions"
            breadcrumbs={[
                {
                    label: "Transactions",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <FilterForm
                title="Search Transactions"
                open={isFilterOpen}
                fields={filterFields}
                onClose={closeFilter}
                onReset={reset}
                onDelete={onDeleteFilterParams}
                onSubmit={onFilterSubmit}
                values={filterSchema}
                schema={schema}
            />

            <Column gap="16px">
                <PageContentContainer
                    title="Transaction List"
                    topRightContent={
                        <Filter
                            fileName="TransactionReport"
                            success={pd_success}
                            loading={pd_loading}
                            csvReport={csvReport}
                            state={filterSchema}
                            downloadData={downloadData}
                        />
                    }
                >
                    <TanstackReactTable columns={columns} data={transactionsData?.data || []} loading={l_loading} />
                </PageContentContainer>

                <TablePagination
                    paginationData={transactionsData?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.SEARCH_TRANSACTION] })(Search);
