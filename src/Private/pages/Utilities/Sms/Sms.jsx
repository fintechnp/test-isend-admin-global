import * as Yup from "yup";
import { isAfter } from "date-fns";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import Row from "App/components/Row/Row";
import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
import ViewSmsModal from "./ViewSms/ViewSmsModal";
import withPermission from "Private/HOC/withPermission";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import FilterButton from "App/components/Button/FilterButton";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import CreateSms from "./CreateSms";
import actions from "./../store/actions";
import isEmpty from "App/helpers/isEmpty";
import getFlagUrl from "App/helpers/getFlagUrl";
import { useConfirm } from "App/core/mui-confirm";
import { permissions } from "Private/data/permissions";
import SmsStatusBadge from "./components/SmsStatusBadge";
import useListFilterStore from "App/hooks/useListFilterStore";

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
};

const schema = Yup.object().shape({
    from_date: Yup.string().nullable().optional(),
    to_date: Yup.string()
        .nullable()
        .optional()
        .when("from_date", {
            is: (value) => !isEmpty(value),
            then: (schema) =>
                Yup.string().test({
                    name: "is-after",
                    message: "To Date must be after From Date",
                    test: function (value) {
                        const { from_date } = this.parent;
                        return value ? isAfter(new Date(value), new Date(from_date)) : true;
                    },
                }),
            otherwise: (schema) => Yup.string().nullable().optional(),
        }),
});

const Sms = () => {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const methods = useListFilterStore({ initialState });

    const {
        isFilterOpen,
        closeFilter,
        onQuickFilter,
        openFilter,
        onDeleteFilterParams,
        onFilterSubmit,
        reset,
        filterSchema,
        onPageChange,
        onRowsPerPageChange,
    } = methods;

    const { response: SmsData, loading: l_loading } = useSelector((state) => state.get_sms);
    const { success: c_success } = useSelector((state) => state.create_sms);
    const { success: d_success } = useSelector((state) => state.delete_sms);

    useEffect(() => {
        dispatch(actions.get_sms(filterSchema));
        dispatch({ type: "CREATE_SMS_RESET" });
        dispatch({ type: "DELETE_SMS_RESET" });
    }, [dispatch, filterSchema, d_success, c_success]);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "Mobile Number",
                cell: ({ row }) => {
                    return (
                        <Row gap="8px" alignItems="center">
                            <Box style={{ flex: 1 }}>
                                <BadgeAvatar
                                    avatarUrl={getFlagUrl(row.original.sms_country_iso2)}
                                    avatarDimension={20}
                                    smallAvatarDimension={0}
                                    style={{ margin: "auto" }}
                                />
                            </Box>
                            <Column>
                                <Typography color="text.primary" fontSize={14} fontWeight={500}>
                                    {row.original.sms_to}
                                </Typography>
                                <Row alignItems="center">
                                    <Typography color="text.secondary" fontWeight={400} fontSize={12}>
                                        {row.original.sms_by}
                                    </Typography>
                                </Row>
                            </Column>
                        </Row>
                    );
                },
            },
            {
                header: "Message Date & Time",
                accessorKey: "created_ts",
                cell: ({ row }) => {
                    return (
                        <Row gap="8px">
                            <Column>
                                <Typography color="text.primary" fontSize={14} fontWeight={400}>
                                    {!isEmpty(row.original.created_ts)
                                        ? dateUtils.getFormattedDate(row.original.created_ts, "DD/MM/YYYY")
                                        : "N/A"}
                                </Typography>
                                <Typography color="text.primary" fontSize={14} fontWeight={400}>
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
                cell: ({ getValue }) => <SmsStatusBadge status={getValue()} />,
            },
            {
                header: "Message Text",
                accessorKey: "sms_text",
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
                                        onClick={() => dispatch(actions.open_view_sms_modal(row.original), onClose())}
                                    >
                                        View SMS
                                    </ListItemButton>

                                    <HasPermission permission={permissions.RESEND_SMS}>
                                        <ListItemButton
                                            onClick={() => {
                                                handleOnResend(row.original.tid);
                                                onClose();
                                            }}
                                        >
                                            Resend
                                        </ListItemButton>
                                    </HasPermission>

                                    <HasPermission permission={permissions.DELETE_SMS}>
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
            type: fieldTypes.DATE,
            label: "From Date",
            name: "from_date",
            props: {
                withStartDayTimezone: true,
            },
        },
        {
            type: fieldTypes.DATE,
            label: "To Date",
            name: "to_date",
            props: {
                withEndDayTimezone: true,
            },
        },

        {
            type: fieldTypes.TEXTFIELD,
            label: "Receiver",
            name: "receiver",
        },
    ];

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Sender", value: "sms_by" },
        { key: "Receiver", value: "sms_to" },
        { key: "Country", value: "sms_country" },
    ];

    const handleOnResend = (id) => {
        confirm({
            description: "Do you want to resend this notification?",
            confirmationText: "Yes",
        }).then(() => {
            dispatch(
                actions.resend_notification({
                    notification_id: id,
                    type: "sms",
                }),
            );
        });
    };

    const handleOnDelete = (id) => {
        confirm({
            description: "Are you sure you want to delete this SMS?",
            confirmationText: "Yes",
        }).then(() => {
            dispatch(actions.delete_sms(id));
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
                    label: "Sms",
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
                    schema={schema}
                />

                <PageContentContainer
                    title="SMS List"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                disabled={l_loading}
                                sortByData={sortData}
                                values={filterSchema}
                            />
                            <HasPermission permission={permissions.CREATE_SMS}>
                                <CreateSms />
                            </HasPermission>
                        </>
                    }
                >
                    <TanstackReactTable
                        columns={columns}
                        data={SmsData?.data || []}
                        title="SMS Details"
                        loading={l_loading}
                    />
                </PageContentContainer>

                <TablePagination
                    paginationData={SmsData?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
                <ViewSmsModal />
            </Column>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_SMS] })(Sms);
