import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Filter from "../Shared/Filter";
import Column from "App/components/Column/Column";
import withPermission from "Private/HOC/withPermission";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "../store/actions";
import { permissions } from "Private/data/permissions";
import downloadActions from "../../Reports/store/actions";
import useListFilterStore from "App/hooks/useListFilterStore";

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "ASC",
};

const sortByOptions = [
    {
        key: "None",
        value: "created_ts",
    },
];

const headers = [
    { label: "Id", key: "id" },
    { label: "Name", key: "name" },
    { label: "Result", key: "result" },
    { label: "Sub Result", key: "sub_result" },
    { label: "Summaries", key: "summaries" },
    { label: "Summary", key: "summary" },
];

function OnfidoReport() {
    const dispatch = useDispatch();

    const { response: onfidoReportResponse, loading: l_loading } = useSelector((state) => state.get_onfido_report);

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        onFilterSubmit,
        onDeleteFilterParams,
        reset,
        filterSchema,
        onQuickFilter,
    } = useListFilterStore({ initialState });

    useEffect(() => {
        dispatch({ type: "ONFIDO_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (filterSchema.customer_id) {
            dispatch(actions.get_onfido_report(filterSchema));
        }
    }, [dispatch, filterSchema]);

    const handleReset = () => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "ONFIDO_REPORT_RESET" });
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: onfidoReportResponse?.pagination?.totalCount || 10000,
        };
        dispatch(downloadActions.download_report(updatedFilterSchema, "/onfido/checkkyc"));
    };

    const columns = useMemo(
        () => [
            {
                header: "Name",
                accessorKey: "name",
            },
            {
                header: "Result",
                accessorKey: "result",
            },
            {
                header: "Status",
                accessorKey: "status",
            },
            {
                header: "Sub Result",
                accessorKey: "sub_result",
            },
            {
                header: "Summaries",
                accessorKey: "summaries",
            },
            {
                header: "Summary",
                accessorKey: "summary",
            },
        ],
        [],
    );

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "customer_id",
            label: "Customer Id",
        },
    ];

    const csvReport = {
        title: "Report on Onfido",
        start: filterSchema?.from_date,
        end: filterSchema?.to_date,
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    return (
        <PageContent
            documentTitle="Onfido Reports"
            breadcrumbs={[
                {
                    label: "General Reports",
                },
                {
                    label: "Onfido Reports",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Onfido"
                    open={isFilterOpen}
                    values={filterSchema}
                    onClose={closeFilter}
                    onReset={() => {
                        reset();
                        handleReset();
                    }}
                    onDelete={onDeleteFilterParams}
                    onSubmit={onFilterSubmit}
                    fields={filterFields}
                />
                <PageContentContainer
                    title="Onfido Report"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                sortByData={sortByOptions}
                                disabled={l_loading}
                                values={filterSchema}
                            />
                            <Filter
                                fileName="Onfido Report"
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
                        data={onfidoReportResponse?.data || []}
                        loading={l_loading}
                        noDataMessage={`${filterSchema.customer_id ? "No Data Found" : "Filter with Customer Id to view data"}`}
                    />
                </PageContentContainer>
            </Column>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.GENERATE_ONFIDO_REPORT] })(OnfidoReport);
