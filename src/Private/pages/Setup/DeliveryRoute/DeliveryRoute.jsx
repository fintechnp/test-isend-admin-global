import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import MuiIconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useCallback, useEffect, useMemo } from "react";

import { Delete } from "App/components";
import Column from "App/components/Column/Column";
import withPermission from "Private/HOC/withPermission";
import AddDeliveryRoute from "./components/AddDeliveryRoute";
import FilterButton from "App/components/Button/FilterButton";
import useListFilterStore from "App/hooks/useListFilterStore";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import ExportUpload from "Private/components/reports/ExportUpload";
import { TablePagination, TableSwitch } from "App/components/Table";
import HasPermission from "Private/components/shared/HasPermission";
import { CountryName, CurrencyName, ReferenceName } from "App/helpers";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import ViewDeliveryRoutesModal from "./components/ViewDeliveryRoutesModal";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";
import CustomerStatusBadge from "Private/pages/Customers/Search/components/CustomerStatusBadge";

import actions from "./store/actions";
import dateUtils from "App/utils/dateUtils";
import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";
import apiEndpoints from "Private/config/apiEndpoints";
import referenceTypeId from "Private/config/referenceTypeId";

const MenuContainer = styled("div")(({ theme }) => ({
    margin: "8px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
    background: theme.palette.background.dark,
}));

const SwitchWrapper = styled(Box)(({ theme }) => ({
    "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked": {
        opacity: 0.8,
        color: theme.palette.primary.main,
    },
}));

const initialState = {
    page_number: 1,
    page_size: 10,
    sort_by: "created_ts",
    order_by: "DESC",
};

const DeliveryRoute = (props) => {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));

    const paymentTypeOptions = reference
        .filter((ref) => ref.reference_type === referenceTypeId.paymentType)[0]
        .reference_data.map((ref) => ({ label: ref.name, value: ref.value }));

    const { can } = useAuthUser();

    const { response: deliveryroute_data, loading: g_loading } = useSelector((state) => state.get_delivery_route);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_delivery_route);
    const { success: a_success } = useSelector((state) => state.create_delivery_route);
    const { success: u_success } = useSelector((state) => state.update_delivery_route);
    const { is_open } = useSelector((state) => state.get_delivery_route_by_id);

    const {
        isFilterOpen,
        openFilter,
        closeFilter,
        onPageChange,
        onDeleteFilterParams,
        onFilterSubmit,
        onQuickFilter,
        onRowsPerPageChange,
        reset,
        filterSchema,
    } = useListFilterStore({ initialState });

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "Sending Agent",
                accessorKey: "sending_agent",
                cell: ({ getValue, row }) => <>{getValue() ? getValue() : "-"}</>,
            },
            {
                Header: "Payout Agent",
                accessorKey: "payout_agent",
                cell: ({ getValue, row }) => <>{getValue() ? getValue() : "-"}</>,
            },
            {
                header: "Payment Type",
                accessorKey: "payment_type",
                cell: ({ getValue, row }) => <> {getValue() ? ReferenceName(1, getValue()) : "-"}</>,
            },
            {
                header: "Country/Currency",
                accessorKey: "payout_country",
                cell: ({ getValue, row }) => (
                    <Column>
                        <Typography component="p">{getValue() ? CountryName(getValue()) : "-"}</Typography>
                        <Typography>
                            {row.original?.payout_currency ? CurrencyName(row?.original?.payout_currency) : "-"}
                        </Typography>
                    </Column>
                ),
            },
            {
                header: "Created At/By",
                accessorKey: "created_ts",
                cell: ({ row, getValue }) => {
                    return (
                        <Column>
                            <Typography>{getValue() ? dateUtils.getLocalDateFromUTC(getValue()) : "-"}</Typography>
                            <Typography>By: {row.original.created_by ? row.original.created_by : "-"}</Typography>
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
                            <Typography>{getValue() ? dateUtils.getLocalDateFromUTC(getValue()) : "-"}</Typography>
                            <Typography>By: {row.original.updated_by ? row.original.updated_by : "-"}</Typography>
                        </Column>
                    );
                },
            },
            {
                header: "Status",
                accessorKey: "is_active",
                cell: ({ getValue }) => <CustomerStatusBadge status={getValue() ? "active" : "inActive"} />,
            },
            // {
            //     header: "Status",
            //     accessorKey: "is_active",
            //     cell: ({ getValue, row }) => (
            //         <>
            //             {can(permissions.EDIT_DELIVERY_ROUTE) ? (
            //                 <SwitchWrapper textAlign="right" sx={{}}>
            //                     <TableSwitch value={getValue()} data={row.original} handleStatus={handleStatus} />
            //                 </SwitchWrapper>
            //             ) : (
            //                 <>{!!getValue() ? "Active" : "Inactive"}</>
            //             )}
            //         </>
            //     ),
            // },

            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ getValue, row }) => (
                    <>
                        <PopoverButton>
                            {({ onClose }) => (
                                <>
                                    <ListItemButton
                                        onClick={() => {
                                            onClose();
                                            dispatch(actions.get_delivery_route_by_id(row?.original?.tid));
                                        }}
                                    >
                                        View
                                    </ListItemButton>
                                    <HasPermission permission={permissions.EDIT_DELIVERY_ROUTE}>
                                        <AddDeliveryRoute
                                            update={true}
                                            update_data={row?.original}
                                            enablePopoverAction
                                        />
                                    </HasPermission>
                                    <HasPermission permission={permissions.DELETE_DELIVERY_ROUTE}>
                                        <Delete
                                            id={row.original.tid}
                                            handleDelete={handleDelete}
                                            loading={d_loading}
                                            tooltext="Delete Delivery Route"
                                            enablePopoverAction
                                        />
                                    </HasPermission>
                                </>
                            )}
                        </PopoverButton>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        ></Box>
                    </>
                ),
            },
        ],
        [],
    );

    const handleStatus = useCallback((is_active, id) => {
        dispatch(actions.update_delivery_route_status(id, { is_active: is_active }));
    }, []);

    const handleDelete = (id) => {
        dispatch(actions.delete_delivery_route(id));
    };
    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "search",
            label: "Search",
        },
        {
            type: fieldTypes.COUNTRY_SELECT,
            name: "payout_country",
            label: "Payout Country",
        },
        {
            type: fieldTypes.SELECT,
            name: "payment_type",
            label: "Payment Type",
            options: paymentTypeOptions,
        },
    ];

    const sortByData = [
        {
            key: "Created Date",
            value: "created_ts",
        },
        {
            key: "Payout Country",
            value: "payout_country",
        },
        {
            key: "Payment Type",
            value: "payment_type",
        },
        {
            key: "Sending Agent",
            value: "sending_agent",
        },
    ];

    useEffect(() => {
        dispatch(actions.get_delivery_route(filterSchema));
        dispatch({ type: "CREATE_DELIVERY_ROUTE_RESET" });
        dispatch({ type: "UPDATE_DELIVERY_ROUTE_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    return (
        <PageContent
            documentTitle="Delivery Routes"
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "Delivery Routes",
                },
            ]}
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
        >
            <Column gap="16px">
                <FilterForm
                    title="Search Delivery Options"
                    open={isFilterOpen}
                    fields={filterFields}
                    values={filterSchema}
                    onSubmit={onFilterSubmit}
                    onReset={reset}
                    onClose={closeFilter}
                    onDelete={onDeleteFilterParams}
                />
                <PageContentContainer
                    title="Delivery Routes"
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
                                filename="Delivery Routes"
                                columns={columns}
                                data={deliveryroute_data?.data || []}
                                paginationData={deliveryroute_data?.pagination}
                                apiEndpoint={apiEndpoints.GetDeliveryRoutes}
                            />
                            <AddDeliveryRoute update={false} />
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={deliveryroute_data?.data || []} loading={g_loading} />
                </PageContentContainer>
                <TablePagination
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                    paginationData={deliveryroute_data?.pagination}
                />
            </Column>
            <ViewDeliveryRoutesModal open={is_open} />
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_DELIVERY_ROUTE] })(DeliveryRoute);
