import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterForm from "App/components/Filter/FilterForm";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import CampaignCodeBadge from "App/components/Badge/CampaignCodeBadge";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { ReportsAction } from "../store";

const initialState = {
    Page: 1,
    PageSize: 10,
};

const ListCampaignReport = () => {
    const dispatch = useDispatch();
    const methods = useListFilterStore({ initialState, pageNumberKeyName: "Page", pageSizeKeyName: "PageSize" });

    const {
        isFilterOpen,
        closeFilter,
        openFilter,
        filterSchema,
        onDeleteFilterParams,
        onFilterSubmit,
        reset,
        onPageChange,
        onRowsPerPageChange,
    } = methods;

    const { response: campaignReport, loading: isLoading } = useSelector((state) => state.get_campaign_reports);

    const campaignReportData = campaignReport?.data ?? [];

    useEffect(() => {
        dispatch(ReportsAction.get_campaign_reports(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Campaign Name",
                accessorKey: "campaignName",
            },
            {
                header: "Campaign Type",
                accessorKey: "campaignType",
                cell: ({ getValue }) => <CampaignCodeBadge code={getValue()} />,
            },

            {
                header: "Campaign Code",
                accessorKey: "campaignCode",
            },
            {
                header: "Quantity",
                accessorKey: "quantity",
            },
            {
                header: "Transaction Amount",
                accessorKey: "transactionAmount",
            },
            {
                header: "Service Charge",
                accessorKey: "serviceCharge",
            },
            {
                header: "Campaign Amount",
                accessorKey: "campaignAmount",
            },
            {
                header: "Usage Date",
                accessorKey: "usageDate",
                cell: ({ getValue }) => (
                    <>{!isEmpty(getValue()) ? dateUtils.getLocalDateTimeFromUTC(getValue()) : "-"}</>
                ),
            },

            {
                header: "Created At",
                accessorKey: "createdTs",
                cell: ({ getValue }) => (
                    <>{!isEmpty(getValue()) ? dateUtils.getLocalDateTimeFromUTC(getValue()) : "-"}</>
                ),
            },

            {
                header: "Updated At",
                accessorKey: "updatedTs",
                cell: ({ getValue }) => (
                    <>{!isEmpty(getValue()) ? dateUtils.getLocalDateTimeFromUTC(getValue()) : "-"}</>
                ),
            },
        ],
        [],
    );

    const filterFields = [
        {
            type: "date",
            label: "From Date",
            name: "FromDate",
        },
        {
            type: "date",
            label: "To Date",
            name: "ToDate",
        },
        {
            type: "textfield",
            label: "Campaign Name",
            name: "CampaignName",
        },
    ];

    return (
        <PageContent
            documentTitle="List Campaign Report"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "Dashboard",
                },
                {
                    label: "Report",
                },
                {
                    label: "List Campaign Report",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Campaign Report"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />

                <PageContentContainer title="List Campaign Reports">
                    <TanstackReactTable columns={columns} data={campaignReportData} loading={isLoading} />
                </PageContentContainer>

                <TablePagination
                    paginationData={campaignReport?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
};

export default ListCampaignReport;
