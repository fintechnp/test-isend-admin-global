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
import PageContentContainer from "App/components/Container/PageContentContainer";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";

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
                header: "Id",
                accessorKey: "charge_id",
            },
            {
                header: () => (
                    <Box>
                        <Typography>R.Country/Currency</Typography>
                    </Box>
                ),
                accessorKey: "receiving_country",
                cell: ({ row }) => (
                    <Box>
                        <StyledText component="p">{CountryName(row?.original?.receiving_country)}</StyledText>
                        <Typography
                            sx={{
                                opacity: 0.6,
                                fontSize: "12px",
                                lineHeight: 1,
                            }}
                        >
                            {row?.original?.receiving_currency ? CurrencyName(row?.original?.receiving_currency) : ""}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box sx={{ textAlign: "center" }}>
                        <Typography>Customer Type</Typography>
                    </Box>
                ),
                accessorKey: "customer_type",
                width: 130,
                maxWidth: 180,
                cell: ({ row }) => (
                    <Box sx={{ textAlign: "center" }}>
                        <StyledText component="p">
                            {row?.original?.customer_type ? ReferenceName(37, row?.original?.customer_type) : ""}
                        </StyledText>
                        <Typography
                            component="p"
                            sx={{
                                opacity: 0.6,
                                fontSize: "12px",
                                lineHeight: 1,
                            }}
                        >
                            {row?.original?.payment_type ? ReferenceName(1, row?.original?.payment_type) : ""}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box sx={{ textAlign: "right" }}>
                        <Typography>Min/Max Amount</Typography>
                    </Box>
                ),
                accessorKey: "min_amount",
                cell: ({ row }) => (
                    <Box>
                        <StyledText component="p" sx={{ textAlign: "right", paddingRight: "4px" }}>
                            {row?.original?.min_amount ? FormatNumber(row?.original?.min_amount) : "n/a"}
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
                            {row?.original?.max_amount ? FormatNumber(row?.original?.max_amount) : "n/a"}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box sx={{ textAlign: "right" }}>
                        <Typography>Flat/Per Charge</Typography>
                    </Box>
                ),
                accessorKey: "charge_flat",
                cell: ({ row }) => (
                    <Box>
                        <StyledText component="p" sx={{ textAlign: "right", paddingRight: "4px" }}>
                            {row?.original?.charge_flat ? FormatNumber(row?.original?.charge_flat) : "n/a"}
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
                            {row?.original?.charge_per ? row?.original?.charge_per : "n/a"}
                        </Typography>
                    </Box>
                ),
            },
            {
                header: () => (
                    <Box textAlign="center" sx={{}}>
                        <Typography>Status</Typography>
                    </Box>
                ),
                accessorKey: "is_active",
                cell: ({ row }) => (
                    <SwitchWrapper textAlign="center" sx={{}}>
                        <TableSwitch
                            value={row?.original?.is_active}
                            data={row?.original}
                            handleStatus={handleStatus}
                        />
                    </SwitchWrapper>
                ),
            },
            {
                header: () => (
                    <Box textAlign="center" sx={{}}>
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessorKey: "show",
                cell: ({ row }) => (
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
        <PageContent>
            <Helmet>
                <title>iSend | {props.title}</title>
            </Helmet>
            <PageContentContainer
                title={`Service Charge List of ${name}`}
                topRightContent={
                    <>
                        <Filter
                            state={filterSchema}
                            sortData={sortData}
                            orderData={orderData}
                            handleSearch={handleSearch}
                            handleSort={handleSort}
                            handleOrder={handleOrder}
                        />
                        <Header buttonText="Add Service Charge" agent_id={id} />
                    </>
                }
            >
                <TanstackReactTable
                    columns={columns}
                    title="Service Charge Details"
                    data={servicecharge_data?.data || []}
                    loading={g_loading}
                />
                <TablePagination
                    paginationData={servicecharge_data?.pagination}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </PageContentContainer>
        </PageContent>
    );
};

export default ServiceChargeList;
