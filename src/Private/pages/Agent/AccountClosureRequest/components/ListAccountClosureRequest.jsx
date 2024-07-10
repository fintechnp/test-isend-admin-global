import { useCallback, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import dateUtils from "App/utils/dateUtils";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import { permissions } from "Private/data/permissions";
import FilterForm from "App/components/Filter/FilterForm";
import useListFilterStore from "App/hooks/useListFilterStore";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import { relatedToOptions } from "Private/data/b2b";
import { accountClosureRequestActions } from "../store";
import AccountClosureStatusBadge from "../Status/AccountClosureStatusBadge";
import ViewAccountClosureRequestModal from "./ViewAccountClosureRequestModal";
import { AccountClosureRequestStatus } from "../data/AccountClosureRequestStatus";

const initialState = {
    Page: 1,
    PageSize: 10,
};

export default function ListAccountClosureRequest() {
    const dispatch = useDispatch();

    const methods = useListFilterStore({ initialState });

    const {
        isFilterOpen,
        closeFilter,
        openFilter,
        filterSchema,
        onDeleteFilterParams,
        onFilterSubmit,
        onPageChange,
        onRowsPerPageChange,
        reset,
    } = methods;

    const { response, loading } = useSelector((state) => state.get_b2b_account_closure_request);

    const { loading: isLoading } = useSelector((state) => state.accept_reject_b2b_account_closure_request);

    const fetch = () =>
        useCallback(() => {
            dispatch(accountClosureRequestActions.get_account_closure_request(filterSchema));
        }, [filterSchema]);

    useEffect(() => {
        fetch();
    }, [fetch]);

    const columns = useMemo(() => [
        {
            header: "S.N.",
            accessorKey: "f_serial_no",
            maxWidth: 50,
        },
        {
            header: "Agent/Business Name",
            accessorKey: "related_id_name",
        },
        {
            header: "Email",
            accessorKey: "email",
        },
        {
            header: "Phone Number",
            accessorKey: "phone",
        },
        {
            header: "Deletion Reason",
            accessorKey: "deletion_reason",
        },
        {
            header: "Status",
            accessorKey: "status",
            cell: ({ getValue }) => (
                <AccountClosureStatusBadge status={getValue() ?? AccountClosureRequestStatus.PENDING} />
            ),
        },
        {
            header: "Created Date",
            accessorKey: "created_ts",
            cell: ({ getValue }) => {
                return <>{dateUtils.getLocalDateTimeFromUTC(getValue())}</>;
            },
        },
        {
            header: "Action",
            accessorKey: "action",
            cell: ({ row }) => {
                return (
                    <PopoverButton>
                        {({ onClose }) => (
                            <>
                                <HasPermission permission={permissions.READ_B2B_ACCOUNT_CLOSURE_REQUEST}>
                                    <ListItemButton
                                        onClick={() => (
                                            dispatch(
                                                accountClosureRequestActions.open_account_closure_view_modal(
                                                    row.original,
                                                ),
                                            ),
                                            onClose()
                                        )}
                                    >
                                        View
                                    </ListItemButton>
                                </HasPermission>
                            </>
                        )}
                    </PopoverButton>
                );
            },
        },
    ]);

    const filterFields = [
        {
            type: "date",
            label: "From Date",
            name: "FromDate",
        },
        {
            type: "date",
            label: "To Date",
            name: "ToDate",
        },
        {
            type: "select",
            label: "Agent/Business",
            name: "RelatedTo",
            options: relatedToOptions,
        },
    ];

    return (
        <PageContent
            documentTitle="Account Closure Request"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[
                {
                    label: "B2B",
                },
                {
                    label: "Account Closure Requests",
                },
            ]}
        >
            <Column gap="16px">
                <FilterForm
                    title="Seach Account Closure Requests"
                    open={isFilterOpen}
                    onClose={closeFilter}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    fields={filterFields}
                    values={filterSchema}
                    onDelete={onDeleteFilterParams}
                />

                <PageContentContainer title="Account Closure Request">
                    <TanstackReactTable columns={columns} data={response?.data ?? []} loading={loading} />
                </PageContentContainer>
            </Column>

            <TablePagination
                paginationData={response?.pagination}
                handleChangePage={onPageChange}
                handleChangeRowsPerPage={onRowsPerPageChange}
            />
            <ViewAccountClosureRequestModal isLoading={isLoading} onAcceptRejectSuccess={fetch} />
        </PageContent>
    );
}
