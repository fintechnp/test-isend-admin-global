import React, { useState, useEffect, useMemo, useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { Delete } from "App/components";
import Filter from "./components/Filter";
import PageContent from "App/components/Container/PageContent";
import AddDeliveryOption from "./components/AddDeliveryOption";
import { TablePagination, TableSwitch } from "App/components/Table";

import Spacer from "App/components/Spacer/Spacer";
import TanstackReactTable from "App/components/Table/TanstackReactTable";

import actions from "./store/actions";
import { CountryName, CurrencyName, ReferenceName } from "App/helpers";
import TableRowActionContainer from "App/components/Table/TableRowActionContainer";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";
import HasPermission from "Private/components/shared/HasPermission";
import useAuthUser from "Private/hooks/useAuthUser";

const initialState = {
    page_number: 1,
    page_size: 15,
    payout_country: "",
    payout_currency: "",
    payment_type: "",
    search: "",
    sort_by: "country_code",
    order_by: "DESC",
};

const DeliveryOption = (props) => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { can } = useAuthUser();

    const { response: deliveryoption_data, loading: g_loading } = useSelector((state) => state.get_all_delivery_option);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_delivery_option);
    const { success: a_success } = useSelector((state) => state.add_delivery_option);
    const { success: u_success } = useSelector((state) => state.update_delivery_option);

    useEffect(() => {
        dispatch(actions.get_all_delivery_option(filterSchema));
        dispatch({ type: "DELETE_DELIVERY_OPTION_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(
        () => [
            {
                header: "ID",
                accessorKey: "delivery_option_id",
            },
            {
                header: "Option Name",
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
                        <Box>
                            <Typography component="p">{getValue() ? CountryName(getValue()) : "N/A"}</Typography>
                            <Typography color="grey.600" variant="caption">
                                {row?.original?.currency_code ? CurrencyName(row?.original?.currency_code) : "N/A"}
                            </Typography>
                        </Box>
                    );
                },
            },
            {
                header: "Status",
                accessorKey: "is_active",
                cell: (data) => (
                    <>
                        {can(permissions.EDIT_DELIVERY_OPTION) ? (
                            <TableSwitch
                                value={data?.value ?? false}
                                data={data.row.original}
                                handleStatus={handleStatus}
                            />
                        ) : (
                            <>{!!data.value ? "Active" : "Inactive"}</>
                        )}
                    </>
                ),
            },
            {
                header: "Actions",
                accessorKey: "show",
                cell: ({ row }) => (
                    <TableRowActionContainer>
                        <span onClick={() => row.toggleExpanded()}>
                            {row.getIsExpanded() ? (
                                <Tooltip title="Hide Delivery Option Details" arrow>
                                    <IconButton>
                                        <VisibilityOffOutlinedIcon
                                            sx={{
                                                fontSize: "20px",
                                                "&:hover": {
                                                    background: "transparent",
                                                },
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Show Delivery Option Details" arrow>
                                    <IconButton>
                                        <RemoveRedEyeOutlinedIcon
                                            sx={{
                                                fontSize: "20px",
                                                "&:hover": {
                                                    background: "transparent",
                                                },
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </span>
                        <HasPermission permission={permissions.EDIT_DELIVERY_OPTION}>
                            <AddDeliveryOption update={true} update_data={row?.original} />
                        </HasPermission>
                        <HasPermission permission={permissions.DELETE_DELIVERY_OPTION}>
                            <Delete
                                id={row.original.tid}
                                handleDelete={handleDelete}
                                loading={d_loading}
                                tooltext="Delete Delivery Option"
                            />
                        </HasPermission>
                    </TableRowActionContainer>
                ),
            },
        ],
        [],
    );

    const sub_columns = [
        { key: "delivery_option_id", name: "Id", type: "default" },
        { key: "delivery_name", name: "Name", type: "default" },
        { key: "payout_agent", name: "Payout Agent", type: "default" },
        { key: "country_code", name: "Country", type: "country" },
        { key: "currency_code", name: "Currency", type: "currency" },
        {
            key: "payment_type",
            name: "Payment Type",
            type: "reference",
            ref_value: 1,
        },
        { key: "is_active", name: "Status", type: "boolean" },
        { key: "created_ts", name: "Created Date", type: "date" },
    ];

    const handleSearch = useCallback(
        (value) => {
            const updatedFilterSchema = {
                ...filterSchema,
                search: value,
            };
            setFilterSchema(updatedFilterSchema);
        },
        [filterSchema],
    );

    const handleCountry = (e) => {
        const country = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            payout_country: country,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleOrder = (e) => {
        const order = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            order_by: order,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handlePayemntType = (e) => {
        const payment = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            payment_type: payment,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleChangePage = (e, newPage) => {
        const updatedFilter = {
            ...filterSchema,
            page_number: ++newPage,
        };
        setFilterSchema(updatedFilter);
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            page_number: 1,
            page_size: +pageSize,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleDelete = (id) => {
        dispatch(actions.delete_delivery_option(id));
    };

    const handleStatus = useCallback((is_active, id) => {
        dispatch(actions.update_delivery_option_status(id, { is_active: is_active }));
    }, []);

    return (
        <PageContent
            title="Delivery Options"
            topRightEndContent={
                <HasPermission permission={permissions.CREATE_DELIVERY_OPTION}>
                    <AddDeliveryOption update={false} />
                </HasPermission>
            }
        >
            <Filter
                state={filterSchema}
                handleSearch={handleSearch}
                handleCountry={handleCountry}
                handleOrder={handleOrder}
                handlePayemntType={handlePayemntType}
            />
            <Spacer />
            <TanstackReactTable
                columns={columns}
                title="Delivery Option Details"
                data={deliveryoption_data?.data || []}
                sub_columns={sub_columns}
                loading={g_loading}
                rowsPerPage={8}
                totalPage={deliveryoption_data?.pagination?.totalPage || 1}
                renderPagination={() => (
                    <TablePagination
                        paginationData={deliveryoption_data?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_DELIVERY_OPTION] })(DeliveryOption);
