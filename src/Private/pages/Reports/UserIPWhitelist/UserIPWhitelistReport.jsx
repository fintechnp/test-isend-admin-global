import * as Yup from "yup";
import moment from "moment";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import withPermission from "Private/HOC/withPermission";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";

import Filter from "../Shared/Filter";
import actions from "../store/actions";
import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import { FormatDateTime } from "App/helpers";
import { permissions } from "Private/data/permissions";
import useListFilterStore from "App/hooks/useListFilterStore";

const maxDate = dateUtils.today();

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
    created_from_date: moment(maxDate).subtract(30, "days").format("YYYY-MM-DD"),
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

const headers = [
    { label: "Id", key: "whitelist_id" },
    { label: "Email", key: "email" },
    { label: "IP Address", key: "ip_address" },
    { label: "Timestamp", key: "created_ts" },
];

function UserIPWhitelistReport() {
    const dispatch = useDispatch();

    const { response: UserIPWhitelistReport, loading: l_loading } = useSelector(
        (state) => state.get_user_ip_whitelist_report,
    );

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
        onFilterSubmit,
        onDeleteFilterParams,
        onPageChange,
        onRowsPerPageChange,
        onQuickFilter,
        reset,
    } = useListFilterStore({
        initialState,
        resetInitialStateDate: true,
        fromDateParamName: "created_from_date",
        toDateParamName: "created_to_date",
    });

    const csvReport = {
        title: "Report on Customers",
        start: filterSchema?.created_from_date,
        end: filterSchema?.created_to_date,
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: UserIPWhitelistReport?.pagination?.totalCount,
        };
        dispatch(actions.download_report(updatedFilterSchema, "report/user_ip_whitelist"));
    };

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "USER_IP_WHITELIST_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.get_user_ip_whitelist_report(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "ID",
                accessorKey: "whitelist_id",
            },
            {
                header: "Email",
                accessorKey: "email",
            },
            {
                header: "IP Address",
                accessorKey: "ip_address",
            },
            {
                header: "Timestamp",
                accessorKey: "created_ts",
                cell: ({ getValue }) => <>{FormatDateTime(getValue())}</>,
            },
        ],
        [],
    );

    const handleReset = () => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "USER_IP_WHITELIST_REPORT_RESET" });
    };

    const filterFields = [
        {
            type: fieldTypes.DATE,
            name: "created_from_date",
            label: "From Date",
        },
        {
            type: fieldTypes.DATE,
            name: "created_to_date",
            label: "To Date",
        },
    ];

    return (
        <PageContent
            documentTitle="User IP Whitelist Reports"
            breadcrumbs={[
                {
                    label: "Generate Report",
                },
                {
                    label: "User IP Whitelist",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search User IP Whitelist"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                    onSubmit={onFilterSubmit}
                    schema={schema}
                    values={filterSchema}
                    fields={filterFields}
                />
                <PageContentContainer
                    title="User IP Whitelist Reports"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onOrderByChange={onQuickFilter}
                                onSortByChange={onQuickFilter}
                                values={filterSchema}
                                sortByData={[{ key: "None", value: "created_ts" }]}
                            />
                            <Filter
                                fileName="User IP Whitelist Report"
                                success={pd_success}
                                loading={pd_loading}
                                csvReport={csvReport}
                                state={filterSchema}
                                downloadData={downloadData}
                            />
                        </>
                    }
                >
                    <TanstackReactTable
                        columns={columns}
                        data={UserIPWhitelistReport?.data || []}
                        loading={l_loading}
                    />
                </PageContentContainer>
                <TablePagination
                    paginationData={UserIPWhitelistReport?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.GENERATE_USER_IP_WHITELIST_REPORT] })(UserIPWhitelistReport);
