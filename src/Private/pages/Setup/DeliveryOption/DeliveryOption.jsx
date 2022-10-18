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
import { Delete } from "./../../../../App/components";
import {
    CountryName,
    CurrencyName,
    ReferenceName,
} from "./../../../../App/helpers";
import AddDeliveryOption from "./components/AddDeliveryOption";
import Table, {
    TablePagination,
    TableSwitch,
} from "./../../../../App/components/Table";

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
    fontSize: "15px",
    color: "border.main",
}));

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "15px",
    color: theme.palette.secondary.contrastText,
    textTransform: "capitalize",
}));

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

const DeliveryOption = () => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: deliveryoption_data, loading: g_loading } = useSelector(
        (state) => state.get_all_delivery_option
    );
    const { loading: d_loading, success: d_success } = useSelector(
        (state) => state.delete_delivery_option
    );
    const { success: a_success } = useSelector(
        (state) => state.add_delivery_option
    );
    const { success: u_success } = useSelector(
        (state) => state.update_delivery_option
    );

    useEffect(() => {
        dispatch(actions.get_all_delivery_option(filterSchema));
        dispatch({ type: "DELETE_DELIVERY_OPTION_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "delivery_option_id",
                maxWidth: 80,
            },
            {
                Header: "Option Name",
                accessor: "delivery_name",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
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
                        <StyledText component="p">
                            {data.value ? data.value : "n/a"}
                        </StyledText>
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
                        <StyledText component="p">
                            {data.value ? ReferenceName(1, data.value) : "n/a"}
                        </StyledText>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Country/Currency</Typography>
                    </Box>
                ),
                accessor: "country_code",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">
                            {data.value ? CountryName(data.value) : "N/A"}
                        </StyledText>
                        <Typography
                            sx={{
                                opacity: 0.6,
                                fontSize: "12px",
                                lineHeight: 1,
                            }}
                        >
                            {data?.row?.original?.currency_code
                                ? CurrencyName(
                                      data?.row?.original?.currency_code
                                  )
                                : "N/A"}
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
                    <SwitchWrapper textAlign="right" sx={{}}>
                        <TableSwitch
                            value={data?.value}
                            data={data.row.original}
                            handleStatus={handleStatus}
                        />
                    </SwitchWrapper>
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
                                <Tooltip
                                    title="Hide Delivery Option Details"
                                    arrow
                                >
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
                                <Tooltip
                                    title="Show Delivery Option Details"
                                    arrow
                                >
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
                        <AddDeliveryOption
                            update={true}
                            update_data={row?.original}
                        />
                        <Delete
                            id={row.original.tid}
                            handleDelete={handleDelete}
                            loading={d_loading}
                            tooltext="Delete Delivery Option"
                        />
                    </Box>
                ),
            },
        ],
        []
    );

    const sub_columns = [
        { key: "delivery_option_id", name: "Id" },
        { key: "delivery_name", name: "Name" },
        { key: "payout_agent", name: "Payout Agent" },
        { key: "country_code", name: "Country" },
        { key: "currency_code", name: "Currency" },
        { key: "payment_type", name: "Payment Type" },
        { key: "is_active", name: "Status" },
    ];

    const handleSearch = useCallback(
        (e) => {
            const searchValue = e.target.value;
            const updatedFilterSchema = {
                ...filterSchema,
                search: searchValue,
            };
            setFilterSchema(updatedFilterSchema);
        },
        [filterSchema]
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
        dispatch(
            actions.update_delivery_option_status(id, { is_active: is_active })
        );
    }, []);

    return (
        <MenuContainer>
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
        </MenuContainer>
    );
};

export default DeliveryOption;
