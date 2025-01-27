import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import CustomerStatusBadge from "Private/pages/Customers/Search/components/CustomerStatusBadge";

import actions from "../store/actions";
import dateUtils from "App/utils/dateUtils";
import { ReferenceName } from "App/helpers";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import referenceTypeId from "Private/config/referenceTypeId";

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

    const { response: emailConfigData, loading } = useSelector((state) => state.get_email_config);

    const columns = useMemo(
        () => [
            {
                header: "S.N",
                accessorKey: "f_serial_no",
            },
            {
                header: "Config For",
                accessorKey: "config_for",
                cell: ({ getValue }) => (
                    <>{getValue() ? ReferenceName(referenceTypeId.emailConfigFor, getValue()) : "-"}</>
                ),
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
        ],
        [],
    );

    const { onPageChange, filterSchema, onRowsPerPageChange, onQuickFilter } = useListFilterStore({ initialState });

    useEffect(() => {
        dispatch(actions.get_email_config(filterSchema));
    }, [dispatch]);

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
                            {/* <CreateEmailConfig /> */}
                            <div>Test</div>
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

// export default withPermission({ permission: [permissions.READ_EMAIL_CONFIG] })(ListEmailConfig)
export default ListEmailConfig;
