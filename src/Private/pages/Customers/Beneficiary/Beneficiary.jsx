import React, { useEffect, useState, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MuiIconButton from "@mui/material/IconButton";
import { Box, Tooltip, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import actions from "./store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import { Block } from "./../../../../App/components";
import { CountryName, ReferenceName } from "./../../../../App/helpers";
import Table, { TablePagination } from "./../../../../App/components/Table";

const CustomerWrapper = styled("div")(({ theme }) => ({
    margin: "12px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
}));

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "13px",
    color: "border.main",
    textTransform: "capitalize",
}));

const StyledMail = styled(Typography)(({ theme }) => ({
    fontSize: "13px",
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "created_ts",
    order_by: "ASC",
};

function Beneficiary() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: customersData, loading: l_loading } = useSelector(
        (state) => state.get_beneficiary_by_customer
    );

    const { success: b_success, loading: b_loading } = useSelector(
        (state) => state.block_unblock_beneficiary
    );

    useEffect(() => {
        dispatch({ type: "CREATE_BENEFICIARY_RESET" });
        dispatch({ type: "UPDATE_BENEFICIARY_RESET" });
        dispatch({ type: "GET_BENEFICIARY_BYID_RESET" });
        dispatch({ type: "BLOCK_UNBLOCK_BENEFICIARY_RESET" });
    }, [dispatch]);

    useEffect(() => {
        dispatch(actions.get_beneficiary_by_customer(id, filterSchema));
        dispatch({ type: "BLOCK_UNBLOCK_BENEFICIARY_RESET" });
    }, [dispatch, filterSchema, b_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
            },
            {
                Header: "Name",
                accessor: "first_name",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "14px" }}>
                            {data.value} {data?.row?.original?.middle_name}{" "}
                            {data?.row?.original?.last_name}
                        </StyledName>
                        <Typography
                            component="p"
                            sx={{
                                fontSize: "14px",
                                opacity: 0.8,
                                lineHeight: 1.2,
                            }}
                        >
                            {data?.row?.original?.receiver_type_data}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: "Collection",
                accessor: "payment_type",
                Cell: (data) => {
                    return (
                        <>
                            <Typography
                                component="p"
                                sx={{ fontSize: "14px", lineHeight: 1.2 }}
                            >
                                {ReferenceName(1, data.value)}
                            </Typography>
                            <Typography
                                component="p"
                                sx={{
                                    fontSize: "13px",
                                    opacity: 0.8,
                                    lineHeight: 1.2,
                                }}
                            >
                                {data?.row?.original?.bank_name
                                    ? data?.row?.original?.bank_name
                                    : ""}
                            </Typography>
                        </>
                    );
                },
            },
            {
                Header: "Address",
                accessor: "country",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                            }}
                        >
                            {CountryName(data.value)}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{ paddingLeft: "2px", opacity: 0.8 }}
                        >
                            {data?.row?.original?.address
                                ? data?.row?.original?.address
                                : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Contact",
                accessor: "mobile_number",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                                opacity: 0.6,
                            }}
                        >
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                        <StyledMail
                            component="p"
                            sx={{ paddingLeft: "4px", fontSize: "13px" }}
                        >
                            {data?.row?.original?.email}
                        </StyledMail>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Status</Typography>
                    </Box>
                ),
                accessor: "is_active",
                maxWidth: 100,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {data.value ? (
                            <Tooltip title="Active" arrow>
                                <CheckCircleOutlineIcon
                                    sx={{ color: "success.main" }}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Blocked" arrow>
                                <RemoveCircleOutlineIcon
                                    sx={{ color: "border.main" }}
                                />
                            </Tooltip>
                        )}
                    </Box>
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
                        <Tooltip title="Beneficiary Details" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/customer/beneficiary/details/${row?.original?.customer_id}/${row?.original?.tid}`
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
                        <Tooltip title="Edit Beneficiary" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/customer/beneficiary/update/${row?.original.customer_id}/${row?.original?.tid}`
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
                        <Block
                            name="Beneficiary"
                            destroyOnUnmount
                            enableReinitialize
                            initialValues={{
                                id: row.original.tid,
                                is_active: row?.original?.is_active,
                            }}
                            onSubmit={handleBlock}
                            loading={b_loading}
                            status={row?.original?.is_active}
                        />
                    </Box>
                ),
            },
        ],
        []
    );

    const handleBlock = (data) => {
        dispatch(
            actions.block_unblock_beneficiary(data?.id, {
                is_active: !data?.is_active,
            })
        );
    };

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

    const handleSort = (e) => {
        const type = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            sort_by: type,
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

    return (
        <CustomerWrapper>
            <Header />
            <Filter
                handleSearch={handleSearch}
                handleSort={handleSort}
                handleOrder={handleOrder}
                // handleFilter={handleFilter}
            />
            <Table
                columns={columns}
                data={customersData?.data || []}
                loading={l_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={customersData?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </CustomerWrapper>
    );
}

export default Beneficiary;
