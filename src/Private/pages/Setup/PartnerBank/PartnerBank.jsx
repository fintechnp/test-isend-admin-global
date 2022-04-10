import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Switch, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CableIcon from "@mui/icons-material/Cable";

import actions from "./store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import AddPartnerBank from "./components/AddPartnerBank";
import Table, { TablePagination } from "./../../../../App/components/Table";
import {
    CountryName,
    CurrencyName,
    ReferenceName,
} from "./../../../../App/helpers";

const MenuContainer = styled("div")(({ theme }) => ({
    margin: "8px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
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
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    payout_country: "",
    payout_currency: "",
    payment_type: "",
    search: "",
    sort_by: "bank_name",
    order_by: "ASC",
};

const PartnerBank = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: deliveryroute_data, loading: g_loading } = useSelector(
        (state) => state.get_all_partner_bank
    );
    const { loading: d_loading, success: d_success } = useSelector(
        (state) => state.delete_delivery_route
    );
    const { success: a_success } = useSelector(
        (state) => state.create_delivery_route
    );
    const { success: u_success } = useSelector(
        (state) => state.update_delivery_route
    );

    useEffect(() => {
        dispatch(actions.get_all_partner_bank(filterSchema));
        dispatch({ type: "ADD_MENU_RESET" });
        dispatch({ type: "UPDATE_MENU_RESET" });
        dispatch({ type: "DELETE_MENU_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(() => [
        {
            Header: "Id",
            accessor: "partner_bank_id",
            maxWidth: 60,
        },
        {
            Header: "Bank Name",
            accessor: "bank_name",
            Cell: (data) => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                    }}
                >
                    <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                        {data.value}
                    </StyledName>
                </Box>
            ),
        },
        {
            Header: () => (
                <Box>
                    <Typography>Ex. Bank Code</Typography>
                </Box>
            ),
            accessor: "external_bank_code",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">{data.value}</StyledText>
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
                        {ReferenceName(1, data?.value)}
                    </StyledText>
                </Box>
            ),
        },
        {
            Header: "Country/Currency",
            accessor: "country",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">
                        {CountryName(data.value)}
                    </StyledText>
                    <Typography
                        sx={{ opacity: 0.6, fontSize: "12px", lineHeight: 1 }}
                    >
                        {CurrencyName(data?.row?.original?.currency)}
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
            Cell: (data) => (
                <SwitchWrapper textAlign="right" sx={{}}>
                    <Switch
                        defaultChecked={data?.value}
                        size="small"
                        onChange={(event) =>
                            handleStatus(
                                event.target.checked,
                                data?.row?.original?.id
                            )
                        }
                    />
                </SwitchWrapper>
            ),
        },
        {
            Header: "",
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
                            <Tooltip title="Hide Partner Bank Details" arrow>
                                <IconButton>
                                    <VisibilityOffOutlinedIcon
                                        sx={{
                                            fontSize: "20px",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        ) : (
                            <Tooltip title="Show Partner Bank Details" arrow>
                                <IconButton>
                                    <RemoveRedEyeOutlinedIcon
                                        sx={{
                                            fontSize: "20px",
                                        }}
                                    />
                                </IconButton>
                            </Tooltip>
                        )}
                    </span>
                    <AddPartnerBank update={true} update_data={row?.original} />
                    <Tooltip title="Map Partner Bank" arrow>
                        <IconButton
                            onClick={() =>
                                navigate(
                                    `/setup/partner-bank/map/${row?.original?.payment_type}/${row?.original?.country}/${row?.original?.currency}`
                                )
                            }
                        >
                            <CableIcon
                                sx={{
                                    fontSize: "20px",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </Box>
            ),
        },
    ]);

    const sub_columns = [
        { key: "delivery_route_id", name: "Id" },
        { key: "sending_agent", name: "Sending Agent" },
        { key: "payout_agent", name: "Payout Agent" },
        { key: "payout_country", name: "Country" },
        { key: "payout_currency", name: "Currency" },
        { key: "payment_type", name: "Payment Type" },
        { key: "is_active", name: "Status" },
    ];

    const handleStatus = useCallback((is_active, id) => {
        // dispatch(actions.update_user_status({ is_active: is_active }, id));
    }, []);

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

    const handleSortBy = (e) => {
        const sort = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            payment_type: sort,
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
        dispatch(actions.delete_partner_bank(id));
    };

    return (
        <MenuContainer>
            <Header />
            <Filter
                handleSearch={handleSearch}
                handleCountry={handleCountry}
                handleOrder={handleOrder}
                handleSortBy={handleSortBy}
            />
            <Table
                columns={columns}
                handleDelete={handleDelete}
                title="Delivery Bank Details"
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
        </MenuContainer>
    );
};

export default PartnerBank;
