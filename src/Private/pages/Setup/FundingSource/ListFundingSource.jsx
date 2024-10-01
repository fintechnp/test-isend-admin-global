import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useCallback, useEffect, useMemo } from "react";

import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import HasPermission from "Private/components/shared/HasPermission";
import { TablePagination, TableSwitch } from "App/components/Table";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import fundingSourceActions from "Private/features/funding-sources/fundingSourceActions";
import AddFundingSourceModal from "Private/components/funding-sources/AddFundingSourceModal";
import EditFundingSourceModal from "Private/components/funding-sources/EditFundingSourceModal";

import dateUtils from "App/utils/dateUtils";
import { useConfirm } from "App/core/mui-confirm";
import useCountries from "App/hooks/useCountries";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import useListFilterStore from "App/hooks/useListFilterStore";

const initialState = {
    page_number: 1,
    page_size: 10,
    sort_by: "created_ts",
    order_by: "DESC",
};

function ListFundingSource() {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const { getCountryNameByIso3 } = useCountries();

    const { success: isAddSuccess } = useSelector((state) => state.add_funding_source);
    const { success: isUpdateSuccess } = useSelector((state) => state.update_funding_source);
    const { response: data, loading: isLoading } = useSelector((state) => state.get_funding_source_list);
    const { loading: isDeleting, success: isDeleteSuccess } = useSelector((state) => state.delete_funding_source);

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "payment_name",
            label: "Payment Name",
        },
        {
            type: fieldTypes.COUNTRY_SELECT,
            name: "country",
            label: "Country",
        },
    ];

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Payment Name", value: "payment_name" },
        { key: "Payment Value", value: "payment_value" },
        { key: "Country", value: "country" },
    ];

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        onQuickFilter,
        onDeleteFilterParams,
        onFilterSubmit,
        onPageChange,
        onRowsPerPageChange,
        reset,
        filterSchema,
    } = useListFilterStore({ initialState });

    const handleStatus = useCallback((is_active, id) => {
        const status = is_active ? "Active" : "Inactive";
        confirm({
            description: `You want to change the status to ${status} ?`,
            confirmationText: "Yes",
        }).then(() => {
            dispatch(fundingSourceActions.update_funding_source_status(id, { is_active: is_active }));
        });
    }, []);

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "fundingsource_id",
            },
            {
                header: "Payment Name",
                accessorKey: "payment_name",
                cell: ({ getValue, row }) => (getValue() ? getValue() : "-"),
            },
            {
                header: "Payment Value",
                accessorKey: "payment_value",
                cell: ({ getValue, row }) => (getValue() ? getValue() : "-"),
            },
            {
                header: "Country",
                accessorKey: "country",
                cell: ({ getValue, row }) => (getValue() ? getCountryNameByIso3(getValue()) : "-"),
            },
            {
                header: "Currency",
                accessorKey: "currency",
                cell: ({ getValue, row }) => (getValue() ? getValue() : "-"),
            },
            {
                header: "Status",
                accessorKey: "is_active",
                cell: ({ getValue, row }) => (
                    <TableSwitch
                        value={getValue()}
                        dataId={row.original.fundingsource_id}
                        handleStatus={handleStatus}
                    />
                ),
            },
            {
                header: "Created Date",
                accessorKey: "created_ts",
                cell: ({ getValue }) => (getValue() ? dateUtils.getLocalDateTimeFromUTC(getValue()) : "-"),
            },
            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => {
                    return (
                        <PopoverButton>
                            {({ onClose }) => (
                                <>
                                    <HasPermission permission={permissions.EDIT_FUNDING_SOURCE}>
                                        <ListItemButton
                                            onClick={() => {
                                                dispatch({
                                                    type: "OPEN_UPDATE_FUNDING_SOURCE_MODAL",
                                                    payload: row.original,
                                                });
                                                onClose();
                                            }}
                                        >
                                            Edit
                                        </ListItemButton>
                                    </HasPermission>
                                    <HasPermission permission={permissions.DELETE_FUNDING_SOURCE}>
                                        <ListItemButton
                                            onClick={() => {
                                                dispatch(
                                                    fundingSourceActions.delete_funding_source(
                                                        row.original.fundingsource_id,
                                                    ),
                                                );
                                                onClose();
                                            }}
                                        >
                                            Delete
                                        </ListItemButton>
                                    </HasPermission>
                                </>
                            )}
                        </PopoverButton>
                    );
                },
            },
        ],
        [],
    );

    useEffect(() => {
        dispatch(fundingSourceActions.get_funding_sources(filterSchema));
        dispatch({ type: "DELETE_FUNDING_SOURCE_RESET" });
    }, [dispatch, filterSchema, isDeleting, isAddSuccess, isDeleteSuccess, isUpdateSuccess]);

    return (
        <PageContent
            title="Funding Sources"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <HasPermission permission={permissions.CREATE_FUNDING_SOURCE}>
                <AddFundingSourceModal />
            </HasPermission>
            <HasPermission permission={permissions.EDIT_FUNDING_SOURCE}>
                <EditFundingSourceModal />
            </HasPermission>
            <FilterForm
                open={isFilterOpen}
                onClose={closeFilter}
                onSubmit={onFilterSubmit}
                fields={filterFields}
                values={filterSchema}
                onDelete={onDeleteFilterParams}
                title="Search Funding Source"
                onReset={reset}
            />
            <PageContentContainer
                title="Funding Source"
                topRightContent={
                    <>
                        <TableGridQuickFilter
                            onSortByChange={onQuickFilter}
                            onOrderByChange={onQuickFilter}
                            disabled={isLoading}
                            sortByData={sortData}
                            values={filterSchema}
                        />
                        <HasPermission permission={permissions.CREATE_FUNDING_SOURCE}>
                            <Button
                                variant="contained"
                                onClick={() => dispatch({ type: "OPEN_ADD_FUNDING_SOURCE_MODAL" })}
                            >
                                Add Funding Source
                            </Button>
                        </HasPermission>
                    </>
                }
            >
                <TanstackReactTable columns={columns} data={data?.data ?? []} loading={isLoading} />
            </PageContentContainer>
            <TablePagination
                paginationData={data?.pagination}
                handleChangePage={onPageChange}
                handleChangeRowsPerPage={onRowsPerPageChange}
            />
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_FUNDING_SOURCE] })(ListFundingSource);
