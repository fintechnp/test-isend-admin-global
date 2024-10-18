import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useState, useEffect, useMemo } from "react";
import useListFilterStore from "App/hooks/useListFilterStore";

import Row from "App/components/Row/Row";
import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import { useConfirm } from "App/core/mui-confirm";
import Column from "App/components/Column/Column";
import FilterForm from "App/components/Filter/FilterForm";
import Table, { TablePagination } from "App/components/Table";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import CreateEmail from "./CreateEmail";
import actions from "./../store/actions";
import { permissions } from "Private/data/permissions";
import ViewEmailModal from "./ViewEmail/ViewEmailModal";
import withPermission from "Private/HOC/withPermission";
import EmailStatusBadge from "../Sms/components/EmailStatusBadge";

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

const Email = () => {
    const dispatch = useDispatch();

    const methods = useListFilterStore({ initialState });

    const {
        isFilterOpen,
        closeFilter,
        openFilter,
        onDeleteFilterParams,
        onFilterSubmit,
        onQuickFilter,
        filterSchema,
        onPageChange,
        onRowsPerPageChange,
        reset,
    } = methods;

    const confirm = useConfirm();

    const { response: EmailData, loading: l_loading } = useSelector((state) => state.get_email);
    const { success: c_success } = useSelector((state) => state.create_email);
    const { success: d_success } = useSelector((state) => state.delete_email);

    useEffect(() => {
        dispatch(actions.get_email(filterSchema));
        dispatch({ type: "CREATE_EMAIL_RESET" });
        dispatch({ type: "DELETE_EMAIL_RESET" });
    }, [dispatch, filterSchema, d_success, c_success]);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "Email Address",
                cell: ({ row }) => {
                    return (
                        <Row gap="8px" alignItems="center">
                            <Column>
                                <Typography color="text.primary" fontWeight={500}>
                                    {row.original.email_to}
                                </Typography>
                                <Row alignItems="center">
                                    <Typography color="text.secondary" fontSize={12}>
                                        {row.original.email_by}
                                    </Typography>
                                </Row>
                            </Column>
                        </Row>
                    );
                },
            },
            {
                header: "Email Date & Time",
                accessorKey: "created_ts",
                cell: ({ row }) => {
                    return (
                        <Row gap="8px">
                            <Column>
                                <Typography color="text.primary">
                                    {!isEmpty(row.original.created_ts)
                                        ? dateUtils.getFormattedDate(row.original.created_ts, "DD/MM/YYYY")
                                        : "N/A"}
                                </Typography>
                                <Typography color="text.primary">
                                    {!isEmpty(row.original.created_ts)
                                        ? dateUtils.getFormattedDate(row.original.created_ts, "hh:mm A")
                                        : "N/A"}
                                </Typography>
                            </Column>
                        </Row>
                    );
                },
            },
            {
                header: "Message Status",
                accessorKey: "status",
                cell: ({ getValue }) => <EmailStatusBadge status={getValue()} />,
            },
            {
                header: "Email Subject",
                accessorKey: "email_subject",
                cell: ({ getValue }) => (
                    <Typography
                        sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "400px",
                        }}
                    >
                        {getValue()}
                    </Typography>
                ),
            },
            {
                header: "Action",
                accessorKey: "action",
                cell: ({ row }) => {
                    return (
                        <PopoverButton>
                            {({ onClose }) => (
                                <>
                                    <ListItemButton
                                        onClick={() => (
                                            dispatch(actions.open_view_email_modal(row.original)), onClose()
                                        )}
                                    >
                                        View Email
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

    const filterFields = [
        {
            type: "textfield",
            label: "search",
            name: "Search",
        },
    ];

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Sender", value: "email_by" },
        { key: "Receiver", value: "email_to" },
        { key: "Subject", value: "email_subject" },
    ];

    const handleOnResend = (id) => {
        confirm({
            description: "Do you want to resend this notification?",
            confirmationText: "Yes",
        }).then(() => {
            dispatch(
                actions.resend_notification({
                    notification_id: id,
                    type: "email",
                }),
            );
        });
    };

    const handleOnDelete = (id) => {
        confirm({
            description: "Are you sure you want to delete this SMS?",
            confirmationText: "Yes",
        }).then(() => {
            dispatch(actions.delete_email(id));
        });
    };

    return (
        <PageContent
            documentTitle="Email"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "Utilities",
                },
                {
                    label: "Email",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Email"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />

                <PageContentContainer
                    title="Email List"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                disabled={l_loading}
                                sortByData={sortData}
                                values={filterSchema}
                            />

                            <HasPermission permission={permissions.CREATE_EMAIL}>
                                <CreateEmail />
                            </HasPermission>
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={EmailData?.data || []} loading={l_loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={EmailData?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />

                <ViewEmailModal />
            </Column>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_EMAIL] })(Email);
