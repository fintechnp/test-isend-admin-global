import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Switch, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import actions from "../store/actions";
import Header from "../components/Header";
import Filter from "../components/Filter";
import { Delete } from "./../../../../../App/components";
import Table, { TablePagination } from "./../../../../../App/components/Table";

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
    country: "",
    currency: "",
    agent_type: "",
    search: "",
    sort_by: "country",
    order_by: "ASC",
};

const ExchangeRateList = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: rateList, loading: g_loading } = useSelector(
        (state) => state.get_exchange_rate_by_partner
    );
    const { loading: d_loading, success: d_success } = useSelector(
        (state) => state.delete_excahnge_rate
    );
    const { success: a_success } = useSelector(
        (state) => state.add_exchange_rate
    );
    const { success: u_success } = useSelector((state) => state.update_partner);

    useEffect(() => {
        if (id) {
            dispatch(actions.get_exchange_rate_by_partner(id, filterSchema));
        }
        dispatch({ type: "ADD_MENU_RESET" });
        dispatch({ type: "UPDATE_MENU_RESET" });
        dispatch({ type: "DELETE_MENU_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(() => [
        {
            Header: "Id",
            accessor: "exchange_rate_id",
            maxWidth: 50,
        },
        {
            Header: "Partner Name",
            accessor: "agent_name",
            width: 180,
            maxWidth: 280,
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
                    <Typography>Sending Currency</Typography>
                </Box>
            ),
            accessor: "sending_currency",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">{data.value}</StyledText>
                </Box>
            ),
        },
        {
            Header: () => (
                <Box>
                    <Typography>Base Country</Typography>
                </Box>
            ),
            accessor: "base_currency",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">{data.value}</StyledText>
                </Box>
            ),
        },
        {
            Header: () => (
                <Box>
                    <Typography>Recieve Country</Typography>
                </Box>
            ),
            accessor: "receiving_country",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">{data.value}</StyledText>
                    <Typography
                        sx={{ opacity: 0.6, fontSize: "12px", lineHeight: 1 }}
                    >
                        {data?.row?.original?.receiving_currency}
                    </Typography>
                </Box>
            ),
        },
        {
            Header: () => (
                <Box sx={{}}>
                    <Typography>Customer Rate</Typography>
                </Box>
            ),
            accessor: "customer_rate",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">{data.value}</StyledText>
                </Box>
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
                    <Tooltip title="Exchange Rate Details" arrow>
                        <IconButton
                            onClick={() =>
                                navigate(
                                    `/setup/exchange-rate/details/${row.original.exchange_rate_id}`
                                )
                            }
                        >
                            <RemoveRedEyeOutlinedIcon
                                sx={{
                                    fontSize: "20px",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Exchange Rate" arrow>
                        <IconButton
                            onClick={() =>
                                navigate(
                                    `/setup/exchange-rate/update/${row.original.exchange_rate_id}`
                                )
                            }
                        >
                            <EditOutlinedIcon
                                sx={{
                                    fontSize: "20px",
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Delete
                        tooltext="Delete Exchange Rate"
                        handleDelete={handleDelete}
                    />
                </Box>
            ),
        },
    ]);

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
            country: country,
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

    const handleAgentType = (e) => {
        const payment = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            agent_type: payment,
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
        dispatch(actions.delete_corridor(id));
    };

    return (
        <MenuContainer>
            <Header
                title="Exchange Rate List"
                buttonText="Add Exchange Rate"
            />
            <Filter
                handleSearch={handleSearch}
                handleCountry={handleCountry}
                handleOrder={handleOrder}
                handleAgentType={handleAgentType}
            />
            <Table
                columns={columns}
                title="Exchange Rate Details"
                data={rateList?.data || []}
                loading={g_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={rateList?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </MenuContainer>
    );
};

export default ExchangeRateList;
