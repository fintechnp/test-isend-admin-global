import React, { useState, useEffect, useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import { useSelector, useDispatch } from "react-redux";
import FormControlLabel from "@mui/material/FormControlLabel";

import Center from "App/components/Center/Center";
import Button from "App/components/Button/Button";
import Spacer from "App/components/Spacer/Spacer";
import SearchBox from "App/components/Forms/SearchBox";
import ViewIconButton from "App/components/Button/ViewIconButton";
import EditIconButton from "App/components/Button/EditIconButton";
import DeleteIconButton from "App/components/Button/DeleteIconButton";
import Table, { TablePagination, TableSwitch } from "App/components/Table";
import EllipsisTypography from "App/components/Typography/EllipsisTypography";

import debounce from "App/helpers/debounce";
import { useConfirm } from "App/core/mui-confirm";

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
};

const BulkEmailContents = (props) => {
    const dispatch = useDispatch();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: data, loading: isLoading } = useSelector((state) => state.get_bulk_email_content_list);

    const { loading: isDeleting, success: isDeleteSuccess } = useSelector((state) => state.delete_bulk_email_content);

    const { success: isAddSuccess } = useSelector((state) => state.add_bulk_email_content);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_bulk_email_content);

    const { success: isSendEmailSuccess, loading: isSending } = useSelector((state) => state.send_bulk_email_content);

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
            dispatch({ type: "DELETE_BULK_EMAIL_CONTENT", bulk_email_content_id: id });
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
            type: "UPDATE_BULK_EMAIL_CONTENT_STATUS",
            bulk_email_content_id: id,
            is_active,
        });
    }, []);

    const [selectedContentId, setSelectedContentId] = useState();

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "content_id",
                maxWidth: "40px",
            },
            {
                Header: "Send to Group",
                accessor: "group_name",
                Cell: ({ value, row }) => (
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={selectedContentId}
                        onChange={(e) => setSelectedContentId(e.target.value)}
                    >
                        <FormControlLabel value={row.original.content_id} control={<Radio />} label={value} />
                    </RadioGroup>
                ),
            },

            {
                Header: "Subject",
                accessor: "email_subject",
            },
            {
                Header: "Send From",
                accessor: "send_from",
            },
            {
                Header: "Send To",
                accessor: "send_to",
                Cell: ({ value }) => <EllipsisTypography>{value}</EllipsisTypography>,
            },

            {
                Header: "Status",
                accessor: "is_active",
                Cell: (data) => (
                    <TableSwitch
                        value={data?.value}
                        dataId={data.row.original.content_id}
                        handleStatus={handleStatus}
                    />
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
                        <ViewIconButton
                            onClick={() => {
                                dispatch({
                                    type: "OPEN_VIEW_BULK_EMAIL_CONTENT_MODAL",
                                    bulk_email_content_id: row.original.content_id,
                                });
                            }}
                        />
                        <EditIconButton
                            onClick={() => {
                                dispatch({
                                    type: "OPEN_UPDATE_BULK_EMAIL_CONTENT_MODAL",
                                    bulk_email_content_id: row.original.content_id,
                                    initial_form_state: {
                                        email_subject: row.original.email_subject,
                                        email_body: row.original.email_body,
                                        send_to: row.original.send_to,
                                        send_from: row.original.send_from,
                                        is_active: row.original.is_active,
                                        group_id: row.original.group_id,
                                    },
                                });
                            }}
                        />
                        <DeleteIconButton onClick={() => handleOnDelete(row.original.content_id)} />
                    </Center>
                ),
            },
        ],
        [selectedContentId],
    );

    const handleSendEmail = (bulkEmailContentId) => {
        if (!selectedContentId) {
            toast.error("Select a email content to send", {
                position: "top-right",
            });
            return;
        }
        dispatch({
            type: "SEND_BULK_EMAIL_CONTENT",
            bulk_email_content_id: selectedContentId,
        });
    };

    useEffect(() => {
        dispatch({ type: "UPDATE_BULK_EMAIL_CONTENT_RESET" });
        dispatch({ type: "ADD_BULK_EMAIL_CONTENT_RESET" });
        const timeout = debounce(() => {
            dispatch({ type: "GET_BULK_EMAIL_CONTENTS", query: filterSchema });
        }, 500);

        return () => clearTimeout(timeout);
    }, [dispatch, filterSchema, isDeleting, isAddSuccess, isDeleteSuccess, isUpdateSuccess, isSendEmailSuccess]);

    return (
        <Box>
            <Box display="flex" justifyContent="space-between">
                <SearchBox
                    value={filterSchema?.search ?? ""}
                    onChange={handleOnSearch}
                    onClickClearSearch={handleOnClearSearch}
                />
                <Box display="flex" gap={1}>
                    <Button startIcon={<SendIcon />} onClick={handleSendEmail} disabled={isSending}>
                        {isSending ? "Processing" : "Send Email"}
                    </Button>
                    <Button
                        startIcon={<AddIcon />}
                        onClick={() => dispatch({ type: "OPEN_ADD_BULK_EMAIL_CONTENT_MODAL" })}
                    >
                        Add Email Content
                    </Button>
                </Box>
            </Box>
            <Spacer />
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

export default BulkEmailContents;
