import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useCallback, useEffect, useMemo } from "react";

import { Delete } from "App/components";
import Column from "App/components/Column/Column";
import useAuthUser from "Private/hooks/useAuthUser";
import withPermission from "Private/HOC/withPermission";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import AddPayoutLocation from "./components/AddPayoutLocation";
import PopoverButton from "App/components/Button/PopoverButton";
import ExportUpload from "Private/components/reports/ExportUpload";
import { TablePagination, TableSwitch } from "App/components/Table";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import CustomerStatusBadge from "Private/pages/Customers/Search/components/CustomerStatusBadge";

import actions from "./store/actions";
import dateUtils from "App/utils/dateUtils";
import { permissions } from "Private/data/permissions";
import apiEndpoints from "Private/config/apiEndpoints";
import referenceTypeId from "Private/config/referenceTypeId";
import ViewPayoutLocationModal from "./ViewPayoutLocationModal";
import { CountryName, CurrencyName, ReferenceName } from "App/helpers";

const SwitchWrapper = styled(Box)(({ theme }) => ({
    "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked": {
        opacity: 0.8,
        color: theme.palette.primary.main,
    },
}));

const initialState = {
    page_number: 1,
    page_size: 10,
    country: "",
    currency: "",
    payment_type: "",
    search: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

const PayoutLocation = (props) => {
    const dispatch = useDispatch();
    const { can } = useAuthUser();
    const reference = JSON.parse(localStorage.getItem("reference"));

    const paymentTypeOptions = reference
        ?.filter((ref) => ref.reference_type === referenceTypeId.paymentType)[0]
        .reference_data.map((ref) => ({ label: ref.name, value: ref.value }));

    const { response: payoutloaction_data, loading: g_loading } = useSelector((state) => state.get_all_payout_location);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_payout_location);
    const { success: a_success } = useSelector((state) => state.add_payout_location);
    const { success: u_success } = useSelector((state) => state.update_payout_location);
    const { is_open } = useSelector((state) => state.get_payout_location_details);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        onFilterSubmit,
        onPageChange,
        onRowsPerPageChange,
        onQuickFilter,
        filterSchema,
        onDeleteFilterParams,
        reset,
    } = useListFilterStore({ initialState });

    useEffect(() => {
        dispatch(actions.get_all_payout_location(filterSchema));
        dispatch({ type: "ADD_PAYOUT_LOCATION_RESET" });
        dispatch({ type: "UPDATE_PAYOUT_LOCATION_RESETT" });
        dispatch({ type: "DELETE_PAYOUT_LOCATION_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "Location Name",
                accessorKey: "location_name",
                cell: ({ getValue, row }) => <>{getValue() ? getValue() : "-"}</>,
            },
            {
                header: "Location Code",
                accessorKey: "location_code",
                cell: ({ getValue }) => <>{getValue() ? getValue() : "n/a"}</>,
            },
            {
                header: "Payment Type",
                accessorKey: "payment_type",
                cell: ({ getValue }) => <>{getValue() ? ReferenceName(1, getValue()) : "-"}</>,
            },
            {
                header: "Country/Currency",
                accessorKey: "country",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography>{getValue() ? CountryName(getValue()) : "-"}</Typography>
                        <Typography>{row?.original?.currency ? CurrencyName(row?.original?.currency) : "-"}</Typography>
                    </Column>
                ),
            },
            {
                header: "Created At/By",
                accessorKey: "created_ts",
                cell: ({ row, getValue }) => {
                    return (
                        <Column>
                            <Typography>{getValue() ? dateUtils.getFormattedDate(getValue()) : ""}</Typography>
                            <Typography>{row.original.created_by ? `By: ${row.original.created_by}` : ""}</Typography>
                        </Column>
                    );
                },
            },
            {
                header: "Update status",
                accessorKey: "updated_ts",
                cell: ({ row, getValue }) => {
                    return (
                        <Column>
                            <Typography>{getValue() ? dateUtils.getFormattedDate(getValue()) : ""}</Typography>
                            <Typography>{row.original.updated_by ? `By: ${row.original.updated_by}` : ""}</Typography>
                        </Column>
                    );
                },
            },
            {
                header: "Status",
                accessorKey: "is_active",
                cell: ({ getValue }) => <CustomerStatusBadge status={getValue() ? "active" : "inActive"} />,
            },
            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <PopoverButton>
                        {({ onClose }) => (
                            <>
                                <ListItemButton
                                    onClick={() => {
                                        onClose();
                                        dispatch(actions.get_payout_location_details(row?.original?.tid));
                                    }}
                                >
                                    View
                                </ListItemButton>
                                <HasPermission permission={permissions.EDIT_PAYOUT_LOCATION}>
                                    <AddPayoutLocation update={true} update_data={row?.original} enablePopoverAction />
                                </HasPermission>
                                <HasPermission permission={permissions.DELETE_PAYOUT_LOCATION}>
                                    <Delete
                                        id={row.original.tid}
                                        handleDelete={handleDelete}
                                        loading={d_loading}
                                        tooltext="Delete Payout Location"
                                        enablePopoverAction
                                    />
                                </HasPermission>
                            </>
                        )}
                    </PopoverButton>
                ),
            },
        ],
        [],
    );

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "search",
            label: "Search",
        },
        {
            type: fieldTypes.COUNTRY_SELECT,
            name: "country",
            label: "Country",
        },
        {
            type: fieldTypes.SELECT,
            name: "payment_type",
            label: "Payment Type",
            options: paymentTypeOptions,
        },
    ];

    const handleStatus = useCallback((is_active, id) => {
        dispatch(actions.update_payout_location_status(id, { is_active: is_active }));
    }, []);

    const handleDelete = (id) => {
        dispatch(actions.delete_payout_location(id));
    };

    const sortByData = [
        { key: "", value: "created_ts" },
        { key: "Created At", value: "created_ts" },
        { key: "Payment Type", value: "payment_type" },
        { key: "Country", value: "country" },
    ];

    return (
        <PageContent
            documentTitle="Payout Location"
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "Payout Location",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Payout Location"
                    open={isFilterOpen}
                    fields={filterFields}
                    values={filterSchema}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    onClose={closeFilter}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer
                    title="Payout Location"
                    topRightContent={
                        <>
                            {/* <TableGridQuickFilter
                                onSortByChange={onQuickFilter}
                                onOrderByChange={onQuickFilter}
                                values={filterSchema}
                                disabled={g_loading}
                                sortByData={sortByData}
                            /> */}
                            <ExportUpload
                                data={payoutloaction_data?.data}
                                paginationData={payoutloaction_data?.pagination}
                                columns={columns}
                                filename="Payout Locations"
                                apiEndpoint={apiEndpoints.GetPayoutLocations}
                            />
                            <AddPayoutLocation update={false} />
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={payoutloaction_data?.data || []} loading={g_loading} />
                </PageContentContainer>
                <TablePagination
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                    paginationData={payoutloaction_data?.pagination}
                />
            </Column>
            <ViewPayoutLocationModal open={is_open} />
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_PAYOUT_LOCATION] })(PayoutLocation);
