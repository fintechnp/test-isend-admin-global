import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import actions from "./../store/actions";
import Header from "./../components/Header";
import Filter from "./../components/Filter";
import { Release } from "./../../../../App/components";
import Table, { TablePagination } from "./../../../../App/components/Table";
import { CurrencyName, FormatDate } from "./../../../../App/helpers";

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

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "created_ts",
    order_by: "ASC",
};

const PendingPayment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: sanctionList, loading: l_loading } = useSelector(
        (state) => state.get_payment_pending
    );
    const { success: u_success } = useSelector(
        (state) => state.update_sanction
    );

    useEffect(() => {
        dispatch(actions.get_payment_pending(filterSchema));
        dispatch({ type: "ADD_SANCTION_RESET" });
        dispatch({ type: "UPDATE_SANCTION_RESET" });
        dispatch({ type: "DELETE_SANCTION_RESET" });
        dispatch({ type: "IMPORT_SANCTION_LIST_RESET" });
    }, [dispatch, filterSchema, u_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
            },
            {
                Header: "Name",
                accessor: "customer_name",
                maxWidth: 140,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "14px" }}>
                            {data.value}
                        </StyledName>
                        <Typography
                            component="span"
                            sx={{ fontSize: "12px", opacity: 0.8 }}
                        >
                            {data?.row?.original?.beneficiary_name}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: "Partner",
                accessor: "agent_name",
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
                                fontSize: "14px",
                                opacity: 0.6,
                            }}
                        >
                            {data.value}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Currency</Typography>
                    </Box>
                ),
                accessor: "collected_currency",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {CurrencyName(data.value)}
                        </StyledName>
                        <Typography
                            component="span"
                            sx={{ fontSize: "12px", opacity: 0.8 }}
                        >
                            {CurrencyName(data?.row?.original?.payout_currency)}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Date</Typography>
                    </Box>
                ),
                accessor: "created_ts",
                Cell: (data) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {FormatDate(data.value)}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Rate</Typography>
                    </Box>
                ),
                accessor: "payout_cost_rate",
                maxWidth: 80,
                Cell: (data) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data.value}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right" sx={{}}>
                        <Typography>Amount</Typography>
                    </Box>
                ),
                accessor: "transfer_amount",
                maxWidth: 80,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data.value}
                        </StyledName>
                        <Typography
                            component="span"
                            sx={{ fontSize: "12px", opacity: 0.8 }}
                        >
                            {data?.row?.original?.payout_amount}
                        </Typography>
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
                        <Tooltip title="Transactions Details" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/transactions/details/${row.original.tid}`
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
                        <Release
                            id={row.original.tid}
                            handleRelease={handleRelease}
                            loading={false}
                            tooltext="Release Transaction"
                        />
                    </Box>
                ),
            },
        ],
        []
    );

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

    const handleRelease = (id, data) => {
        dispatch(actions.update_payment_pending(id, data));
    };

    return (
        <MenuContainer>
            <Header title="Pending Payment Transations" />
            <Filter
                handleSearch={handleSearch}
                handleSort={handleSort}
                handleOrder={handleOrder}
            />
            <Table
                columns={columns}
                data={sanctionList?.data || []}
                loading={l_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={sanctionList?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </MenuContainer>
    );
};

export default PendingPayment;
