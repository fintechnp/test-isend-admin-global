import { styled } from "@mui/material/styles";
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, ListItemButton, Typography } from "@mui/material";

import { useConfirm } from "App/core/mui-confirm";
import Column from "App/components/Column/Column";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import Table, { TablePagination } from "App/components/Table";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import HasPermission from "Private/components/shared/HasPermission";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import CreateFcm from "./CreateFcm";
import actions from "./../store/actions";
import ViewFcmModal from "./ViewSms/ViewFcmModal";
import { FormatDate, ReferenceName } from "App/helpers";
import FilterForm from "App/components/Filter/FilterForm";

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
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
            },
            {
                Header: "Title",
                accessor: "title",
                Cell: (data) => (
                    <Box>
                        <StyledName component="p" sx={{ fontSize: "14px", opacity: 0.9 }}>
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Topic",
                accessor: "topic",
                Cell: (data) => (
                    <Box>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "14px",
                                opacity: 0.8,
                            }}
                        >
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Type",
                accessor: "type",
                maxWidth: 80,
                Cell: (data) => (
                    <Box>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "14px",
                                opacity: 0.8,
                            }}
                        >
                            {data.value ? ReferenceName(89, data.value) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Body</Typography>
                    </Box>
                ),
                accessor: "body",
                Cell: (data) => (
                    <Box>
                        <Text component="span">{data?.value ? data?.value : "N/A"}</Text>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Status</Typography>
                    </Box>
                ),
                accessor: "status",
                maxWidth: 100,
                Cell: (data) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px", opacity: 0.8 }}>
                            {data.value ? ReferenceName(88, data.value) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center" sx={{}}>
                        <Typography>Created Date</Typography>
                    </Box>
                ),
                accessor: "created_ts",
                Cell: (data) => (
                    <Box textAlign="center" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px", opacity: 0.8 }}>
                            {data.value ? FormatDate(data.value) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessor: "show",
                Cell: ({ row }) => {
                    return (
                        <PopoverButton>
                            {({ onClose }) => (
                                <>
                                    <HasPermission permission={permissions.EDIT_FCM}>
                                        <CreateFcm onClose={onClose} update={true} update_data={row?.original} />
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
            documentTitle="SMS List"
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
                    title="Search Sms"
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
                                <CreateFcm />
                            </HasPermission>
                        </>
                    }
                >
                    <Table
                        columns={columns}
                        data={FcmData?.data || []}
                        title="Fcm Message Details"
                        sub_columns={sub_columns}
                        loading={l_loading}
                        rowsPerPage={8}
                    />
                </PageContentContainer>

                <TablePagination
                    paginationData={FcmData?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>

            <ViewFcmModal />
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_FCM] })(Fcm);
