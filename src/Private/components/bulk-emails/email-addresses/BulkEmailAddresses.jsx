import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useMemo, useCallback } from "react";

import Center from "App/components/Center/Center";
import Button from "App/components/Button/Button";
import Column from "App/components/Column/Column";
import SearchBox from "App/components/Forms/SearchBox";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import EditIconButton from "App/components/Button/EditIconButton";
import DeleteIconButton from "App/components/Button/DeleteIconButton";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import Table, { TablePagination, TableSwitch } from "App/components/Table";
import PageContentContainer from "App/components/Container/PageContentContainer";

import debounce from "App/helpers/debounce";
import { useConfirm } from "App/core/mui-confirm";
import useListFilterStore from "App/hooks/useListFilterStore";

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
};

const BulkEmailAddresses = (props) => {
    const dispatch = useDispatch();

    const { response: data, loading: isLoading } = useSelector((state) => state.get_bulk_email_address_list);

    const { loading: isDeleting, success: isDeleteSuccess } = useSelector((state) => state.delete_bulk_email_address);

    const { success: isAddSuccess } = useSelector((state) => state.add_bulk_email_address);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_bulk_email_address);

    const { success: isImportSuccess } = useSelector((state) => state.import_confirm_bulk_email_address);

    const confirm = useConfirm();

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        filterSchema,
        reset,
        onFilterSubmit,
        onDeleteFilterParams,
        onPageChange,
        onRowsPerPageChange,
    } = useListFilterStore({ initialState });

    const handleOnDelete = (id) => {
        confirm({
            description: "This action will remove record permanently",
            confirmationText: "Yes, Delete it.",
        }).then(() => {
            dispatch({ type: "DELETE_BULK_EMAIL_ADDRESS", bulk_email_address_id: id });
        });
    };

    const handleStatus = useCallback((is_active, id) => {
        dispatch({
            type: "UPDATE_BULK_EMAIL_ADDRESS_STATUS",
            bulk_email_address_id: id,
            status: is_active,
        });
    }, []);

    useEffect(() => {
        dispatch({ type: "IMPORT_BULK_EMAIL_ADDRESS_RESET" });
        dispatch({ type: "IMPORT_CONFIRM_BULK_EMAIL_ADDRESS_RESET" });
    }, [isImportSuccess]);

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "email_id",
            },
            {
                header: "Name",
                accessorKey: "name",
            },
            {
                header: "Email",
                accessorKey: "email",
            },
            {
                header: "Group",
                accessorKey: "group_name",
            },
            {
                header: "Status",
                accessorKey: "is_active",
                cell: ({ getValue, row }) => (
                    <TableSwitch value={getValue()} dataId={row.original.email_id} handleStatus={handleStatus} />
                ),
            },
            {
                header: () => (
                    <Box textAlign="center">
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessorKey: "show",
                cell: ({ row }) => (
                    <Center>
                        <EditIconButton
                            onClick={() => {
                                dispatch({
                                    type: "OPEN_UPDATE_BULK_EMAIL_ADDRESS_MODAL",
                                    bulk_email_address_id: row.original.email_id,
                                    initial_form_state: {
                                        group_id: row.original.group_id,
                                        email: row.original.email,
                                        name: row.original.name,
                                        is_active: row.original.is_active,
                                    },
                                });
                            }}
                        />
                        <DeleteIconButton onClick={() => handleOnDelete(row.original.email_id)} />
                    </Center>
                ),
            },
        ],
        [],
    );

    useEffect(() => {
        dispatch({ type: "UPDATE_BULK_EMAIL_ADDRESS_RESET" });
        dispatch({ type: "ADD_BULK_EMAIL_ADDRESS_RESET" });
        const timeout = debounce(() => {
            dispatch({ type: "GET_BULK_EMAIL_ADDRESSES", query: filterSchema });
        }, 500);

        return () => clearTimeout(timeout);
    }, [dispatch, filterSchema, isDeleting, isAddSuccess, isDeleteSuccess, isUpdateSuccess]);

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "search",
            label: "Search",
        },
    ];

    return (
        <PageContent
            documentTitle="Email Groups"
            breadcrumbs={[
                {
                    label: "Utilites",
                },
                {
                    label: "Email Address",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Email Address"
                    values={filterSchema}
                    open={isFilterOpen}
                    fields={filterFields}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer
                    title="EmailGroups"
                    topRightContent={
                        <Box display="flex" gap={2}>
                            <Button onClick={() => dispatch({ type: "OPEN_ADD_BULK_EMAIL_ADDRESS_MODAL" })}>
                                Add Email Address
                            </Button>
                            <Button onClick={() => dispatch({ type: "OPEN_IMPORT_BULK_EMAIL_ADDRESS_MODAL" })}>
                                Import Email Address
                            </Button>
                        </Box>
                    }
                >
                    <TanstackReactTable columns={columns} data={data?.data || []} loading={isLoading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={data?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
};

export default BulkEmailAddresses;
