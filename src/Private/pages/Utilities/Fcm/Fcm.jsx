import { styled } from "@mui/material/styles";
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, ListItemButton, Typography } from "@mui/material";

import Row from "App/components/Row/Row";
import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import { ReferenceName } from "App/helpers";
import { useConfirm } from "App/core/mui-confirm";
import Column from "App/components/Column/Column";
import Button from "App/components/Button/Button";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import FilterForm from "App/components/Filter/FilterForm";
import { TablePagination } from "App/components/Table";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "./../store/actions";
import ViewFcmModal from "./ViewSms/ViewFcmModal";
import AddFcmModal from "./CreateFcm/AddFcmModal";
import EditFcmModal from "./CreateFcm/EditFcmModal";
import FcmStatusBadge from "../Sms/components/FcmStatusBadge";

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "border.main",
}));

const Text = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    width: "100%",
    display: "block",
    fontSize: "14px",
    color: "border.main",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

const Fcm = () => {
    const dispatch = useDispatch();
    const confirm = useConfirm();

    const methods = useListFilterStore({ initialState });

    const {
        isFilterOpen,
        closeFilter,
        onQuickFilter,
        filterSchema,
        onPageChange,
        onRowsPerPageChange,
        openFilter,
        onDeleteFilterParams,
        onFilterSubmit,
        reset,
    } = methods;

    const { response: FcmData, loading: l_loading } = useSelector((state) => state.get_fcm);
    const { success: c_success } = useSelector((state) => state.create_fcm);
    const { success: u_success } = useSelector((state) => state.update_fcm);
    const { success: d_success } = useSelector((state) => state.delete_fcm);

    useEffect(() => {
        dispatch(actions.get_fcm(filterSchema));
        dispatch({ type: "CREATE_FCM_RESET" });
        dispatch({ type: "UPDATE_FCM_RESET" });
        dispatch({ type: "DELETE_FCM_RESET" });
    }, [dispatch, filterSchema, d_success, c_success, u_success]);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "Title",
                accessorKey: "title",
                cell: ({ row }) => (
                    <Box>
                        <StyledName component="p" sx={{ fontSize: "14px", opacity: 0.9 }}>
                            {row.original.title ? row.original.title : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Topic",
                accessorKey: "topic",
                cell: ({ row }) => (
                    <Box>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "14px",
                                opacity: 0.8,
                            }}
                        >
                            {row.original.topic ? row.original.topic : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: "Type",
                accessorKey: "type",
                cell: ({ row }) => (
                    <Box>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "14px",
                                opacity: 0.8,
                            }}
                        >
                            {row.original.type ? ReferenceName(89, row.original.type) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Body</Typography>
                    </Box>
                ),
                accessorKey: "body",
                cell: ({ row }) => (
                    <Box>
                        <Text component="span">{row.original.body ? row.original.body : "N/A"}</Text>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Status</Typography>
                    </Box>
                ),
                accessorKey: "status",
                maxWidth: 100,
                cell: ({ row }) => <FcmStatusBadge status={row.original.status} />,
            },
            {
                header: () => (
                    <Box textAlign="center" sx={{}}>
                        <Typography>Created Date</Typography>
                    </Box>
                ),
                accessorKey: "created_ts",
                cell: ({ row }) => (
                    <Row gap="8px">
                        <Column>
                            <Typography color="text.primary" fontSize={14} fontWeight={400}>
                                {!isEmpty(row.original.created_ts)
                                    ? dateUtils.getFormattedDate(row.original.created_ts, "MM/DD/YYYY")
                                    : "N/A"}
                            </Typography>
                            <Typography color="text.primary" fontSize={14} fontWeight={400}>
                                {!isEmpty(row.original.created_ts)
                                    ? dateUtils.getFormattedDate(row.original.created_ts, "hh:mm A")
                                    : "N/A"}
                            </Typography>
                        </Column>
                    </Row>
                ),
            },
            {
                header: () => (
                    <Box textAlign="center">
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessorKey: "show",
                cell: ({ row }) => {
                    return (
                        <PopoverButton>
                            {({ onClose }) => (
                                <>
                                    <HasPermission permission={permissions.EDIT_FCM}>
                                        <ListItemButton
                                            onClick={() => {
                                                dispatch(
                                                    {
                                                        type: "OPEN_UPDATE_FCM_MODAL",
                                                        payload: row.original,
                                                    },
                                                    onClose(),
                                                );
                                            }}
                                        >
                                            Edit FCM
                                        </ListItemButton>
                                    </HasPermission>

                                    <ListItemButton
                                        onClick={() => dispatch(actions.open_view_fcm_modal(row.original), onClose())}
                                    >
                                        View Fcm
                                    </ListItemButton>
                                    <HasPermission permission={permissions.RESEND_EMAIL}>
                                        <ListItemButton
                                            onClick={() => {
                                                handleOnResend(row.original.tid), onClose();
                                            }}
                                        >
                                            Resend
                                        </ListItemButton>
                                    </HasPermission>

                                    <HasPermission permission={permissions.DELETE_FCM}>
                                        <ListItemButton
                                            onClick={() => {
                                                handleOnDelete(row.original.tid);
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

    const sub_columns = [
        { key: "tid", name: "Id", type: "default" },
        { key: "title", name: "Title", type: "default" },
        { key: "type", name: "Type", type: "reference", ref_value: 89 },
        { key: "topic", name: "Receiver", type: "default" },
        { key: "customer_id", name: "Customer Id", type: "default" },
        { key: "status", name: "Status", type: "reference", ref_value: 88 },
        { key: "body", name: "Body", type: "default" },
        {
            key: "display_notification",
            name: "Display Notification",
            type: "boolean",
        },
        { key: "detail_content", name: "Detail Contents", type: "default" },
        { key: "image_url", name: "Image Url", type: "default" },
        { key: "redirect_url", name: "Redirect Url", type: "default" },
        { key: "created_ts", name: "Created Date", type: "date" },
    ];

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Title", value: "title" },
        { key: "Topic", value: "topic" },
        { key: "Body", value: "body" },
    ];

    const filterFields = [
        {
            type: "textfield",
            label: "Search",
            name: "search",
        },
    ];

    const handleOnDelete = (id) => {
        confirm({
            description: "Do you want to delete this notification?",
            confirmationText: "Yes ",
        }).then(() => {
            dispatch(actions.delete_fcm(id));
        });
    };

    const handleOnResend = (id) => {
        confirm({
            description: "Do you want to resend this notification?",
            confirmationText: "Yes",
        }).then(() => {
            dispatch(
                actions.resend_notification({
                    notification_id: id,
                    type: "fcm",
                }),
            );
        });
    };

    return (
        <PageContent
            documentTitle="FCM List"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "Utilities",
                },
                {
                    label: "FCM",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    title="Search FCM"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />

                <PageContentContainer
                    title="FCM List"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                disabled={l_loading}
                                sortByData={sortData}
                                values={filterSchema}
                            />
                            <HasPermission permission={permissions.CREATE_FCM}>
                                <Button variant="contained" onClick={() => dispatch(actions.open_fcm_form())}>
                                    Create FCM
                                </Button>
                            </HasPermission>
                        </>
                    }
                >
                    <TanstackReactTable
                        columns={columns}
                        sub_columns={sub_columns}
                        data={FcmData?.data || []}
                        loading={l_loading}
                        title="Fcm Message Details"
                    />
                </PageContentContainer>

                <TablePagination
                    paginationData={FcmData?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>

            <AddFcmModal />
            <EditFcmModal />

            <ViewFcmModal />
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_FCM] })(Fcm);
