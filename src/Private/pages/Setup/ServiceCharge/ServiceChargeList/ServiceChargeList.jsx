import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Switch, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import actions from "../store/actions";
import Header from "../components/Header";
import Filter from "../components/Filter";
import { Delete } from "./../../../../../App/components";
import Table, {
    TablePagination,
    TableSwitch,
} from "./../../../../../App/components/Table";
import {
    CountryName,
    CurrencyName,
    ReferenceName,
} from "./../../../../../App/helpers";

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
    sort_by: "",
    order_by: "ASC",
};

const ServiceChargeList = () => {
    const { id, name } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: servicecharge_data, loading: g_loading } = useSelector(
        (state) => state.get_service_charge_by_partner
    );
    const { loading: d_loading, success: d_success } = useSelector(
        (state) => state.delete_corridor
    );
    const { success: a_success } = useSelector((state) => state.add_partner);
    const { success: u_success } = useSelector((state) => state.update_partner);

    useEffect(() => {
        if (id) {
            dispatch(actions.get_service_charge_by_partner(id, filterSchema));
        }
        dispatch({ type: "ADD_MENU_RESET" });
        dispatch({ type: "UPDATE_MENU_RESET" });
        dispatch({ type: "DELETE_MENU_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(() => [
        {
            Header: "Id",
            accessor: "charge_id",
            maxWidth: 60,
        },
        {
            Header: "Partner Name",
            accessor: "agent_name",
            width: 220,
            maxWidth: 280,
            Cell: (data) => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "center",
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
                    <Typography>R.Country/Currency</Typography>
                </Box>
            ),
            accessor: "receiving_country",
            Cell: (data) => (
                <Box>
                    <StyledText component="p">
                        {CountryName(data.value)}
                    </StyledText>
                    <Typography
                        sx={{ opacity: 0.6, fontSize: "12px", lineHeight: 1 }}
                    >
                        {CurrencyName(data?.row?.original?.receiving_currency)}
                    </Typography>
                </Box>
            ),
        },
        {
            Header: () => (
                <Box>
                    <Typography>Customer Type</Typography>
                </Box>
            ),
            accessor: "customer_type",
            width: 130,
            maxWidth: 180,
            Cell: (data) => (
                <Box>
                    <StyledText component="p">
                        {ReferenceName(37, data.value)}
                    </StyledText>
                    <Typography
                        component="p"
                        sx={{
                            opacity: 0.6,
                            fontSize: "12px",
                            lineHeight: 1,
                        }}
                    >
                        {ReferenceName(1, data?.row?.original?.payment_type)}
                    </Typography>
                </Box>
            ),
        },
        {
            Header: () => (
                <Box>
                    <Typography>Min/Max Amount</Typography>
                </Box>
            ),
            accessor: "min_amount",
            Cell: (data) => (
                <Box>
                    <StyledText
                        component="p"
                        sx={{ textAlign: "right", paddingRight: "16px" }}
                    >
                        {data.value}
                    </StyledText>
                    <Typography
                        sx={{
                            pr: 2,
                            opacity: 0.6,
                            fontSize: "13px",
                            lineHeight: 1,
                            textAlign: "right",
                        }}
                    >
                        {data?.row?.original?.max_amount}
                    </Typography>
                </Box>
            ),
        },
        {
            Header: () => (
                <Box textAlign="center" sx={{}}>
                    <Typography>Status</Typography>
                </Box>
            ),
            accessor: "is_enable",
            width: 130,
            maxWidth: 180,
            Cell: (data) => (
                <SwitchWrapper textAlign="center" sx={{}}>
                    <TableSwitch
                        value={data?.value}
                        data={data.row.original}
                        handleStatus={handleStatus}
                    />
                </SwitchWrapper>
            ),
        },
        {
            Header: "Actions",
            accessor: "show",
            Cell: ({ row }) => (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <Tooltip title="Service Charge Details" arrow>
                        <IconButton
                            onClick={() =>
                                navigate(
                                    `/setup/service-charge/details/${row.original.tid}`
                                )
                            }
                        >
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
                    <Tooltip title="Edit Service Charge" arrow>
                        <IconButton
                            onClick={() =>
                                navigate(
                                    `/setup/service-charge/update/${row?.original?.tid}`
                                )
                            }
                        >
                            <EditOutlinedIcon
                                sx={{
                                    fontSize: "20px",
                                    "&:hover": {
                                        background: "transparent",
                                    },
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Delete tooltext="Delete Service Charge" />
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
                title="Service Charge List"
                buttonText="Add Service Charge"
                name={name}
                agent_id={id}
            />
            <Filter
                handleSearch={handleSearch}
                handleCountry={handleCountry}
                handleOrder={handleOrder}
                handleAgentType={handleAgentType}
            />
            <Table
                columns={columns}
                title="Service Charge Details"
                data={servicecharge_data?.data || []}
                loading={g_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={servicecharge_data?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </MenuContainer>
    );
};

export default ServiceChargeList;
