import { useParams } from "react-router-dom";
import Column from "App/components/Column/Column";
import React, { useEffect, useMemo } from "react";
import routePaths from "Private/config/routePaths";
import { useDispatch, useSelector } from "react-redux";

import FilterForm from "App/components/Filter/FilterForm";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { ReportsAction } from "../store";
import dateUtils from "App/utils/dateUtils";

const initialState = {
    Page: 1,
    PageSize: 10,
};

const ListCampaignLedgerReport = () => {
    const dispatch = useDispatch();
    const methods = useListFilterStore({ initialState });
    const { id } = useParams();

    const { isFilterOpen, closeFilter, openFilter, filterSchema, onDeleteFilterParams, onFilterSubmit, reset } =
        methods;

    const { response: campaignLedgerReport, loading: isLoading } = useSelector(
        (state) => state.get_campaign_ledger_report,
    );

    const campaignLedgerReportData = campaignLedgerReport?.data?.data ?? [];

    useEffect(() => {
        dispatch(
            ReportsAction.get_campaign_ledger_report({
                CampaignId: id,
            }),
        );
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
                cell: (info) => info.row.index + 1,
            },

            {
                header: "Campaign Name",
                accessorKey: "CampaignName",
            },
            {
                header: "Transaction ID",
                accessorKey: "TransactionId",
                cell: ({ getValue }) => <>{getValue() ? getValue() : "-"}</>,
            },
            {
                header: "Usage DateTime",
                accessorKey: "UsageDateTime",
                cell: ({ getValue }) => <>{getValue() ? dateUtils.getLocalDateTimeFromUTC(getValue()) : "-"}</>,
            },
            {
                header: "Description",
                accessorKey: "Description",
            },
            {
                header: "Debit Amount",
                accessorKey: "Dr_amt",
            },
            {
                header: "Credit Amount",
                accessorKey: "Cr_amt",
            },
            {
                header: "Balance",
                accessorKey: "Balance",
            },
            {
                header: "Created At",
                accessorKey: "created_ts",
                cell: ({ getValue }) => dateUtils.getLocalDateTimeFromUTC(getValue()),
            },

            {
                header: "Updated At",
                accessorKey: "updated_ts",
                cell: ({ getValue }) => <>{getValue() ? dateUtils.getLocalDateTimeFromUTC(getValue()) : "-"}</>,
            },
        ],
        [],
    );

    const filterFields = [
        {
            type: "date",
            label: "Start Date",
            name: "StartDate",
        },
        {
            type: "date",
            label: "End Date",
            name: "EndDate",
        },
    ];

    return (
        <PageContent
            documentTitle="List Campaign Ledger Report"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "Dashboard",
                },
                {
                    label: "List Campaign",
                    link: routePaths.ListPromoCode,
                },
                {
                    label: "Campaign Ledger Report",
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
                    <TanstackReactTable columns={columns} data={campaignLedgerReportData} loading={isLoading} />
                </PageContentContainer>
            </Column>
        </PageContent>
    );
};

export default ListCampaignLedgerReport;
