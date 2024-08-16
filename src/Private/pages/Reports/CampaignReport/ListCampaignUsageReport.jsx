import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
import FilterForm from "App/components/Filter/FilterForm";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { ReportsAction } from "../store";
import { useParams } from "react-router-dom";
import routePaths from "Private/config/routePaths";

const initialState = {
    Page: 1,
    PageSize: 10,
};

const ListCampaignUsageReport = () => {
    const dispatch = useDispatch();
    const methods = useListFilterStore({ initialState });

    const { id } = useParams();

    const { isFilterOpen, closeFilter, openFilter, filterSchema, onDeleteFilterParams, onFilterSubmit, reset } =
        methods;

    const { response: campaignUsageReport, loading: isLoading } = useSelector(
        (state) => state.get_campaign_code_report_usage,
    );

    const campaignUsageReportData = campaignUsageReport?.data ?? [];

    useEffect(() => {
        dispatch(
            ReportsAction.get_promo_code_usage_report({
                CampaignId: id,
            }),
        );
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Transaction ID",
                accessorKey: "transactionId",
            },
            {
                header: "Usage Date",
                accessorKey: "usageDate",
                cell: ({ getValue }) => dateUtils.getLocalDateTimeFromUTC(getValue()),
            },
            {
                header: "Customer Name",
                accessorKey: "customerName",
            },
            {
                header: "Amount Redeemed",
                accessorKey: "amountRedeemed",
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
                header: "Unique Transaction ID",
                accessorKey: "uniqueTransactionId",
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
            documentTitle="List Campaign Usage Report"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "Report",
                },
                {
                    label: "View",
                    link: `${routePaths.ViewPromoCode.replace(":id", id)}`,
                },
                {
                    label: "List Campaign Usage Report",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Campaign Usage Report"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />

                <PageContentContainer title="List Campaign Reports">
                    <TanstackReactTable columns={columns} data={campaignUsageReportData} loading={isLoading} />
                </PageContentContainer>
            </Column>
        </PageContent>
    );
};

export default ListCampaignUsageReport;
