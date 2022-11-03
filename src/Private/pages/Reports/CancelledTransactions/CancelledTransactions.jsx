import React, { useEffect, useState, useMemo, useRef } from "react";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { reset } from "redux-form";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Filter from "../Shared/Filter";
import actions from "../store/actions";
import SearchForm from "./SearchForm";
import NoResults from "../Shared/NoResults";
import Loading from "./../../../../App/components/Loading";

import {
    CountryName,
    CurrencyName,
    FormatNumber,
    FormatDate,
    ReferenceName,
} from "./../../../../App/helpers";
import PartnerActions from "../../Setup/Partner/store/actions";
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
    customer_id: 0,
    transaction_id: 0,
    sending_agent_id: 0,
    payout_agent_id: 0,
    from_date: "",
    to_date: "",
    sort_by: "agent_name",
    order_by: "ASC",
};

const stateSend = {
    page_number: 1,
    page_size: 100,
    agent_type: "SEND",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

const statePay = {
    page_number: 1,
    page_size: 100,
    agent_type: "PAY",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

function CancelledTransactions(props) {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: CancelledTransactions, loading: l_loading } = useSelector(
        (state) => state.get_cancelled_report
    );

    const { response: SendPartner, loading: s_loading } = useSelector(
        (state) => state.get_sending_partner
    );

    const { response: PayPartner, loading: p_loading } = useSelector(
        (state) => state.get_payout_partner
    );

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_cancel_reports"));
        dispatch({ type: "CANCELLED_TRANSACTIONS_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_cancelled_report(filterSchema));
        } else {
            isMounted.current = true;
        }
    }, [dispatch, filterSchema]);

    useEffect(() => {
        dispatch(PartnerActions.get_sending_partner(stateSend));
        dispatch(PartnerActions.get_payout_partner(statePay));
    }, [dispatch]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 40,
            },
            {
                Header: "Partner",
                accessor: "agent_name",
                minWidth: 190,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p">
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Type/Currency",
                accessor: "payment_type",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            fontSize: "12px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data.value ? ReferenceName(1, data?.value) : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {data?.row?.original?.collected_currency
                                ? CurrencyName(
                                      data?.row?.original?.collected_currency
                                  )
                                : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Payout Country",
                accessor: "payout_country",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            fontSize: "12px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data.value ? CountryName(data.value) : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {data?.row?.original?.payout_currency
                                ? CurrencyName(
                                      data?.row?.original?.payout_currency
                                  )
                                : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Rate/Charge",
                accessor: "customer_rate",
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
                            {data.value ? FormatNumber(data.value) : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {data?.row?.original?.service_charge
                                ? FormatNumber(
                                      data?.row?.original?.service_charge
                                  )
                                : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Sent/Payout Amount",
                accessor: "collected_amount",
                maxWidth: 120,
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
                            {data.value ? FormatNumber(data.value) : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {data?.row?.original?.payout_amount
                                ? FormatNumber(
                                      data?.row?.original?.payout_amount
                                  )
                                : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left">
                        <Typography sx={{ fontSize: "15px" }}>
                            Refund Date
                        </Typography>
                    </Box>
                ),
                accessor: "refund_ts",
                maxWidth: 120,
                Cell: (data) => (
                    <Box textAlign="left">
                        <StyledName component="p" value={data.value}>
                            {FormatDate(data?.value)}
                        </StyledName>
                    </Box>
                ),
            },
        ],
        []
    );

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Partner", value: "agent_name" },
        { key: "Rate", value: "average_customer_rate" },
        { key: "Payout Amount", value: "payout_amount" },
        { key: "Sent Country", value: "send_country" },
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
            sending_agent_id: data?.sending_agent_id,
            payout_agent_id: data?.payout_agent_id,
            from_date: data?.from_date,
            to_date: data?.to_date,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleReset = () => {
        isMounted.current = false;
        setFilterSchema(initialState);
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_cancel_reports"));
        dispatch({ type: "CANCELLED_TRANSACTIONS_REPORT_RESET" });
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
        title: "Report on Cancelled Transactions",
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
        dispatch(
            actions.download_report(
                updatedFilterSchema,
                "report/transaction_cancel"
            )
        );
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
                        s_loading={s_loading}
                        p_loading={p_loading}
                        SendPartner={SendPartner?.data}
                        PayPartner={PayPartner?.data}
                        handleReset={handleReset}
                    />
                </Grid>
                {l_loading && (
                    <Grid item xs={12}>
                        <Loading loading={l_loading} />
                    </Grid>
                )}
                {!l_loading &&
                    CancelledTransactions?.data &&
                    CancelledTransactions?.data?.length === 0 && (
                        <Grid item xs={12}>
                            <NoResults text="No Transaction Found" />
                        </Grid>
                    )}
                {!l_loading && CancelledTransactions?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <CustomerWrapper>
                            <Filter
                                fileName="CancelledReport"
                                success={pd_success}
                                loading={pd_loading}
                                csvReport={csvReport}
                                sortData={sortData}
                                orderData={orderData}
                                title="Cancelled Transaction Lists"
                                state={filterSchema}
                                handleOrder={handleOrder}
                                handleSort={handleSort}
                                downloadData={downloadData}
                            />
                            <Table
                                columns={columns}
                                data={CancelledTransactions?.data || []}
                                loading={l_loading}
                                rowsPerPage={8}
                                renderPagination={() => (
                                    <TablePagination
                                        paginationData={
                                            CancelledTransactions?.pagination
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
        </>
    );
}

export default CancelledTransactions;
