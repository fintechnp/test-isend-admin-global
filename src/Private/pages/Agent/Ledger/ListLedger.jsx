import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useMemo, useState } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import Button from "App/components/Button/Button";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import LedgerFilterForm from "Private/components/Ledger/LedgerFilterForm";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";

import EntryType from "./enum/EntryType";
import dateUtils from "App/utils/dateUtils";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import { ledgerActions as actions } from "./store";
import apiEndpoints from "Private/config/apiEndpoints";
import useListFilterStore from "App/hooks/useListFilterStore";
import { relatedTo as relatedToConstant, relatedToOptions } from "Private/data/b2b";

const initialState = {
    Page: 1,
    PageSize: 10,
};

export default function ListLedger() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const agentInitialState = {
        label: "Agent",
        searchParamName: "Name",
        valueKey: "marketMakerId",
        apiEndpoint: apiEndpoints.marketMaker.getAll,
        shouldRenderPrevData: true,
        pageNumberQueryKey: "Page",
    };
    const [newField, setNewField] = useState(agentInitialState);

    const { response, loading } = useSelector((state) => state.get_all_ledger);

    const {
        isFilterOpen,
        closeFilter,
        openFilter,
        onFilterSubmit,
        onDeleteFilterParams,
        onPageChange,
        onQuickFilter,
        onRowsPerPageChange,
        reset,
        filterSchema,
    } = useListFilterStore({
        initialState,
        pageNumberKeyName: "Page",
        pageSizeKeyName: "PageSize",
    });

    useEffect(() => {
        dispatch(actions?.get_all_ledger(filterSchema));
    }, [filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },

            {
                header: "Entry Type",
                accessorKey: "entryTypeName",
                cell: ({ row, getValue }) => {
                    if (
                        row?.original?.entryTypeName === EntryType.Single ||
                        row?.original?.entryTypeName === EntryType.SingleServiceCharge ||
                        row?.original?.entryTypeName === EntryType.SingleReverseEntry ||
                        row?.original?.entryTypeName === EntryType.BatchReverseEntry ||
                        row?.original?.entryTypeName === EntryType.SingleServiceChargeReverseEntry ||
                        row?.original?.entryTypeName === EntryType.BatchServiceChargeReverseEntry ||
                        row?.original?.entryTypeName === EntryType.SingleBatchTransaction ||
                        row?.original?.entryTypeName === EntryType.SingleBatchServiceCharge
                    ) {
                        return <Link to={`/transactions/details/${row?.original?.entryId}`}>{getValue()}</Link>;
                    } else if (
                        row?.original?.entryTypeName === EntryType.Batch ||
                        row?.original?.entryTypeName === EntryType.BatchServiceCharge
                    ) {
                        return (
                            <Link to={buildRoute(routePaths.agent.viewBatchTransaction, row?.original?.entryId)}>
                                {getValue()}
                            </Link>
                        );
                    } else if (row?.original?.entryTypeName === EntryType.BalanceRequest) {
                        return (
                            <Link to={buildRoute(routePaths.agent.viewBalanceRequest, row?.original?.entryId)}>
                                {getValue()}
                            </Link>
                        );
                    } else {
                        return <Typography>{getValue()}</Typography>;
                    }
                },
            },
            {
                header: "Account Name",
                accessorKey: "accountName",
            },
            {
                header: "Currency",
                accessorKey: "currency",
            },

            {
                header: "Narration",
                accessorKey: "narration",
            },
            {
                header: "Debit",
                accessorKey: "totalDebit",
            },
            {
                header: "Credit",
                accessorKey: "totalCredit",
            },
            {
                header: "Created At",
                cell: ({ row }) => <>{dateUtils.getFormattedDate(row.original.createdDate)}</>,
            },

            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <IconButton
                            onClick={() => {
                                navigate(buildRoute(routePaths.agent.viewLedger, row.original.ledgerMasterId));
                            }}
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
                    </TableRowActionContainer>
                ),
            },
        ],
        [],
    );

    const entityTypeOptions = [
        {
            label: EntryType.Single,
            value: 0,
        },
        {
            label: EntryType.Batch,
            value: 1,
        },
        {
            label: EntryType.BalanceRequest,
            value: 2,
        },
        {
            label: EntryType.Manual,
            value: 3,
        },
        {
            label: EntryType.SingleServiceCharge,
            value: 4,
        },
        {
            label: EntryType.BatchServiceCharge,
            value: 5,
        },
        {
            label: EntryType.SingleReverseEntry,
            value: 6,
        },
        {
            label: EntryType.BatchReverseEntry,
            value: 7,
        },
        {
            label: EntryType.SingleServiceChargeReverseEntry,
            value: 8,
        },
        {
            label: EntryType.BatchServiceChargeReverseEntry,
            value: 9,
        },
        {
            label: EntryType.SingleBatchTransaction,
            value: 10,
        },
        {
            label: EntryType.SingleBatchServiceCharge,
            value: 11,
        },
    ];

    const filterFields = [
        {
            type: fieldTypes.DATE,
            name: "FromDate",
            label: "From Date",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            name: "ToDate",
            label: "To Date",
            props: {
                withEndDayTimezone: true,
            },
        },
        {
            type: fieldTypes.SELECT,
            name: "RelatedTo",
            label: "Market Maker",
            options: relatedToOptions,
            defaultValue: relatedToConstant.AGENT,
            onChange: (event) => {
                const { value } = event.target;
                const isAgentSelected = value === relatedToConstant.AGENT;
                setNewField({
                    label: isAgentSelected ? "Agent" : "Business",
                    searchParamName: isAgentSelected ? "Name" : "BusinessName",
                    valueKey: isAgentSelected ? "marketMakerId" : "businessId",
                    apiEndpoint: isAgentSelected ? apiEndpoints.marketMaker.getAll : apiEndpoints.business.getAll,
                    shouldRenderPrevData: true,
                    pageNumberQueryKey: isAgentSelected ? "Page" : "PageNumber",
                });
            },
        },
        {
            type: fieldTypes.SEARCH_AUTOCOMPLETE_API,
            name: "RelatedId",
            labelKey: "name",
            ...newField,
        },
        {
            type: fieldTypes.SELECT,
            name: "EntryType",
            label: "Entry Type",
            options: entityTypeOptions,
        },
    ];

    return (
        <PageContent
            documentTitle="Ledger List"
            breadcrumbs={[
                {
                    label: "B2B",
                },
                {
                    label: "Ledgers",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Ledger"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onDelete={onDeleteFilterParams}
                    values={filterSchema}
                    fields={filterFields}
                    onReset={reset}
                />
                <PageContentContainer
                    title="Beneficiaries"
                    topRightContent={
                        <Button
                            onClick={() => {
                                navigate(routePaths.agent.addLedger);
                            }}
                        >
                            Add Ledger
                        </Button>
                    }
                >
                    <TanstackReactTable columns={columns} data={response?.data ?? []} loading={loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={response?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}
