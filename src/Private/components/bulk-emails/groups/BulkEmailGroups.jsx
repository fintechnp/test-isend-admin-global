import React, { useState, useEffect, useMemo, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

import Center from "App/components/Center/Center";
import Button from "App/components/Button/Button";
import SearchBox from "App/components/Forms/SearchBox";
import Table, { TablePagination } from "App/components/Table";
import EditIconButton from "App/components/Button/EditIconButton";
import DeleteIconButton from "App/components/Button/DeleteIconButton";

import debounce from "App/helpers/debounce";
import { useConfirm } from "App/core/mui-confirm";

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
};

const BulkEmailGroups = (props) => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: data, loading: isLoading } = useSelector((state) => state.get_bulk_email_group_list);

    const { loading: isDeleting, success: isDeleteSuccess } = useSelector((state) => state.delete_bulk_email_group);

    const { success: isAddSuccess } = useSelector((state) => state.add_bulk_email_group);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_bulk_email_group);

    const confirm = useConfirm();

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            page_number: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            page_number: 1,
            page_size: +pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleOnDelete = (id) => {
        confirm({
            description: "Please Note: All contacts in this group will also be Deleted.",
            confirmationText: "Yes, Delete it.",
        }).then(() => {
            dispatch({ type: "DELETE_BULK_EMAIL_GROUP", bulk_email_group_id: id });
        });
    };

    const handleOnSearch = useCallback((e) => {
        setFilterSchema({ ...filterSchema, search: e.target.value });
    }, []);

    const handleOnClearSearch = useCallback(() => {
        setFilterSchema(initialState);
    }, []);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "group_id",
            },
            {
                Header: "Name",
                accessor: "group_name",
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessor: "show",
                Cell: ({ row }) => (
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

    return (
        <Box>
            <Box display="flex" justifyContent="space-between">
                <SearchBox
                    value={filterSchema?.search ?? ""}
                    onChange={handleOnSearch}
                    onClickClearSearch={handleOnClearSearch}
                />
                <Button onClick={() => dispatch({ type: "OPEN_ADD_BULK_EMAIL_GROUP_MODAL" })}>Add Group</Button>
            </Box>
            <Table
                columns={columns}
                title="EmailGroups"
                data={data?.data || []}
                loading={isLoading}
                rowsPerPage={8}
                totalPage={data?.pagination?.totalPage || 1}
                renderPagination={() => (
                    <TablePagination
                        paginationData={data?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </Box>
    );
};

export default BulkEmailGroups;
