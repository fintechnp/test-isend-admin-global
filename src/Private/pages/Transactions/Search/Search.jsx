import React, { useEffect, useState, useMemo, useRef } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { reset } from "redux-form";
import { useNavigate } from "react-router-dom";
import MuiIconButton from "@mui/material/IconButton";
import { Box, Tooltip, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";

import Header from "../components/Header";
import actions from "../store/actions";
import SearchForm from "../components/SearchForm";
import NoResults from "../components/NoResults";
import Loading from "./../../../../App/components/Loading";
import {
    CurrencyName,
    FormatDate,
    FormatNumber,
} from "./../../../../App/helpers";
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
    fontSize: "14px",
    color: "border.main",
    textTransform: "capitalize",
}));

const StyledMail = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "border.main",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    transaction_id: 0,
    pin_number: "",
    customer_id: 0,
    sending_agent_id: 0,
    payout_agent_id: 0,
    payout_country: "",
    payment_type: "",
    status: "",
    from_date: "",
    to_date: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

function Search() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: transactionsData, loading: l_loading } = useSelector(
        (state) => state.get_transactions
    );

    useEffect(() => {
        dispatch(reset("search_form_transaction"));
        dispatch({ type: "GET_TRANSACTIONS_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_transactions(filterSchema));
        } else {
            isMounted.current = true;
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
                                fontSize: "13px",
                                opacity: 0.6,
                            }}
                        >
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{ paddingLeft: "4px", fontSize: "13px" }}
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
                        <Tooltip title="Edit Transaction" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/transaction/update/${row.original.tid}`
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
                    </Box>
                ),
            },
        ],
        []
    );

    const handleSearch = (data) => {
        const updatedFilterSchema = {
            ...filterSchema,
            transaction_id: data?.transaction_id,
            customer_id: data?.customer_id,
            pin_number: data?.pin_number,
            sending_agent_id: data?.sending_agent_id,
            payout_agent_id: data?.payout_agent_id,
            payment_type: data?.payment_type,
            payout_country: data?.payout_country,
            status: data?.status,
            from_date: data?.from_date,
            to_date: data?.to_date,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleReset = () => {
        isMounted.current = false;
        setFilterSchema(initialState);
        dispatch(reset("search_form_transaction"));
        dispatch({ type: "GET_TRANSACTIONS_RESET" });
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
        <Grid container sx={{ pb: "24px" }}>
            <Grid item xs={12}>
                <SearchForm
                    enableReinitialize
                    initialValues={{
                        from_date: moment().format("YYYY-MM-DD"),
                        to_date: moment().format("YYYY-MM-DD"),
                    }}
                    onSubmit={handleSearch}
                    handleReset={handleReset}
                />
            </Grid>
            {l_loading && (
                <Grid item xs={12}>
                    <Loading loading={l_loading} />
                </Grid>
            )}
            {!l_loading &&
                transactionsData?.data &&
                transactionsData?.data?.length === 0 && (
                    <Grid item xs={12}>
                        <NoResults text="No Customer Found" />
                    </Grid>
                )}
            {!l_loading && transactionsData?.data?.length > 0 && (
                <Grid item xs={12}>
                    <CustomerWrapper>
                        <Header title="Transaction List" />
                        <Table
                            columns={columns}
                            data={transactionsData?.data || []}
                            loading={l_loading}
                            rowsPerPage={8}
                            renderPagination={() => (
                                <TablePagination
                                    paginationData={
                                        transactionsData?.pagination
                                    }
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={
                                        handleChangeRowsPerPage
                                    }
                                />
                            )}
                        />
                    </CustomerWrapper>
                </Grid>
            )}
        </Grid>
    );
}

export default Search;
