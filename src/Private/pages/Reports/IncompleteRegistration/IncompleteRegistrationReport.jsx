import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import actions from "../store/actions";
import { CountryName } from "App/helpers";
import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import { permissions } from "Private/data/permissions";
import apiEndpoints from "Private/config/apiEndpoints";
import withPermission from "Private/HOC/withPermission";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import PageContentContainer from "App/components/Container/PageContentContainer";

import Filter from "../Shared/Filter";

const initialState = {
    page_number: 1,
    page_size: 15,
    created_from_date: dateUtils.getDateBeforeTwoWeeks(),
    created_to_date: dateUtils.getTodayDate(),
};

function IncompleteRegistrationReport() {
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

    const { response: incompleteRegistrationResponse, loading: isReportLoading } = useSelector(
        (state) => state.get_incomplete_registration_report,
    );

    const incompleteRegistrationData = incompleteRegistrationResponse?.data || [];

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "INCOMPLETE_REGISTRATION_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.get_incomplete_registration_report(filterSchema));
    }, [dispatch, filterSchema]);

    const filterFields = [
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

        {
            type: fieldTypes.COUNTRY_SELECT,
            name: "country",
            label: "Country",
        },

        {
            type: fieldTypes.TEXTFIELD,
            name: "mobile_number",
            label: "Mobile Number",
        },
        {
            type: fieldTypes.TEXTFIELD,
            name: "email",
            label: "Email",
        },
    ];

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "Email",
                accessorKey: "email",
            },
            {
                header: "Email Confirmed",
                accessorKey: "email_confirmed",
            },

            {
                header: "Phone No.",
                accessorKey: "phone_number",
            },
            {
                header: "Phone No. Confirmed",
                accessorKey: "phone_number_confirmed",
            },
            {
                header: "Phone Confirm Count",
                accessorKey: "phone_confirm_count",
            },
            {
                header: "Country",
                accessorKey: "country",
                cell: ({ getValue }) => <>{getValue() ? CountryName(getValue()) : "N/A"}</>,
            },
            {
                header: "Created At",
                accessorKey: "created_ts",
                cell: ({ getValue }) => <Column>{getValue() ? dateUtils.getFormattedDate(getValue()) : "N/A"}</Column>,
            },
        ],
        [],
    );

    const headers = [
        { label: "Email", key: "email" },
        { label: "Email Confirmed", key: "email_confirmed" },
        { label: "Phone No. Confirmed", key: "phone_number_confirmed" },
        { label: "Phone Confirm Count", key: "phone_confirm_count" },
        { label: "Created At", key: "created_ts" },
    ];

    const csvReport = {
        title: "Incomplete Registration Report",
        start: dateUtils.getLocalDateFromUTC(filterSchema?.created_from_date),
        end: dateUtils.getLocalDateFromUTC(filterSchema?.created_to_date),
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: 100,
        };
        dispatch(actions.download_report(updatedFilterSchema, apiEndpoints.reports.incompleteRegistration));
    };

    return (
        <PageContent
            documentTitle="Incomplete Registration Reports"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "Generate Reports",
                },
                {
                    label: "Incomplete Registration",
                },
            ]}
        >
            <Column>
                <Column
                    sx={{
                        marginY: 2,
                    }}
                >
                    <FilterForm
                        open={isFilterOpen}
                        onClose={closeFilter}
                        onSubmit={onFilterSubmit}
                        fields={filterFields}
                        values={filterSchema}
                        onDelete={onDeleteFilterParams}
                        title="Search Incomplete Registration"
                        onReset={onreset}
                    />
                </Column>

                <PageContentContainer
                    title="Incomplete Registration Report"
                    topRightContent={
                        <Filter
                            fileName="IncompleteRegistrationReports"
                            success={pd_success}
                            loading={pd_loading}
                            csvReport={csvReport}
                            state={filterSchema}
                            downloadData={downloadData}
                        />
                    }
                >
                    <TanstackReactTable columns={columns} data={incompleteRegistrationData} loading={isReportLoading} />

                    <TablePagination
                        paginationData={incompleteRegistrationResponse?.pagination}
                        handleChangePage={onPageChange}
                        handleChangeRowsPerPage={onRowsPerPageChange}
                    />
                </PageContentContainer>
            </Column>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.GENERATE_INCOMPLETE_REGISTRATION_REPORT] })(
    IncompleteRegistrationReport,
);
