import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import CustomerStatusBadge from "Private/pages/Customers/Search/components/CustomerStatusBadge";

import actions from "../store/actions";
import dateUtils from "App/utils/dateUtils";
import { useConfirm } from "App/core/mui-confirm";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import AddEmailConfig from "./components/AddEmailConfig";
import EditEmailConfig from "./components/EditEmailConfig";
import PopoverButton from "App/components/Button/PopoverButton";

const initialState = {
    page_number: 1,
    page_size: 10,
    sort_by: "created_ts",
    order_by: "DESC",
};

const sortByOptions = [
    { key: "None", value: "" },
    { key: "Config For", value: "config_for" },
    { key: "Created Date", value: "created_ts" },
];

const ListEmailConfig = () => {
    const dispatch = useDispatch();
    const confirm = useConfirm();

    const { response: emailConfigData, loading } = useSelector((state) => state.get_email_config);
    const { success: addSuccess } = useSelector((state) => state.add_email_config);
    const { success: deleteSuccess } = useSelector((state) => state.delete_email_config);
    const { success: editSuccess } = useSelector((state) => state.edit_email_config);

    const columns = useMemo(
        () => [
            {
                header: "S.N",
                accessorKey: "f_serial_no",
            },
            {
                header: "Config For",
                accessorKey: "config_for",
                cell: ({ getValue }) => <>{getValue() ? getValue() : ""}</>,
            },
            {
                header: "Emails",
                accessorKey: "emails_json",
                cell: ({ getValue }) => (
                    <Column>
                        {getValue()
                            ? JSON.parse(getValue()).map((email, index) => (
                                  <Typography key={index + "email"}>{email ? `${email},` : ""}</Typography>
                              ))
                            : ""}
                    </Column>
                ),
            },
            {
                header: "Status",
                accessorKey: "is_active",
                cell: ({ getValue }) => <CustomerStatusBadge status={getValue() ? "active" : "inActive"} />,
            },
            {
                header: "Created Status",
                accessorKey: "created_ts",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? dateUtils.getFormattedDate(getValue()) : ""}</Typography>
                        <Typography>{row.original?.created_by ? row.original?.created_by : ""}</Typography>
                    </Column>
                ),
            },
            {
                header: "Updated Status",
                accessorKey: "updated_ts",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? dateUtils.getFormattedDate(getValue()) : ""}</Typography>
                        <Typography>{row.original?.updated_by ? row.original?.updated_by : ""}</Typography>
                    </Column>
                ),
            },
            {
                header: "Action",
                cell: ({ row }) => {
                    return (
                        <PopoverButton>
                            {({ onClose }) => (
                                <>
                                    <HasPermission permission={permissions.EDIT_EMAIL_CONFIG}>
                                        <EditEmailConfig data={row.original} onClose={() => onClose()} />
                                    </HasPermission>
                                    <HasPermission permission={permissions.DELETE_EMAIL_CONFIG}>
                                        <ListItemButton onClick={() => handleDelete(row?.original?.config_id)}>
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

    const { onPageChange, filterSchema, onRowsPerPageChange, onQuickFilter } = useListFilterStore({ initialState });

    const handleDelete = (id) => {
        confirm({ description: "Are you sure you want to delete this email config?" }).then(() => {
            dispatch(actions.delete_email_config(id));
        });
    };

    useEffect(() => {
        dispatch(actions.get_email_config(filterSchema));
        dispatch({ type: "DELETE_EMAIL_CONFIG_RESET" });
    }, [dispatch, addSuccess, deleteSuccess, editSuccess, filterSchema]);

    return (
        <PageContent
            documentTitle="Email Config"
            breadcrumbs={[
                {
                    label: "Utilities",
                },
                {
                    label: "Email Config",
                },
            ]}
        >
            <Column gap="16px">
                <PageContentContainer
                    title="Email Config"
                    topRightContent={
                        <>
                            <TableGridQuickFilter
                                onOrderByChange={onQuickFilter}
                                onSortByChange={onQuickFilter}
                                sortByData={sortByOptions}
                                values={filterSchema}
                            />
                            <HasPermission permission={permissions.CREATE_EMAIL_CONFIG}>
                                <AddEmailConfig />
                            </HasPermission>
                        </>
                    }
                >
                    <TanstackReactTable data={emailConfigData?.data ?? []} columns={columns ?? []} loading={loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={emailConfigData?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_EMAIL_CONFIG] })(ListEmailConfig);
// export default ListEmailConfig;
