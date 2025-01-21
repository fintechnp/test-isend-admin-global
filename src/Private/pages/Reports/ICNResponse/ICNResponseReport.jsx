import * as Yup from "yup";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
import { CountryNameByIso2Code } from "App/helpers";
import { TablePagination } from "App/components/Table";
import apiEndpoints from "Private/config/apiEndpoints";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

import Filter from "../Shared/Filter";
import actions from "../store/actions";

const maxDate = dateUtils.today();
const minDate = moment(maxDate).subtract(30, "days").format("YYYY-MM-DD");

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    created_from_date: minDate,
    created_to_date: maxDate,
};

const schema = Yup.object().shape({
    created_from_date: Yup.string()
        .test({
            name: "required_when_to_date_is_not_empty",
            message: "Form Date is required",
            test: (value, context) => {
                if (
                    (isEmpty(context.parent.created_to_date) && isEmpty(value)) ||
                    (!isEmpty(context.parent.created_to_date) && !isEmpty(value))
                )
                    return true;
                return isEmpty(context.parent.created_to_date) && !isEmpty(value);
            },
        })
        .required("From date is required"),
    created_to_date: Yup.string()
        .test({
            name: "required_when_to_date_is_not_empty",
            message: "To Date is required",
            test: (value, context) => {
                if (
                    (isEmpty(context.parent.created_from_date) && isEmpty(value)) ||
                    (!isEmpty(context.parent.created_from_date) && !isEmpty(value))
                )
                    return true;
                return isEmpty(context.parent.created_from_date) && !isEmpty(value);
            },
        })
        .required("From date is required"),
});

function ICNResponseReport() {
    const dispatch = useDispatch();

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

    const { response: ICNResponseReportResponse, loading: l_loading } = useSelector(
        (state) => state.get_icn_response_report,
    );

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "ICN_RESPONSE_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.get_icn_response_report(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "ICN ID",
                accessorKey: "icn_id",
            },
            {
                header: "Org ID",
                accessorKey: "orgid",
            },
            {
                header: "Country",
                accessorKey: "country",
                cell: ({ getValue }) => <>{getValue() ? CountryNameByIso2Code(getValue()) : "N/A"}</>,
            },
            {
                header: "Transaction Type",
                accessorKey: "txntype",
            },
            {
                header: "Txn Ref ID",
                accessorKey: "txnrefid",
            },
            {
                header: "Txn Date",
                accessorKey: "timestamp",
                cell: ({ getValue }) => <>{getValue() ? dateUtils.getFormattedDate(getValue()) : "N/A"}</>,
            },
            {
                header: "Sender Party Name",
                accessorKey: "senderpartyname",
            },
            {
                header: "Sender Bank ID",
                accessorKey: "senderpartysenderbankid",
            },
            {
                header: "Amount",
                accessorKey: "txnamt",
            },
            {
                header: "Currency",
                accessorKey: "txnccy",
            },
            {
                header: "Receiving Party Name",
                accessorKey: "receivingpartyname",
            },
            {
                header: "Receiving Party Account No.",
                accessorKey: "receivingpartyaccountno",
            },
            {
                header: "Created At",
                accessorKey: "created_ts",
                maxWidth: 120,
                cell: ({ getValue }) => (getValue() ? dateUtils.getFormattedDate(getValue()) : "-"),
            },
        ],
        [],
    );

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "search",
            label: "Search",
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

    const headers = [
        {
            label: "Org ID",
            key: "orgid",
        },
        {
            label: "Country",
            key: "country",
        },
        {
            label: "Transaction Type",
            key: "txntype",
        },
        {
            label: "Txn Ref ID",
            key: "txnrefid",
        },
        {
            label: "Txn Date",
            key: "timestamp",
        },
        {
            label: "Sender Party Name",
            key: "senderpartyname",
        },
        {
            label: "Amount",
            key: "txnamt",
        },
        {
            label: "Currency",
            key: "txnccy",
        },
        {
            label: "Receiving",
            key: "receivingpartyname",
        },
        {
            label: "Created At",
            key: "created_ts",
        },
    ];

    const csvReport = {
        title: "ICN Report",
        start: filterSchema?.created_from_date,
        end: filterSchema?.created_to_date,
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: 100,
        };
        dispatch(actions.download_report(updatedFilterSchema, apiEndpoints.reports.icnResponse));
    };

    return (
        <PageContent
            documentTitle="ICN (Instant Credit Notification) Reports"
            topRightEndContent={
                <FilterButton
                    size="small"
                    onClick={() => (isFilterOpen ? closeFilter() : openFilter())}
                    breadcrumbs={[
                        {
                            label: "Generate Reports",
                        },
                        {
                            label: "ICN Report",
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
                        title="Search ICN Transactions"
                        onReset={reset}
                    />
                </Column>

                <PageContentContainer
                    title="ICN (Instant Credit Notification) Reports"
                    topRightContent={
                        <Filter
                            fileName="ICNReport"
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
                        data={ICNResponseReportResponse?.data || []}
                        loading={l_loading}
                    />

                    <TablePagination
                        paginationData={ICNResponseReportResponse?.pagination}
                        handleChangePage={onPageChange}
                        handleChangeRowsPerPage={onRowsPerPageChange}
                    />
                </PageContentContainer>
            </Column>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.GENERATE_ICN_RESPONSE_REPORT] })(ICNResponseReport);
