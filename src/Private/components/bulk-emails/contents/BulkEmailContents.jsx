import toast from "react-hot-toast";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import Typography from "@mui/material/Typography";
import RadioGroup from "@mui/material/RadioGroup";
import { useSelector, useDispatch } from "react-redux";
import FormControlLabel from "@mui/material/FormControlLabel";
import React, { useState, useEffect, useMemo, useCallback } from "react";

import Center from "App/components/Center/Center";
import Button from "App/components/Button/Button";
import Spacer from "App/components/Spacer/Spacer";
import Column from "App/components/Column/Column";
import SearchBox from "App/components/Forms/SearchBox";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import ViewIconButton from "App/components/Button/ViewIconButton";
import EditIconButton from "App/components/Button/EditIconButton";
import DeleteIconButton from "App/components/Button/DeleteIconButton";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import Table, { TablePagination, TableSwitch } from "App/components/Table";
import EllipsisTypography from "App/components/Typography/EllipsisTypography";
import PageContentContainer from "App/components/Container/PageContentContainer";

import debounce from "App/helpers/debounce";
import { useConfirm } from "App/core/mui-confirm";
import useListFilterStore from "App/hooks/useListFilterStore";

const initialState = {
    page_number: 1,
    page_size: 10,
    sort_by: "created_ts",
    order_by: "DESC",
};

const BulkEmailContents = (props) => {
    const dispatch = useDispatch();

    const { response: data, loading: isLoading } = useSelector((state) => state.get_bulk_email_content_list);

    const { loading: isDeleting, success: isDeleteSuccess } = useSelector((state) => state.delete_bulk_email_content);

    const { success: isAddSuccess } = useSelector((state) => state.add_bulk_email_content);

    const { success: isUpdateSuccess } = useSelector((state) => state.update_bulk_email_content);

    const { success: isSendEmailSuccess, loading: isSending } = useSelector((state) => state.send_bulk_email_content);

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
            dispatch({ type: "DELETE_BULK_EMAIL_CONTENT", bulk_email_content_id: id });
        });
    };

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
                header: "Id",
                accessorKey: "content_id",
            },
            {
                header: "Send to Group / Email",
                accessorKey: "group_name",
                cell: ({ value, row }) => (
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={selectedContentId}
                        onChange={(e) => setSelectedContentId(e.target.value)}
                    >
                        <FormControlLabel
                            value={row.original.content_id}
                            control={<Radio />}
                            label={
                                <EllipsisTypography>
                                    {row.original.group_name ?? row.original.send_to}
                                </EllipsisTypography>
                            }
                        />
                    </RadioGroup>
                ),
            },

            {
                header: "Subject",
                accessorKey: "email_subject",
            },
            {
                header: "Status",
                accessorKey: "is_active",
                cell: ({ getValue, row }) => (
                    <TableSwitch value={getValue()} dataId={row.original.content_id} handleStatus={handleStatus} />
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

    const handleSendEmail = () => {
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

    const fetchBulkEmailContents = () => {
        dispatch({ type: "UPDATE_BULK_EMAIL_CONTENT_RESET" });
        dispatch({ type: "ADD_BULK_EMAIL_CONTENT_RESET" });
        debounce(() => {
            dispatch({ type: "GET_BULK_EMAIL_CONTENTS", query: filterSchema });
        }, 500);
    };

    useEffect(() => {
        fetchBulkEmailContents();
    }, [filterSchema, isDeleting, isAddSuccess, isDeleteSuccess, isUpdateSuccess, isSendEmailSuccess]);

    useEffect(() => {
        if (!isSendEmailSuccess) return;
        fetchBulkEmailContents();
        dispatch({ type: "SEND_BULK_EMAIL_CONTENT_RESET" });
    }, [isSendEmailSuccess]);

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "search",
            label: "Search",
        },
    ];

    return (
        <PageContent
            documentTitle="Email Contents"
            breadcrumbs={[
                {
                    label: "Utilites",
                },
                {
                    label: "Email Contents",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Email Contents"
                    values={filterSchema}
                    open={isFilterOpen}
                    fields={filterFields}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer
                    title="Email Contents"
                    topRightContent={
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

export default BulkEmailContents;
