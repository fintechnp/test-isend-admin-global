import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useMemo } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import TablePagination from "@mui/material/TablePagination";

import dateUtils from "App/utils/dateUtils";
import buildRoute from "App/helpers/buildRoute";
import Column from "App/components/Column/Column";
import Button from "App/components/Button/Button";
import { useConfirm } from "App/core/mui-confirm";
import FilterForm from "App/components/Filter/FilterForm";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { promoCodeActions } from "./store";
import routePaths from "Private/config/routePaths";
import { campaignStatus } from "./data/campaignStatus";

const initialState = {
    Page: 1,
    PageSize: 10,
};

const ListPromoCode = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const methods = useListFilterStore({ initialState });

    const {
        isFilterOpen,
        closeFilter,
        openFilter,
        filterSchema,
        onDeleteFilterParams,
        onFilterSubmit,
        onPageChange,
        onRowsPerPageChange,
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
            dispatch(promoCodeActions.get_promo_codes());
        } else if (!isStatusSuccess) {
            dispatch(promoCodeActions.get_promo_codes());
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
        },
        {
            header: "Campaign Type ID",
            accessorKey: "campaignTypeId",
        },
        {
            header: "Campaign Start Date",
            accessorKey: "startDate",
            cell: ({ getValue }) => dateUtils.getLocalDateTimeFromUTC(getValue()),
        },
        {
            header: "Campaign End Date",
            accessorKey: "endDate",
            cell: ({ getValue }) => dateUtils.getLocalDateTimeFromUTC(getValue()),
        },
        {
            header: "Status",
            accessorKey: "statusName",
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
        {
            header: "Action",
            accessorKey: "action",
            cell: ({ row }) => {
                return (
                    <PopoverButton>
                        {({ onClose }) => (
                            <>
                                <ListItemButton
                                    onClick={() => navigate(buildRoute(routePaths.ViewPromoCode, row?.original?.id))}
                                >
                                    View Campaign
                                </ListItemButton>

                                <ListItemButton>Edit Campaign</ListItemButton>

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
                    label: "Dashboard",
                },
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
                                Add Promo Code
                            </Button>
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={data} />
                </PageContentContainer>
            </Column>

            <TablePagination
                paginationData={promoCodes?.pagination}
                handleChangePage={onPageChange}
                handleChangeRowsPerPage={onRowsPerPageChange}
            />
        </PageContent>
    );
};

export default ListPromoCode;
