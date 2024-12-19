import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo } from "react";
import ListItemButton from "@mui/material/ListItemButton";

import dateUtils from "App/utils/dateUtils";
import buildRoute from "App/helpers/buildRoute";
import Column from "App/components/Column/Column";
import Button from "App/components/Button/Button";
import { useConfirm } from "App/core/mui-confirm";
import routePaths from "Private/config/routePaths";
import { TablePagination } from "App/components/Table";
import FilterForm from "App/components/Filter/FilterForm";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import CampaignCodeBadge from "App/components/Badge/CampaignCodeBadge";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { promoCodeActions } from "../store";
import { campaignStatus } from "../data/campaignStatus";

const initialState = {
    Page: 1,
    PageSize: 10,
};

const ListPromoCode = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const methods = useListFilterStore({ initialState, pageNumberKeyName: "Page", pageSizeKeyName: "PageSize" });

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        filterSchema,
        onRowsPerPageChange,
        onFilterSubmit,
        onPageChange,
        onDeleteFilterParams,
        reset,
    } = methods;
    const { response: promoCodes, loading: isLoading } = useSelector((state) => state.get_promo_codes);

    const { success: isStatusSuccess, loading } = useSelector((state) => state.update_promo_code_status);

    const data = promoCodes?.data ?? [];

    useEffect(() => {
        dispatch(promoCodeActions.get_promo_codes(filterSchema));
    }, [dispatch, filterSchema]);

    useEffect(() => {
        if (isStatusSuccess) {
            dispatch(promoCodeActions.get_promo_codes(filterSchema));
        }
    }, [dispatch, isStatusSuccess]);

    const hangleToggleStatus = (id, status) => {
        confirm({
            description: `Are you sure you want to ${status === campaignStatus.ACTIVE ? "deactivate" : "activate"} this campaign?`,
            confirmationText: "Yes",
        }).then(() => {
            dispatch(
                promoCodeActions.update_promo_code_status({
                    campaignId: id,
                    status: status === campaignStatus.ACTIVE ? campaignStatus.INACTIVE : campaignStatus.ACTIVE,
                }),
            );
        });
    };

    const columns = useMemo(() => [
        {
            header: "S.N.",
            accessorKey: "f_serial_no",
            maxWidth: 50,
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
            header: "Campaign Start Date",
            accessorKey: "startDate",
            cell: ({ getValue }) => (getValue() ? dateUtils.getFormattedDate(getValue(), "MM/DD/YYYY hh:mm A") : "-"),
        },
        {
            header: "Campaign End Date",
            accessorKey: "endDate",
            cell: ({ getValue }) => (getValue() ? dateUtils.getFormattedDate(getValue(), "MM/DD/YYYY hh:mm A") : "-"),
        },
        {
            header: "Available Budget",
            accessorKey: "budget",
        },
        {
            header: "Status",
            accessorKey: "statusName",
        },
        {
            header: "Created At/By",
            accessorKey: "createdTs",
            cell: ({ getValue, row }) => (
                <Column>
                    <Typography>
                        {getValue() ? dateUtils.getFormattedDate(getValue(), "MM/DD/YYYY hh:mm A") : ""}
                    </Typography>
                    <Typography>{row.original?.createdBy ? row.original?.createdBy : ""}</Typography>
                </Column>
            ),
        },
        {
            header: "Updated At/By",
            accessorKey: "updatedTs",
            cell: ({ getValue, row }) => (
                <Column>
                    <Typography>
                        {getValue() ? dateUtils.getFormattedDate(getValue(), "MM/DD/YYYY hh:mm A") : ""}
                    </Typography>
                    <Typography>{row.original?.updatedBy ? row.original?.updatedBy : ""}</Typography>
                </Column>
            ),
        },
        {
            header: "Action",
            accessorKey: "action",
            cell: ({ row }) => {
                return (
                    <PopoverButton>
                        {({ onClose }) => (
                            <>
                                <ListItemButton
                                    onClick={() =>
                                        navigate(buildRoute(routePaths.ListCampaignLedgerReport, row?.original?.id))
                                    }
                                >
                                    View Ledger Report
                                </ListItemButton>
                                <ListItemButton
                                    onClick={() => navigate(buildRoute(routePaths.ViewPromoCode, row?.original?.id))}
                                >
                                    View Campaign
                                </ListItemButton>

                                <ListItemButton
                                    onClick={() => navigate(buildRoute(routePaths.EditPromoCode, row?.original?.id))}
                                >
                                    Edit Campaign
                                </ListItemButton>

                                <ListItemButton
                                    onClick={() => hangleToggleStatus(row.original.id, row.original.status, onClose())}
                                >
                                    Edit Status
                                </ListItemButton>
                            </>
                        )}
                    </PopoverButton>
                );
            },
        },
    ]);

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
            documentTitle="List Campaign"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "List Campaign",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Campaign"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />

                <PageContentContainer
                    title="List Campaign"
                    topRightContent={
                        <>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => navigate(buildRoute(routePaths.CreatePromoCode))}
                            >
                                Add Campaign
                            </Button>
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={data} loading={isLoading} />
                </PageContentContainer>

                <TablePagination
                    paginationData={promoCodes?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
};

export default ListPromoCode;
