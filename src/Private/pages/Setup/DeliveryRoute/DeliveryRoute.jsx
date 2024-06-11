import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import actions from "./store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import { Delete } from "App/components";
import AddDeliveryRoute from "./components/AddDeliveryRoute";
import PageContent from "App/components/Container/PageContent";
import { CountryName, CurrencyName, ReferenceName } from "App/helpers";
import Table, { TablePagination, TableSwitch } from "App/components/Table";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";
import HasPermission from "Private/components/shared/HasPermission";
import useAuthUser from "Private/hooks/useAuthUser";

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

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "border.main",
}));

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "15px",
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    payout_country: "",
    payout_currency: "",
    payment_type: "",
    search: "",
    sort_by: "sending_agent",
    order_by: "DESC",
};

const DeliveryRoute = (props) => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { can } = useAuthUser();

    const { response: deliveryroute_data, loading: g_loading } = useSelector((state) => state.get_delivery_route);
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_delivery_route);
    const { success: a_success } = useSelector((state) => state.create_delivery_route);
    const { success: u_success } = useSelector((state) => state.update_delivery_route);

    useEffect(() => {
        dispatch(actions.get_delivery_route(filterSchema));
        dispatch({ type: "CREATE_DELIVERY_ROUTE_RESET" });
        dispatch({ type: "UPDATE_DELIVERY_ROUTE_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "delivery_route_id",
                maxWidth: 50,
            },
            {
                Header: "Sending Agent",
                accessor: "sending_agent",
                minWidth: 220,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px", opacity: 0.9 }}>
                            {data.value ? data.value : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Payout Agent</Typography>
                    </Box>
                ),
                accessor: "payout_agent",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">{data.value ? data.value : "n/a"}</StyledText>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Payment Type</Typography>
                    </Box>
                ),
                accessor: "payment_type",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">{data.value ? ReferenceName(1, data.value) : ""}</StyledText>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Country/Currency</Typography>
                    </Box>
                ),
                accessor: "payout_country",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">{CountryName(data.value)}</StyledText>
                        <Typography
                            sx={{
                                opacity: 0.6,
                                fontSize: "12px",
                                lineHeight: 1,
                            }}
                        >
                            {data.value ? CurrencyName(data?.row?.original?.payout_currency) : ""}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right" sx={{}}>
                        <Typography>Status</Typography>
                    </Box>
                ),
                accessor: "is_active",
                width: 120,
                Cell: (data) => (
                    <>
                        {can(permissions.EDIT_DELIVERY_ROUTE) ? (
                            <SwitchWrapper textAlign="right" sx={{}}>
                                <TableSwitch value={data?.value} data={data.row.original} handleStatus={handleStatus} />
                            </SwitchWrapper>
                        ) : (
                            <>{!!data.value ? "Active" : "Inactive"}</>
                        )}
                    </>
                ),
            },

            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessor: "show",
                Cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <span {...row.getToggleRowExpandedProps({})}>
                            {row.isExpanded ? (
                                <Tooltip title="Hide Route Details" arrow>
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
                                <Tooltip title="Show Route Details" arrow>
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
                        <HasPermission permission={permissions.EDIT_DELIVERY_ROUTE}>
                            <AddDeliveryRoute update={true} update_data={row?.original} />
                        </HasPermission>
                        <HasPermission permission={permissions.DELETE_DELIVERY_ROUTE}>
                            <Delete
                                id={row.original.tid}
                                handleDelete={handleDelete}
                                loading={d_loading}
                                tooltext="Delete Delivery Route"
                            />
                        </HasPermission>
                    </Box>
                ),
            },
        ],
        [],
    );

    const sub_columns = [
        { key: "delivery_route_id", name: "Id", type: "default" },
        { key: "sending_agent", name: "Sending Agent", type: "default" },
        { key: "payout_agent", name: "Payout Agent", type: "default" },
        { key: "payout_country", name: "Payout Country", type: "country" },
        { key: "payout_currency", name: "Payout Currency", type: "currency" },
        {
            key: "payment_type",
            name: "Payment Type",
            type: "reference",
            ref_value: 1,
        },
        { key: "is_active", name: "Status", type: "boolean" },
        { key: "created_ts", name: "Created Date", type: "date" },
    ];

    const handleStatus = useCallback((is_active, id) => {
        dispatch(actions.update_delivery_route_status(id, { is_active: is_active }));
    }, []);

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
        dispatch(actions.delete_delivery_route(id));
    };

    return (
        <PageContent documentTitle="Delivery Option">
            <Header />
            <Filter
                state={filterSchema}
                handleSearch={handleSearch}
                handleCountry={handleCountry}
                handleOrder={handleOrder}
                handlePayemntType={handlePayemntType}
            />
            <Table
                columns={columns}
                title="Delivery Route Details"
                data={deliveryroute_data?.data || []}
                sub_columns={sub_columns}
                loading={g_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={deliveryroute_data?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_DELIVERY_ROUTE] })(DeliveryRoute);
