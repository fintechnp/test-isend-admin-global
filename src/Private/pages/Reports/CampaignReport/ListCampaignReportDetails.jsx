import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
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

const ListCampaignReportDetails = () => {
    const dispatch = useDispatch();
    const methods = useListFilterStore({ initialState });

    const { isFilterOpen, closeFilter, openFilter, filterSchema, onDeleteFilterParams, onFilterSubmit, reset } =
        methods;

    const { response: campaignReportDetails, loading: isLoading } = useSelector(
        (state) => state.get_campaign_report_details,
    );

    const campaignReportDetailsData = campaignReportDetails?.data?.data ?? [];

    useEffect(() => {
        dispatch(ReportsAction.get_campaign_report_details(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
                cell: (info) => info.row.index + 1,
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
                header: "Usage Date",
                accessorKey: "usageDate",
                cell: ({ getValue }) => dateUtils.getLocalDateTimeFromUTC(getValue()),
            },

            {
                header: "Created At",
                accessorKey: "createdTs",
                cell: ({ getValue }) => dateUtils.getLocalDateTimeFromUTC(getValue()),
            },

            {
                header: "Updated At",
                accessorKey: "updatedTs",
                cell: ({ getValue }) => <>{getValue() ? dateUtils.getLocalDateTimeFromUTC(getValue()) : "-"}</>,
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
        {
            type: "textfield",
            label: "Campaign Type",
            name: "CampaignType",
        },
        {
            type: "textfield",
            label: "Campaign ID",
            name: "CustomerId",
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
                    label: "List Campaign Report Details",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Campaign Report Details"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />

                <PageContentContainer title="List Campaign Report Details">
                    <TanstackReactTable columns={columns} data={campaignReportDetailsData} loading={isLoading} />
                </PageContentContainer>
            </Column>
        </PageContent>
    );
};

export default ListCampaignReportDetails;
