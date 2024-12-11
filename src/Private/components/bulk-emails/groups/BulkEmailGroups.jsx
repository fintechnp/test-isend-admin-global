import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import React, { useState, useEffect, useMemo, useCallback } from "react";

import Center from "App/components/Center/Center";
import Button from "App/components/Button/Button";
import Column from "App/components/Column/Column";
import SearchBox from "App/components/Forms/SearchBox";
import Table, { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import EditIconButton from "App/components/Button/EditIconButton";
import DeleteIconButton from "App/components/Button/DeleteIconButton";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
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

const BulkEmailGroups = (props) => {
    const dispatch = useDispatch();

    const { response: data, loading: isLoading } = useSelector((state) => state.get_bulk_email_group_list);

    const { loading: isDeleting, success: isDeleteSuccess } = useSelector((state) => state.delete_bulk_email_group);

    const { success: isAddSuccess } = useSelector((state) => state.add_bulk_email_group);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_bulk_email_group);

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
            description: "Please Note: All contacts in this group will also be Deleted.",
            confirmationText: "Yes, Delete it.",
        }).then(() => {
            dispatch({ type: "DELETE_BULK_EMAIL_GROUP", bulk_email_group_id: id });
        });
    };

    const columns = useMemo(
        () => [
            {
                header: "Id",
                accessorKey: "group_id",
            },
            {
                header: "Name",
                accessorKey: "group_name",
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
                                    type: "OPEN_UPDATE_BULK_EMAIL_GROUP_MODAL",
                                    bulk_email_group_id: row.original.group_id,
                                    initial_form_state: {
                                        group_name: row.original.group_name,
                                    },
                                });
                            }}
                        />
                        <DeleteIconButton onClick={() => handleOnDelete(row.original.group_id)} />
                    </Center>
                ),
            },
        ],
        [],
    );

    useEffect(() => {
        dispatch({ type: "UPDATE_BULK_EMAIL_GROUP_RESET" });
        dispatch({ type: "ADD_BULK_EMAIL_GROUP_RESET" });
        const timeout = debounce(() => {
            dispatch({ type: "GET_BULK_EMAIL_GROUPS", query: filterSchema });
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
                    label: "Groups",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Email Groups"
                    values={filterSchema}
                    open={isFilterOpen}
                    fields={filterFields}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer
                    topRightContent={
                        <Button onClick={() => dispatch({ type: "OPEN_ADD_BULK_EMAIL_GROUP_MODAL" })}>Add Group</Button>
                    }
                >
                    <TanstackReactTable
                        columns={columns}
                        title="EmailGroups"
                        data={data?.data || []}
                        loading={isLoading}
                    />
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

export default BulkEmailGroups;
