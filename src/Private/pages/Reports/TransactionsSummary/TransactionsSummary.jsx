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
    send_country: "",
    payout_country: "",
    sending_agent_id: 0,
    payout_agent_id: 0,
    payment_type: "",
    from_date: "",
    to_date: "",
    sort_by: "send_country",
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

function TransactionsSummaryReports(props) {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);
    const [filterSendPartner, setFilterSendPartner] = useState(stateSend);
    const [filterPayPartner, setFilterPayPartner] = useState(statePay);

    const { response: SummaryReports, loading: l_loading } = useSelector(
        (state) => state.get_transactions_summary_report
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
        dispatch(reset("search_form_summary_reports"));
        dispatch({ type: "TRANSACTIONS_SUMMARY_REPORT_RESET" });
        dispatch({ type: "GET_SENDING_PARTNER_RESET" });
        dispatch({ type: "GET_PAYOUT_PARTNER_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_transactions_summary_report(filterSchema));
        } else {
            isMounted.current = true;
        }
    }, [dispatch, filterSchema]);

    useEffect(() => {
        if (filterSendPartner.country) {
            dispatch(PartnerActions.get_sending_partner(filterSendPartner));
        }
    }, [dispatch, filterSendPartner]);

    useEffect(() => {
        if (filterPayPartner.country) {
            dispatch(PartnerActions.get_payout_partner(filterPayPartner));
        }
    }, [dispatch, filterPayPartner]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 40,
            },
            {
                Header: "From",
                accessor: "send_country",
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
                    </Box>
                ),
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
                Header: () => (
                    <Box textAlign="left">
                        <Typography sx={{ fontSize: "13px" }}>To</Typography>
                    </Box>
                ),
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
                Header: () => (
                    <Box textAlign="right">
                        <Typography sx={{ fontSize: "13px" }}>NOS</Typography>
                    </Box>
                ),
                accessor: "txn_cnt",
                maxWidth: 80,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
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
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right">
                        <Typography sx={{ fontSize: "13px" }}>
                            Avg. Rate
                        </Typography>
                    </Box>
                ),
                accessor: "average_customer_rate",
                maxWidth: 100,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
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
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right">
                        <Typography sx={{ fontSize: "13px" }}>
                            T. Charge
                        </Typography>
                    </Box>
                ),
                accessor: "total_charge",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
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
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right">
                        <Typography sx={{ fontSize: "13px" }}>
                            Payout Amount
                        </Typography>
                    </Box>
                ),
                accessor: "payout_amount",
                maxWidth: 120,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
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
                    </Box>
                ),
            },
        ],
        []
    );

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Rate", value: "average_customer_rate" },
        { key: "Partner", value: "agent_name" },
        { key: "Sent Country", value: "send_country" },
        { key: "Payout Country", value: "payout_country" },
        { key: "Payout Amount", value: "payout_amount" },
    ];

    const orderData = [
        { key: "Ascending", value: "ASC" },
        { key: "Descending", value: "DESC" },
    ];

    const handleSearch = (data) => {
        const updatedFilterSchema = {
            ...filterSchema,
            send_country: data?.send_country,
            payout_country: data?.payout_country,
            sending_agent_id: data?.sending_agent_id,
            payout_agent_id: data?.payout_agent_id,
            payment_type: data?.payment_type,
            from_date: data?.from_date,
            to_date: data?.to_date,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleSendPartner = (e) => {
        const updatedFilterSchema = {
            ...filterSendPartner,
            country: e.target.value,
        };
        setFilterSendPartner(updatedFilterSchema);
    };

    const handlePayPartner = (e) => {
        const updatedFilterSchema = {
            ...filterPayPartner,
            country: e.target.value,
        };
        setFilterPayPartner(updatedFilterSchema);
    };

    const handleReset = () => {
        isMounted.current = false;
        setFilterSchema(initialState);
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_summary_reports"));
        dispatch({ type: "TRANSACTIONS_SUMMARY_REPORT_RESET" });
        dispatch({ type: "GET_SENDING_PARTNER_RESET" });
        dispatch({ type: "GET_PAYOUT_PARTNER_RESET" });
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
        { label: "Name", key: "agent_name" },
        { label: "S. Country", key: "send_country" },
        { label: "P. Country", key: "payout_country" },
        { label: "No. Txn", key: "txn_cnt" },
        { label: "T. Charge", key: "total_charge" },
        { label: "Avg. Rate", key: "average_customer_rate" },
        { label: "Payout Amount", key: "payout_amount" },
        { label: "Created Time", key: "created_ts" },
    ];

    const csvReport = {
        title: "Report on Transactions Summary",
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
                "report/transaction_summary"
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
                        onSubmit={handleSearch}
                        s_loading={s_loading}
                        p_loading={p_loading}
                        SendPartner={SendPartner?.data}
                        PayPartner={PayPartner?.data}
                        initialValues={{
                            from_date: moment().format("YYYY-MM-DD"),
                            to_date: moment().format("YYYY-MM-DD"),
                        }}
                        handleReset={handleReset}
                        handleSendPartner={handleSendPartner}
                        handlePayPartner={handlePayPartner}
                    />
                </Grid>
                {l_loading && (
                    <Grid item xs={12}>
                        <Loading loading={l_loading} />
                    </Grid>
                )}
                {!l_loading &&
                    SummaryReports?.data &&
                    SummaryReports?.data?.length === 0 && (
                        <Grid item xs={12}>
                            <NoResults text="No Record Found" />
                        </Grid>
                    )}
                {!l_loading && SummaryReports?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <CustomerWrapper>
                            <Filter
                                fileName="SummaryReport"
                                success={pd_success}
                                loading={pd_loading}
                                csvReport={csvReport}
                                sortData={sortData}
                                orderData={orderData}
                                title="Transactions Summary Report"
                                state={filterSchema}
                                handleOrder={handleOrder}
                                handleSort={handleSort}
                                downloadData={downloadData}
                            />
                            <Table
                                columns={columns}
                                data={SummaryReports?.data || []}
                                loading={l_loading}
                                rowsPerPage={8}
                                renderPagination={() => (
                                    <TablePagination
                                        paginationData={
                                            SummaryReports?.pagination
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

export default TransactionsSummaryReports;
