import React, { useEffect, useState, useMemo, useRef } from "react";
import moment from "moment";
import { reset } from "redux-form";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import SearchForm from "../components/SearchForm";

import ucfirst from "App/helpers/ucfirst";
import actions from "../store/actions";
import Filter from "../../Reports/Shared/Filter";
import NoResults from "../components/NoResults";
import downloadActions from "../../Reports/store/actions";
import Loading from "App/components/Loading";
import Table, { TablePagination } from "App/components/Table";
import { CurrencyName, FormatDate, FormatNumber, ReferenceName } from "App/helpers";

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

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "border.main",
    textTransform: "capitalize",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    transaction_id: null,
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

function Search(props) {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: transactionsData, loading: l_loading } = useSelector((state) => state.get_transactions);

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
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
                maxWidth: 100,
                Cell: ({ value, row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ opacity: 0.8 }}>
                            <Link to={`/transactions/details/${value}`} style={{ textDecoration: "none" }}>
                                {value ? value : "N/A"}
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
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {data?.row?.original?.beneficiary_name ? data?.row?.original?.beneficiary_name : "n/a"}
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: "C/B Id",
                accessor: "customer_id",
                maxWidth: 100,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ fontSize: "13px" }}>
                            <Link to={`/customer/details/${data.value}`} style={{ textDecoration: "none" }}>
                                {data.value ? data.value : "N/A"}
                            </Link>
                        </StyledName>
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            <Link
                                to={`/customer/beneficiary/details/${data?.value}/${data?.row?.original?.beneficiary_id}`}
                                style={{ textDecoration: "none" }}
                            >
                                {data?.row?.original?.beneficiary_id ? data?.row?.original?.beneficiary_id : "n/a"}
                            </Link>
                        </Typography>
                    </Box>
                ),
            },
            {
                Header: "Partner/Payout Country",
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
                            {data?.row?.original?.payout_country_data
                                ? ucfirst(data?.row?.original?.payout_country_data.toLowerCase())
                                : data?.row?.original?.payout_country ?? "N/A"}
                        </StyledName>
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
                            {data?.row?.original?.collected_amount
                                ? FormatNumber(data?.row?.original?.collected_amount)
                                : "N/A"}
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
                    <Box textAlign="right" sx={{}}>
                        <Typography>S/T Status</Typography>
                    </Box>
                ),
                accessor: "send_status",
                maxWidth: 120,
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
                        <Typography component="span" sx={{ fontSize: "12px", opacity: 0.8 }}>
                            {data?.row?.original?.transaction_status
                                ? ReferenceName(66, data?.row?.original?.transaction_status)
                                : "N/A"}
                        </Typography>
                    </Box>
                ),
            },
        ],
        [],
    );

    //Filter
    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Name", value: "first_name" },
        { key: "Partner", value: "register_agent_id" },
        { key: "Country", value: "country" },
    ];

    const orderData = [
        { key: "Ascending", value: "ASC" },
        { key: "Descending", value: "DESC" },
    ];

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

    //reset search form
    const handleReset = () => {
        isMounted.current = false;
        setFilterSchema(initialState);
        dispatch(reset("search_form_transaction"));
        dispatch({ type: "GET_TRANSACTIONS_RESET" });
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
    };

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

    //Pagination
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

    //Downloads
    const headers = [
        { label: "Customer Name", key: "customer_name" },
        { label: "Txn Id", key: "tid" },
        { label: "S. Currency", key: "collected_currency" },
        { label: "Rate", key: "customer_rate" },
        { label: "Charge", key: "service_charge" },
        { label: "Collected", key: "collected_amount" },
        { label: "Payout", key: "payout_amount" },
        { label: "Status", key: "transaction_status" },
        { label: "Created", key: "created_ts" },
    ];

    const csvReport = {
        title: "Report on Transactions",
        start: filterSchema?.from_date,
        end: filterSchema?.to_date,
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: 10000,
        };
        dispatch(downloadActions.download_report(updatedFilterSchema, "transaction"));
    };

    return (
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
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
                        loading={l_loading}
                    />
                </Grid>
                {l_loading && (
                    <Grid item xs={12}>
                        <Loading loading={l_loading} />
                    </Grid>
                )}
                {!l_loading && transactionsData?.data && transactionsData?.data?.length === 0 && (
                    <Grid item xs={12}>
                        <NoResults text="No Transaction Found" />
                    </Grid>
                )}
                {!l_loading && transactionsData?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <CustomerWrapper>
                            <Filter
                                fileName="TransactionReport"
                                success={pd_success}
                                loading={pd_loading}
                                csvReport={csvReport}
                                sortData={sortData}
                                orderData={orderData}
                                title="Transaction List"
                                state={filterSchema}
                                handleOrder={handleOrder}
                                handleSort={handleSort}
                                downloadData={downloadData}
                            />
                            <Table
                                columns={columns}
                                data={transactionsData?.data || []}
                                loading={l_loading}
                                rowsPerPage={8}
                                renderPagination={() => (
                                    <TablePagination
                                        paginationData={transactionsData?.pagination}
                                        handleChangePage={handleChangePage}
                                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                )}
                            />
                        </CustomerWrapper>
                    </Grid>
                )}
            </Grid>
        </>
    );
}

export default Search;
