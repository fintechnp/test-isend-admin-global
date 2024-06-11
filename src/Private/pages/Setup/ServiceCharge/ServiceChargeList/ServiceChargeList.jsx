import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import actions from "../store/actions";
import Header from "../components/Header";
import Filter from "../components/Filter";
import { Delete } from "./../../../../../App/components";
import Table, { TablePagination, TableSwitch } from "./../../../../../App/components/Table";
import { CountryName, CurrencyName, ReferenceName, FormatNumber } from "./../../../../../App/helpers";

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
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "",
    order_by: "DESC",
};

const ServiceChargeList = (props) => {
    const { id, name } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: servicecharge_data, loading: g_loading } = useSelector(
        (state) => state.get_service_charge_by_partner,
    );
    const { loading: d_loading, success: d_success } = useSelector((state) => state.delete_service_charge);
    const { success: a_success } = useSelector((state) => state.add_partner);
    const { success: u_success } = useSelector((state) => state.update_partner);

    useEffect(() => {
        if (id) {
            dispatch(actions.get_service_charge_by_partner(id, filterSchema));
        }
        dispatch({ type: "ADD_SERVICE_CHARGE_RESET" });
        dispatch({ type: "UPDATE_SERVICE_CHARGE_RESET" });
        dispatch({ type: "DELETE_SERVICE_CHARGE_RESET" });
    }, [dispatch, filterSchema, d_success, a_success, u_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "charge_id",
                maxWidth: 60,
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
                        <StyledText component="p">{CountryName(data.value)}</StyledText>
                        <Typography
                            sx={{
                                opacity: 0.6,
                                fontSize: "12px",
                                lineHeight: 1,
                            }}
                        >
                            {data?.row?.original?.receiving_currency
                                ? CurrencyName(data?.row?.original?.receiving_currency)
                                : ""}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box sx={{ textAlign: "center" }}>
                        <Typography>Customer Type</Typography>
                    </Box>
                ),
                accessor: "customer_type",
                width: 130,
                maxWidth: 180,
                Cell: (data) => (
                    <Box sx={{ textAlign: "center" }}>
                        <StyledText component="p">{data.value ? ReferenceName(37, data.value) : ""}</StyledText>
                        <Typography
                            component="p"
                            sx={{
                                opacity: 0.6,
                                fontSize: "12px",
                                lineHeight: 1,
                            }}
                        >
                            {data?.row?.original?.payment_type
                                ? ReferenceName(1, data?.row?.original?.payment_type)
                                : ""}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box sx={{ textAlign: "right" }}>
                        <Typography>Min/Max Amount</Typography>
                    </Box>
                ),
                accessor: "min_amount",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p" sx={{ textAlign: "right", paddingRight: "4px" }}>
                            {data.value ? FormatNumber(data.value) : "n/a"}
                        </StyledText>
                        <Typography
                            sx={{
                                paddingRight: "4px",
                                opacity: 0.6,
                                fontSize: "13px",
                                lineHeight: 1,
                                textAlign: "right",
                            }}
                        >
                            {data?.row?.original?.max_amount ? FormatNumber(data?.row?.original?.max_amount) : "n/a"}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box sx={{ textAlign: "right" }}>
                        <Typography>Flat/Per Charge</Typography>
                    </Box>
                ),
                accessor: "charge_flat",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p" sx={{ textAlign: "right", paddingRight: "4px" }}>
                            {data.value ? FormatNumber(data.value) : "n/a"}
                        </StyledText>
                        <Typography
                            sx={{
                                paddingRight: "4px",
                                opacity: 0.6,
                                fontSize: "13px",
                                lineHeight: 1,
                                textAlign: "right",
                            }}
                        >
                            {data?.row?.original?.charge_per ? data?.row?.original?.charge_per : "n/a"}
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
                accessor: "is_active",
                width: 130,
                maxWidth: 180,
                Cell: (data) => (
                    <SwitchWrapper textAlign="center" sx={{}}>
                        <TableSwitch value={data?.value} data={data.row.original} handleStatus={handleStatus} />
                    </SwitchWrapper>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center" sx={{}}>
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
                        <Tooltip title="Service Charge Details" arrow>
                            <IconButton onClick={() => navigate(`/setup/service-charge/details/${row.original.tid}`)}>
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
                            <IconButton onClick={() => navigate(`/setup/service-charge/update/${row?.original?.tid}`)}>
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
                        <Delete
                            id={row.original.tid}
                            handleDelete={handleDelete}
                            loading={d_loading}
                            tooltext="Delete Service Charge"
                        />
                    </Box>
                ),
            },
        ],
        [],
    );

    const sortData = [
        { key: "None", value: "" },
        { key: "Country", value: "receiving_country" },
        { key: "Payment Type", value: "payment_type" },
        { key: "Customer Type", value: "customer_type" },
    ];

    const orderData = [
        { key: "Ascending", value: "ASC" },
        { key: "Descending", value: "DESC" },
    ];

    const handleStatus = useCallback((is_active, id) => {
        dispatch(actions.update_service_charge_status(id, { is_active: is_active }));
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
        [filterSchema],
    );

    const handleSort = (e) => {
        const sort = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            sort_by: sort,
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
        dispatch(actions.delete_service_charge(id));
    };

    return (
        <>
            <Helmet>
                <title>BNB Admin | {props.title}</title>
            </Helmet>
            <MenuContainer>
                <Header title="Service Charge List" buttonText="Add Service Charge" name={name} agent_id={id} />
                <Filter
                    state={filterSchema}
                    sortData={sortData}
                    orderData={orderData}
                    handleSearch={handleSearch}
                    handleSort={handleSort}
                    handleOrder={handleOrder}
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
        </>
    );
};

export default ServiceChargeList;
