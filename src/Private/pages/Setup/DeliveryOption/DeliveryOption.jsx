import { useDispatch, useSelector } from "react-redux";
import React, { useCallback, useEffect, useMemo } from "react";
import { Box, Button, ListItemButton, Typography } from "@mui/material";

import { Delete } from "App/components";
import Column from "App/components/Column/Column";
import FilterButton from "App/components/Button/FilterButton";
import PageContent from "App/components/Container/PageContent";
import AddDeliveryOption from "./components/AddDeliveryOption";
import PopoverButton from "App/components/Button/PopoverButton";
import { TablePagination, TableSwitch } from "App/components/Table";
import { CountryName, CurrencyName, ReferenceName } from "App/helpers";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import FilterForm, { fieldTypes } from "App/components/Filter/FilterForm";
import TableGridQuickFilter from "App/components/Filter/TableGridQuickFilter";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "./store/actions";
import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import referenceTypeId from "Private/config/referenceTypeId";
import useListFilterStore from "App/hooks/useListFilterStore";
import HasPermission from "Private/components/shared/HasPermission";
import ViewDeliveryOptionModal from "./components/ViewDeliveryOptionModal";
import CustomerStatusBadge from "Private/pages/Customers/Search/components/CustomerStatusBadge";

import dateUtils from "App/utils/dateUtils";
import PartnerType from "App/data/PartnerType";
import apiEndpoints from "Private/config/apiEndpoints";
import ExportUpload from "Private/components/reports/ExportUpload";

const initialState = {
    page_number: 1,
    page_size: 10,
    sort_by: "created_ts",
    order_by: "DESC",
};

const DeliveryOption = () => {
    const dispatch = useDispatch();
    const reference = JSON.parse(localStorage.getItem("reference"));
    const country = JSON.parse(localStorage.getItem("country"));

    const currencyOptions = country.map((c) => ({ label: c.currency_name, value: c.currency }));

    const paymentTypeOptions = reference
        ?.filter((ref) => ref.reference_type === referenceTypeId.paymentType)[0]
        .reference_data.map((ref) => ({ label: ref.name, value: ref.value }));

    const { can } = useAuthUser();

    const { response: deliveryoption_data, loading: g_loading } = useSelector((state) => state.get_all_delivery_option);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_delivery_option);
    const { success: a_success } = useSelector((state) => state.add_delivery_option);
    const { success: u_success } = useSelector((state) => state.update_delivery_option);
    const { is_open } = useSelector((state) => state.get_delivery_option_details);

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

    const filterFields = [
        {
            type: fieldTypes.TEXTFIELD,
            name: "delivery_name",
            label: "Delivery Name",
        },
        {
            type: fieldTypes.COUNTRY_SELECT,
            name: "payout_country",
            label: "Country",
        },
        {
            type: fieldTypes.SELECT,
            name: "payout_currency",
            label: "Currency",
            options: currencyOptions,
        },
        {
            type: fieldTypes.SELECT,
            name: "payment_type",
            label: "Payment Type",
            options: paymentTypeOptions,
        },
        {
            type: fieldTypes.PARTNER_SELECT,
            name: "payout_agent",
            label: "Payout Agent",
            partnerType: PartnerType.PAY,
        },
        {
            type: fieldTypes.SELECT,
            name: "is_active",
            label: "Status",
            options: [
                {
                    label: "Active",
                    value: true,
                },
                {
                    label: "Inactive",
                    value: false,
                },
            ],
        },
    ];

    const sortByData = [
        {
            key: "Created Date",
            value: "created_ts",
        },
        {
            key: "Country",
            value: "country_code",
        },
        {
            key: "Payment Type",
            value: "payment_type",
        },
        {
            key: "Option Name",
            value: "delivery_name",
        },
    ];

    useEffect(() => {
        dispatch(actions.get_all_delivery_option(filterSchema));
        dispatch({ type: "DELETE_DELIVERY_OPTION_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(
        () => [
            {
                header: "S.N.",
                accessorKey: "f_serial_no",
            },
            {
                header: "Delivery Option",
                accessorKey: "delivery_name",
            },
            {
                header: "Payout Agent",
                accessorKey: "payout_agent",
            },
            {
                header: "Payment Type",
                accessorKey: "payment_type",
                cell: ({ getValue }) => <>{getValue() ? ReferenceName(1, getValue()) : "N/A"}</>,
            },
            {
                header: "Country/Currency",
                accessorKey: "country_code",
                cell: ({ row, getValue }) => {
                    return (
                        <Column>
                            <Typography component="p">{getValue() ? CountryName(getValue()) : "N/A"}</Typography>
                            <Typography color="grey.600" variant="caption">
                                {row?.original?.currency_code ? CurrencyName(row?.original?.currency_code) : "N/A"}
                            </Typography>
                        </Column>
                    );
                },
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
                                        dispatch(actions.get_delivery_option_details(row.original.tid));
                                    }}
                                >
                                    View
                                </ListItemButton>
                                <HasPermission permission={permissions.EDIT_DELIVERY_OPTION}>
                                    <AddDeliveryOption update={true} update_data={row?.original} enablePopoverAction />
                                </HasPermission>
                                <HasPermission permission={permissions.DELETE_DELIVERY_OPTION}>
                                    <Delete
                                        id={row.original.tid}
                                        handleDelete={handleDelete}
                                        loading={d_loading}
                                        tooltext="Delete Delivery Option"
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

    const handleDelete = (id) => {
        dispatch(actions.delete_delivery_option(id));
    };

    const handleStatus = useCallback((is_active, id) => {
        dispatch(actions.update_delivery_option_status(id, { is_active: is_active }));
    }, []);

    return (
        <PageContent
            documentTitle="Delivery Options"
            topRightEndContent={
                <FilterButton size="small" onClick={() => (isFilterOpen ? closeFilter() : openFilter())} />
            }
            breadcrumbs={[{ label: "Setup" }, { label: "Delivery Options" }]}
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
                    title="Delivery Options"
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
                                filename="Delivery Options"
                                columns={columns}
                                data={deliveryoption_data?.data || []}
                                paginationData={deliveryoption_data?.pagination}
                                apiEndpoint={apiEndpoints.GetDeliveryOptions}
                            />
                            <AddDeliveryOption update={false} />
                        </>
                    }
                >
                    <TanstackReactTable columns={columns} data={deliveryoption_data?.data || []} loading={g_loading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={deliveryoption_data?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
            <ViewDeliveryOptionModal open={is_open} />
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_DELIVERY_OPTION] })(DeliveryOption);
