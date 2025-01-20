import React, { useEffect, useState, useMemo, useRef } from "react";
import * as Yup from "yup";

import { useDispatch, useSelector } from "react-redux";

import actions from "../store/actions";
import NoResults from "../Shared/NoResults";
import Loading from "App/components/Loading";
import { TablePagination } from "App/components/Table";
import ReportTitle from "App/components/Title/ReportTitle";
import ICNResponseFilterForm from "./ICNResponseFilterForm";
import PageContent from "App/components/Container/PageContent";
import ReportTable from "Private/components/reports/ReportTable";

import apiEndpoints from "Private/config/apiEndpoints";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import { CountryNameByIso2Code, FormatDateTime } from "App/helpers";
import useListFilterStore from "App/hooks/useListFilterStore";
import Column from "App/components/Column/Column";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterButton from "App/components/Button/FilterButton";
import dateUtils from "App/utils/dateUtils";
import isEmpty from "App/helpers/isEmpty";
import moment from "moment";

const maxDate = dateUtils.today();
const minDate = moment(maxDate).subtract(30, "days").format("YYYY-MM-DD");

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
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
    const isMounted = useRef(false);
    // const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: ICNResponseReportResponse, loading: l_loading } = useSelector(
        (state) => state.get_icn_response_report,
    );

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "ICN_RESPONSE_REPORT_RESET" });
    }, [dispatch]);

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

    useEffect(() => {
        dispatch(actions.get_icn_response_report(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
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
                Cell: (data) => <>{CountryNameByIso2Code(data.value)}</>,
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
                accessorKey: "txndate",
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

    // const handleReset = () => {
    //     isMounted.current = false;
    //     setFilterSchema(initialState);
    //     dispatch({ type: "DOWNLOAD_REPORT_RESET" });
    //     dispatch({ type: "ICN_RESPONSE_REPORT_RESET" });
    // };

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

    const sortData = [
        { label: "Ascending", value: "ASC" },
        { label: "Descending", value: "DESC" },
    ];

    return (
        // <PageContent
        //     documentTitle="ICN (Instant Credit Notification) Reports"
        //     title={<ReportTitle>ICN (Instant Credit Notification) Reports</ReportTitle>}
        // >
        //     <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
        //         <Grid item xs={12}>
        //             <ICNResponseFilterForm onSubmit={handleSearch} onReset={handleReset} loading={l_loading} />
        //         </Grid>
        //         {l_loading && (
        //             <Grid item xs={12}>
        //                 <Loading loading={l_loading} />
        //             </Grid>
        //         )}
        //         {!l_loading && ICNResponseReportResponse?.data && ICNResponseReportResponse?.data?.length === 0 && (
        //             <Grid item xs={12}>
        //                 <NoResults text="No Record Found" />
        //             </Grid>
        //         )}
        //         {/* {!l_loading && ICNResponseReportResponse?.data?.length > 0 && (
        //             <Grid item xs={12}>
        //                 <ReportTable
        //                     columns={columns}
        //                     data={ICNResponseReportResponse?.data || []}
        //                     loading={l_loading}
        //                     rowsPerPage={8}
        //                     renderPagination={() => (
        //                         <TablePagination
        //                             paginationData={ICNResponseReportResponse?.pagination}
        //                             handleChangePage={handleChangePage}
        //                             handleChangeRowsPerPage={handleChangeRowsPerPage}
        //                         />
        //                     )}
        //                     apiEndpoint={apiEndpoints.reports.icnResponse}
        //                     filterQuery={filterSchema}
        //                     filename="ICN Report"
        //                 />
        //             </Grid>
        //         )} */}
        //     </Grid>
        // </PageContent>

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
                        <TableGridQuickFilter
                            onOrderByChange={onQuickFilter}
                            onSortByChange={onQuickFilter}
                            sortByData={sortData}
                            values={filterSchema}
                            disable={l_loading}
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
