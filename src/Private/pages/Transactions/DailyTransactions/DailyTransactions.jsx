import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

import actions from "./../store/actions";
import Header from "./../components/Header";
import Filter from "./../components/Filter";
import Table, { TablePagination } from "./../../../../App/components/Table";
import {
    CurrencyName,
    FormatDate,
    FormatNumber,
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

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    from_date: new Date().toISOString().slice(0, 10),
    to_date: new Date().toISOString().slice(0, 10),
    sort_by: "created_ts",
    order_by: "DESC",
};

const DailyTransactions = () => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: dailyTransactions, loading: l_loading } = useSelector(
        (state) => state.get_transactions
    );

    useEffect(() => {
        dispatch(actions.get_transactions(filterSchema));
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ opacity: 0.8 }}>
                            <Link
                                to={`/transactions/details/${data?.value}`}
                                style={{ textDecoration: "none" }}
                            >
                                {data.value ? data.value : "N/A"}
                            </Link>
                        </StyledName>
                    </Box>
                ),
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
                            {data.value ? data.value : "n/a"}
                        </StyledName>
                        <Typography
                            component="span"
                            sx={{ fontSize: "12px", opacity: 0.8 }}
                        >
                            {data?.row?.original?.beneficiary_name
                                ? data?.row?.original?.beneficiary_name
                                : "n/a"}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: "C/B Id",
                accessor: "customer_id",
                maxWidth: 120,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "13px" }}>
                            <Link
                                to={`/customer/details/${data.value}`}
                                style={{ textDecoration: "none" }}
                            >
                                {data.value ? data.value : "N/A"}
                            </Link>
                        </StyledName>
                        <Typography
                            component="span"
                            sx={{ fontSize: "12px", opacity: 0.8 }}
                        >
                            <Link
                                to={`/customer/beneficiary/details/${data?.value}/${data?.row?.original?.beneficiary_id}`}
                                style={{ textDecoration: "none" }}
                            >
                                {data?.row?.original?.beneficiary_id
                                    ? data?.row?.original?.beneficiary_id
                                    : "n/a"}
                            </Link>
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
                        <Typography
                            component="span"
                            sx={{ fontSize: "12px", opacity: 0.8 }}
                        >
                            {data?.row?.original?.payout_amount
                                ? FormatNumber(
                                      data?.row?.original?.payout_amount
                                  )
                                : "N/A"}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right" sx={{}}>
                        <Typography>S/T Status</Typography>
                    </Box>
                ),
                accessor: "send_status",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
                            textAlign: "right",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "12px",
                                lineHeight: 1.2,
                            }}
                        >
                            {data.value ? ReferenceName(66, data.value) : "N/A"}
                        </StyledName>
                        <Typography
                            component="span"
                            sx={{ fontSize: "12px", opacity: 0.8 }}
                        >
                            {data?.row?.original?.transaction_status
                                ? ReferenceName(
                                      66,
                                      data?.row?.original?.transaction_status
                                  )
                                : "N/A"}
                        </Typography>
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

    const handleFilter = (data) => {
        const updatedFilterSchema = {
            ...filterSchema,
            transaction_id: data?.transaction_id,
            pin_number: data?.pin_number,
            customer_id: data?.customer_id,
            sending_agent_id: data?.sending_agent_id,
            payout_agent_id: data?.payout_agent_id,
            payout_country: data?.payment_country,
            payment_type: data?.payment_type,
            from_date: data?.from_date,
            to_date: data?.to_date,
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
        <MenuContainer>
            <Header title="Daily Transacations" />
            <Filter
                handleSearch={handleSearch}
                handleSort={handleSort}
                handleOrder={handleOrder}
                handleFilter={handleFilter}
            />
            <Table
                columns={columns}
                data={dailyTransactions?.data || []}
                loading={l_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={dailyTransactions?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </MenuContainer>
    );
};

export default DailyTransactions;
