import React, { useState, useEffect, useMemo, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import { Delete } from "App/components";
import Center from "App/components/Center/Center";
import Table, { TablePagination, TableSwitch } from "App/components/Table";

import bulkEmailGroupActions from "Private/features/bulk-emails/bulkEmailGroupActions";
import DeleteIconButton from "App/components/Button/DeleteIconButton";
import EditIconButton from "App/components/Button/EditIconButton";

const initialState = {
    page_number: 1,
    page_size: 15,
};

const BulkEmailGroups = (props) => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: data, loading: isLoading } = useSelector((state) => state.get_bulk_email_group_list);

    const { loading: isDeleting, success: isDeleteSuccess } = useSelector((state) => state.delete_bulk_email_group);

    const { success: isAddSuccess } = useSelector((state) => state.add_bulk_email_group);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_bulk_email_group);

    useEffect(() => {
        dispatch({ type: "GET_BULK_EMAIL_GROUPS", query: filterSchema });
    }, [dispatch, filterSchema, isDeleting, isAddSuccess, isDeleteSuccess, isUpdateSuccess]);

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
                        <EditIconButton />
                        <DeleteIconButton />
                    </Center>
                ),
            },
        ],
        [],
    );

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

    const handleDelete = (id) => {
        dispatch(bulkEmailGroupActions.delete_banner(id));
    };

    const handleStatus = useCallback((is_active, id) => {
        dispatch(bulkEmailGroupActions.update_banner_status(id, { is_active: is_active }));
    }, []);

    return (
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
    );
};

export default BulkEmailGroups;
