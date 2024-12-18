import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MuiIconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import { Release } from "App/components";
import Column from "App/components/Column/Column";
import withPermission from "Private/HOC/withPermission";
import Table, { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";

import actions from "./../store/actions";
import ucfirst from "App/helpers/ucfirst";
import PartnerType from "App/data/PartnerType";
import { permissions } from "Private/data/permissions";
import referenceTypeId from "Private/config/referenceTypeId";
import useListFilterStore from "App/hooks/useListFilterStore";
import { PartnerAction } from "Private/pages/Setup/Partner/store";
import { CurrencyName, FormatDate, FormatNumber } from "App/helpers";

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: theme.palette.text.main,
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    fontSize: "14px",
    color: theme.palette.text.dark,
}));

const initialState = {
    page_number: 1,
    page_size: 10,
    sort_by: "created_ts",
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

const sortData = [
    { key: "None", value: "" },
    { key: "Partner Name", value: "agent_name" },
    { key: "Payout Country", value: "payout_country" },
    { key: "Payment Type", value: "payment_type" },
];

const BlockedTransactions = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const [filterPayPartner, setFilterPayPartner] = useState(statePay);

    const { response: blockedTransactions, loading: l_loading } = useSelector(
        (state) => state.get_blocked_transactions,
    );
    const { success: u_success, loading: u_loading } = useSelector((state) => state.update_blocked_transactions);

    const { response: partner_payout } = useSelector((state) => state.get_payout_partner);

    const partnerPayoutOptions = partner_payout?.data?.map((data) => ({
        label: data.name,
        value: data.agent_id,
    }));

    const paymentTypeOptions = reference
        ?.filter((ref_data) => ref_data.reference_type === referenceTypeId.paymentType)[0]
        .reference_data.map((data) => ({
            label: data.name,
            value: data.value,
        }));

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        onFilterSubmit,
        onDeleteFilterParams,
        onPageChange,
        onQuickFilter,
        onRowsPerPageChange,
        filterSchema,
        reset,
    } = useListFilterStore({ initialState });

    const handlePayPartner = (e) => {
        const updatedFilterSchema = {
            ...filterPayPartner,
            country: e.iso3,
        };
        setFilterPayPartner(updatedFilterSchema);
    };

    useEffect(() => {
        dispatch(actions.get_blocked_transactions(filterSchema));
        dispatch({ type: "RELEASE_BLOCKED_TRANSACTIONS_RESET" });
    }, [dispatch, filterSchema, u_success]);

    useEffect(() => {
        if (filterPayPartner.country) {
            dispatch(PartnerAction.get_payout_partner(filterPayPartner));
        }
    }, [filterPayPartner]);

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "tid",
            },
            {
                header: "Name",
                accessorKey: "customer_name",
                cell: ({ row }) => (
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
                                fontSize: "14px",
                                textTransform: "capitalize",
                            }}
                        >
                            {row?.original?.customer_name}
                        </StyledName>
                        <Typography
                            component="span"
                            sx={{
                                fontSize: "12px",
                                opacity: 0.7,
                                textTransform: "capitalize",
                            }}
                        >
                            {row?.original?.beneficiary_name ? row?.original?.beneficiary_name : "N/A"}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: "Partner/Payout Country",
                accessorKey: "agent_name",
                cell: ({ row }) => (
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
                                opacity: 0.8,
                            }}
                        >
                            {row?.original?.agent_name ? row?.original?.agent_name : "N/A"}
                        </StyledName>
                        <StyledName component="p" sx={{ paddingLeft: "4px", fontSize: "13px" }}>
                            {row?.original?.payout_country_data
                                ? ucfirst(row?.original?.payout_country_data.toLowerCase())
                                : (row?.original?.payout_country ?? "N/A")}{" "}
                        </StyledName>
                    </Box>
                ),
            },

            {
                header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Date</Typography>
                    </Box>
                ),
                accessorKey: "created_ts",
                Cell: ({ row }) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {row?.original?.created_ts ? FormatDate(row?.original?.created_ts) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Rate</Typography>
                    </Box>
                ),
                accessorKey: "payout_cost_rate",
                cell: ({ row }) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {row?.original?.payout_cost_rate ? FormatNumber(row?.original?.payout_cost_rate) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="right" sx={{}}>
                        <Typography>Amount</Typography>
                    </Box>
                ),
                accessorKey: "transfer_amount",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {row?.original?.collected_amount ? FormatNumber(row?.original?.collected_amount) : "N/A"}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {row?.original?.payout_amount ? FormatNumber(row?.original?.payout_amount) : "N/A"}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Currency</Typography>
                    </Box>
                ),
                accessorKey: "collected_currency",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {row?.original?.collected_currency
                                ? CurrencyName(row?.original?.collected_currency)
                                : "N/A"}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.7 }}>
                            {row?.original?.payout_currency ? CurrencyName(row?.original?.payout_currency) : "N/A"}
                        </Typography>
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
                        <Tooltip title="Transactions Details" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(`/transactions/details/${row.original.tid}/${row.original.customer_id}`)
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
                        <HasPermission permission={permissions.RELEASE_BLOCKED_TRANSACTION}>
                            <Release
                                destroyOnUnmount
                                enableReinitialize
                                onSubmit={(data) => handleRelease(row.original.tid, data)}
                                validatation={true}
                                tooltext="Release Transaction"
                                form={`block_release_form_${row?.original?.tid}`}
                                reduxGlobalStateKey="update_blocked_transactions"
                            />
                        </HasPermission>
                    </Box>
                ),
            },
        ],
        [],
    );

    const handleRelease = (transactionId, data) => {
        dispatch(
            actions.update_blocked_transactions(transactionId, {
                remarks: data?.remarks,
            }),
        );
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
            name: "search",
            label: "Search",
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
            type: fieldTypes.PARTNER_SELECT,
            name: "send_agent_id",
            label: "Sending Agent",
            partnerType: PartnerType.SEND,
        },
        {
            type: fieldTypes.SELECT,
            name: "payout_agent_id",
            label: "Payout Agent",
            options: partnerPayoutOptions,
            props: {
                disabled: !partnerPayoutOptions?.length,
            },
        },
        {
            type: fieldTypes.SELECT,
            name: "payment_type",
            label: "Payment Type",
            options: paymentTypeOptions,
        },
    ];

    return (
        <PageContent
            documentTitle="Blocked Transactions"
            breadcrumbs={[
                {
                    label: "Payment Processing",
                },
                {
                    label: "Blocked Transactions",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Blocked Transactions"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                    values={filterSchema}
                    fields={filterFields}
                />
                <PageContentContainer
                    title="Blocked Transactions"
                    topRightContent={
                        <TableGridQuickFilter
                            onOrderByChange={onQuickFilter}
                            onSortByChange={onQuickFilter}
                            sortByData={sortData}
                            disabled={l_loading}
                            values={filterSchema}
                        />
                    }
                >
                    <TanstackReactTable columns={columns} data={blockedTransactions?.data || []} loading={l_loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={blockedTransactions?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_BLOCKED_TRANSACTION] })(BlockedTransactions);
