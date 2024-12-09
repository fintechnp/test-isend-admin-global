import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import FilterForm from "App/components/Filter/FilterForm";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { ReportsAction } from "../../store";
import EditCampaignIncentiveStatusModal from "./EditCampaignIncentiveStatusModal";

const initialState = {
    Page: 1,
    PageSize: 10,
};

const ListCampaignIncentiveReport = () => {
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

    const { response: campaignReport, loading: isLoading } = useSelector(
        (state) => state.get_campaign_incentive_report,
    );

    const campaignIncentiveReportData = campaignReport?.data ?? [];

    useEffect(() => {
        dispatch(ReportsAction.get_campaign_incentive_report(filterSchema));
    }, [dispatch, filterSchema]);

    const handleCampaignIncentiveStatus = (data) => {
        dispatch(ReportsAction.open_campaign_incentive_modal(data));
    };

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
                header: "Campaign ID",
                accessorKey: "campaign",
            },

            {
                header: "Currency",
                accessorKey: "currency",
            },
            {
                header: "Is Paid ?",
                accessorKey: "isPaid",
            },
            {
                header: "Status",
                accessorKey: "status",
            },
            {
                header: "Created At",
                cell: ({ row }) => (
                    <>
                        {row.original.createdTs
                            ? dateUtils.getFormattedDate(row.original.createdTs, "MM/DD/YYYY hh:mm A")
                            : "-"}
                    </>
                ),
            },
            {
                header: "Created By",
                accessorKey: "createdBy",
            },

            {
                header: "Updated By",
                accessorKey: "updatedBy",
            },
            {
                header: "Action",
                accessorKey: "action",
                cell: ({ row }) => {
                    return (
                        <PopoverButton>
                            {({ onClose }) => (
                                <ListItemButton
                                    onClick={() => dispatch(ReportsAction.open_campaign_incentive_modal(row.original))}
                                >
                                    Update
                                </ListItemButton>
                            )}
                        </PopoverButton>
                    );
                },
            },
        ],
        [],
    );

    const filterFields = [
        {
            type: "textfield",
            label: "Transaction ID",
            name: "TransactionId",
        },
        {
            type: "textfield",
            label: "Campaign ID",
            name: "CampaignId",
        },

        {
            type: "textfield",
            label: "Campaign Name",
            name: "CampaignName",
        },
        {
            type: "textfield",
            label: "Status",
            name: "status",
        },
    ];

    return (
        <PageContent
            documentTitle="List Campaign Incentive Report"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
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
                    title="Search Campaign Incentive Report"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />

                <PageContentContainer title="List  Campaign Incentive Reports">
                    <TanstackReactTable columns={columns} data={campaignIncentiveReportData} loading={isLoading} />
                </PageContentContainer>

                <TablePagination
                    paginationData={campaignReport?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>

            <EditCampaignIncentiveStatusModal />
        </PageContent>
    );
};

export default ListCampaignIncentiveReport;
