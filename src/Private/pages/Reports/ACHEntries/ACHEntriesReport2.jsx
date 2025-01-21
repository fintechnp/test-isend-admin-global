import React, { useEffect, useState, useMemo, useRef } from "react";
import * as Yup from "yup";

import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";

import actions from "../store/actions";
import NoResults from "../Shared/NoResults";
import Loading from "App/components/Loading";
import { TablePagination } from "App/components/Table";
import ACHEntriesFilterForm from "./ACHEntriesFilterForm";
import ReportTitle from "App/components/Title/ReportTitle";
import PageContent from "App/components/Container/PageContent";
import ReportTable from "Private/components/reports/ReportTable";

import { FormatDateTime } from "App/helpers";
import apiEndpoints from "Private/config/apiEndpoints";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterButton from "App/components/Button/FilterButton";
import { Box, Breadcrumbs } from "@mui/material";
import Column from "App/components/Column/Column";
import dateUtils from "App/utils/dateUtils";
import achConfig from "App/config/achConfig";

import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";
import isEmpty from "App/helpers/isEmpty";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import Filter from "../Shared/Filter";
import ExportPdfTable from "../Beneficiary/components/ExportBeneficiary";

const schema = Yup.object().shape({
    created_from_date: Yup.string().nullable().optional(),
    created_to_date: Yup.string()
        .nullable()
        .optional()
        .when("created_from_date", {
            is: (value) => !isEmpty(value),
            then: (schema) =>
                Yup.string().test({
                    name: "is-after",
                    message: "To Date must be after From Date",
                    test: function (value) {
                        const { created_from_date } = this.parent;
                        return value ? isAfter(new Date(value), new Date(created_from_date)) : true;
                    },
                }),
            otherwise: (schema) => Yup.string().nullable().optional(),
        }),
});

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    created_from_date: dateUtils.getDateBeforeTwoWeeks(),
    created_to_date: dateUtils.getTodayDate(),
    order_by: "ASC",
};

function ACHEntriesReport2() {
    const dispatch = useDispatch();

    const { response: ACHEntriesResponse, loading: l_loading } = useSelector((state) => state.get_ach_entries_report);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        filterSchema,
        onQuickFilter,
        onRowsPerPageChange,
        onFilterSubmit,
        onPageChange,
        onDeleteFilterParams,
        reset,
    } = useListFilterStore({
        initialState,
        resetInitialStateDate: true,
        fromDateParamName: "created_from_date",
        toDateParamName: "created_to_date",
    });

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "ACH_ENTRIES_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.get_ach_entries_report(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "ACH ID",
                accessorKey: "ach_id",
            },

            {
                header: "Txn No",
                accessorKey: "txn_no",
            },
            {
                header: "Name",
                accessorKey: "name",
            },
            {
                header: "Amount",
                accessorKey: "amount",
            },
            {
                header: "Txn Type",
                accessorKey: "txn_type",
            },
            {
                header: "Status",
                accessorKey: "status",
            },
            {
                header: "Created At",
                accessorKey: "created_ts",
                cell: ({ getValue }) => <Column>{getValue() ? dateUtils.getFormattedDate(getValue()) : "-"}</Column>,
            },
        ],
        [],
    );

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "ach_id",
            label: "ACH ID",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "search",
            label: "Search",
        },
        {
            type: fieldTypes.SELECT,
            name: "txn_type",
            label: "Transaction Type",
            options: achConfig.transactionType.options(),
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "txn_no",
            label: "Transaction No",
        },
        {
            type: fieldTypes.DATE,
            name: "created_from_date",
            label: "From Date",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            name: "created_to_date",
            label: "To Date",
            props: {
                withEndDayTimezone: true,
            },
        },
    ];

    const sortData = [
        {
            key: "Created At",
            value: "created_ts",
        },
    ];

    const headers = [
        {
            label: "ACH ID",
            key: "ach_id",
        },
        {
            label: "Txn No",
            key: "txn_no",
        },
        {
            label: "Name",
            key: "name",
        },
        {
            label: "Amount",
            key: "amount",
        },
        {
            label: "Txn Type",
            key: "txn_type",
        },
        {
            label: "Status",
            key: "status",
        },
        {
            label: "Created At",
            key: "created_ts",
        },
    ];

    const csvReport = {
        title: "Report on ACH (Automated Clearing House) Entries Entries",
        start: dateUtils.getLocalDateFromUTC(filterSchema?.created_from_date),
        end: dateUtils.getLocalDateFromUTC(filterSchema?.created_to_date),
        headers: headers,
        data: (ReportsDownload?.data || []).map(
            ({
                routing_no,
                account_no,
                transaction_group_id,
                ach_trace_number,
                ach_payment_id,
                is_active,
                id,
                ...others
            }) => ({
                ...others,
            }),
        ),
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: 100,
        };
        dispatch(actions.download_report(updatedFilterSchema, apiEndpoints.reports.achEntries));
    };

    return (
        <PageContent
            documentTitle="ACH (Automated Clearing House) Entries Reports"
            topRightEndContent={
                <FilterButton
                    size="small"
                    onClick={() => (isFilterOpen ? closeFilter() : openFilter())}
                    breadcrumbs={[
                        {
                            label: "Generate Reports",
                        },
                        {
                            label: "ACH Entries Report",
                        },
                    ]}
                />
            }
        >
            <Column>
                <Column
                    sx={{
                        marginY: 1,
                    }}
                >
                    <FilterForm
                        open={isFilterOpen}
                        onClose={closeFilter}
                        onSubmit={onFilterSubmit}
                        fields={filterFields}
                        values={filterSchema}
                        onDelete={onDeleteFilterParams}
                        schema={schema}
                        title="Search ACH Transactions"
                        onReset={reset}
                    />
                </Column>

                <PageContentContainer
                    title="ACH (Automated Clearing House) Entries Reports"
                    topRightContent={
                        <>
                            <Filter
                                fileName={`achEntriesReport_${Date.now()}`}
                                success={pd_success}
                                loading={pd_loading}
                                csvReport={csvReport}
                                state={filterSchema}
                                downloadData={downloadData}
                            />
                            <TableGridQuickFilter
                                onOrderByChange={onQuickFilter}
                                onSortByChange={onQuickFilter}
                                sortByData={sortData}
                                values={filterSchema}
                                disable={l_loading}
                            />
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={ACHEntriesResponse?.data || []} loading={l_loading} />

                    <TablePagination
                        paginationData={ACHEntriesResponse?.pagination}
                        handleChangePage={onPageChange}
                        handleChangeRowsPerPage={onRowsPerPageChange}
                    />
                </PageContentContainer>
            </Column>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.GENERATE_ACH_ENTRIES_REPORT] })(ACHEntriesReport2);
