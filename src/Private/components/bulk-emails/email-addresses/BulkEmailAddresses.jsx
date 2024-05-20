import React, { useState, useEffect, useMemo, useCallback } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

import Center from "App/components/Center/Center";
import Button from "App/components/Button/Button";
import SearchBox from "App/components/Forms/SearchBox";
import EditIconButton from "App/components/Button/EditIconButton";
import DeleteIconButton from "App/components/Button/DeleteIconButton";
import Table, { TablePagination, TableSwitch } from "App/components/Table";

import debounce from "App/helpers/debounce";
import { useConfirm } from "App/core/mui-confirm";

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
};

const BulkEmailAddresses = (props) => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: data, loading: isLoading } = useSelector((state) => state.get_bulk_email_address_list);

    const { loading: isDeleting, success: isDeleteSuccess } = useSelector((state) => state.delete_bulk_email_address);

    const { success: isAddSuccess } = useSelector((state) => state.add_bulk_email_address);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_bulk_email_address);

    const { success: isImportSuccess } = useSelector((state) => state.import_confirm_bulk_email_address);

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
            description: "This action will remove record permanently",
            confirmationText: "Yes, Delete it.",
        }).then(() => {
            dispatch({ type: "DELETE_BULK_EMAIL_ADDRESS", bulk_email_address_id: id });
        });
    };

    const handleOnSearch = useCallback((e) => {
        setFilterSchema({ ...filterSchema, search: e.target.value });
    }, []);

    const handleOnClearSearch = useCallback(() => {
        setFilterSchema(initialState);
    }, []);

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
                Header: "Id",
                accessor: "email_id",
            },
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Group",
                accessor: "group_name",
            },
            {
                Header: "Status",
                accessor: "is_active",
                width: 120,
                Cell: (data) => (
                    <TableSwitch value={data?.value} dataId={data.row.original.email_id} handleStatus={handleStatus} />
                ),
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

    return (
        <Box>
            <Box display="flex" justifyContent="space-between">
                <SearchBox
                    value={filterSchema?.search ?? ""}
                    onChange={handleOnSearch}
                    onClickClearSearch={handleOnClearSearch}
                />
                <Box display="flex" gap={2}>
                    <Button onClick={() => dispatch({ type: "OPEN_ADD_BULK_EMAIL_ADDRESS_MODAL" })}>
                        Add Email Address
                    </Button>
                    <Button onClick={() => dispatch({ type: "OPEN_IMPORT_BULK_EMAIL_ADDRESS_MODAL" })}>
                        Import Email Address
                    </Button>
                </Box>
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

export default BulkEmailAddresses;
