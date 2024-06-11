import React, { useEffect, useState, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MuiIconButton from "@mui/material/IconButton";
import { Box, Tooltip, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import actions from "./../../Transactions/store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import Table, { TablePagination } from "./../../../../App/components/Table";
import { CurrencyName, FormatDate, FormatNumber } from "./../../../../App/helpers";

const CustomerWrapper = styled("div")(({ theme }) => ({
    margin: "12px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
    background: theme.palette.background.dark,
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
    textTransform: "capitalize",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
};

function Transactions(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: TransactionData, loading: l_loading } = useSelector(
        (state) => state.get_transactions_by_customer,
    );

    useEffect(() => {
        if (id) {
            dispatch(actions.get_transactions_by_customer(id, filterSchema));
        }
    }, [dispatch, filterSchema]);

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
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
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
                                fontSize: "13px",
                            }}
                        >
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                                opacity: 0.6,
                            }}
                        >
                            {data?.row?.original?.payout_agent_name}
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
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
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
                            {data.value ? FormatNumber(data.value) : "N/A"}
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
                            {data.value ? FormatNumber(data.value) : "N/A"}
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {data?.row?.original?.payout_amount
                                ? FormatNumber(data?.row?.original?.payout_amount)
                                : "N/A"}
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
                        <Tooltip title="Transaction Details" arrow>
                            <IconButton onClick={() => navigate(`/transactions/details/${row.original.tid}`)}>
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
                    </Box>
                ),
            },
        ],
        [],
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
        [filterSchema],
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
        <>
            <Helmet>
                <title>
                    {import.meta.env.REACT_APP_NAME} | {props.title}
                </title>
            </Helmet>
            <CustomerWrapper>
                <Header />
                <Filter handleSearch={handleSearch} handleSort={handleSort} handleOrder={handleOrder} />
                <Table
                    columns={columns}
                    data={TransactionData?.data || []}
                    loading={l_loading}
                    rowsPerPage={8}
                    renderPagination={() => (
                        <TablePagination
                            paginationData={TransactionData?.pagination}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    )}
                />
            </CustomerWrapper>
        </>
    );
}

export default Transactions;
