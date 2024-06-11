import moment from "moment";
import { reset } from "redux-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useMemo, useRef } from "react";

import Filter from "../Shared/Filter";
import actions from "../store/actions";
import SearchForm from "./SearchForm";
import NoResults from "../Shared/NoResults";
import Loading from "App/components/Loading";
import PageContent from "App/components/Container/PageContent";
import Table, { TablePagination } from "App/components/Table";

import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import PartnerActions from "../../Setup/Partner/store/actions";
import { CountryName, CurrencyName, FormatNumber, FormatDate } from "App/helpers";

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
    opacity: 0.9,
    fontSize: "14px",
    color: theme.palette.text.dark,
    textTransform: "capitalize",
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
    search: "",
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

function TransactionsSuspiciousReports(props) {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);
    const [filterPayPartner, setFilterPayPartner] = useState(statePay);

    const { response: SummaryReports, loading: l_loading } = useSelector(
        (state) => state.get_suspicious_transactions_report,
    );

    const { response: SendPartner, loading: s_loading } = useSelector((state) => state.get_sending_partner);

    const { response: PayPartner, loading: p_loading } = useSelector((state) => state.get_payout_partner);

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_suspicious_reports"));
        dispatch({ type: "SUSPICIOUS_TRANSACTIONS_REPORT_RESET" });
        dispatch({ type: "GET_PAYOUT_PARTNER_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_suspicious_transactions_report(filterSchema));
        } else {
            isMounted.current = true;
        }
    }, [dispatch, filterSchema]);

    useEffect(() => {
        dispatch(PartnerActions.get_sending_partner(stateSend));
    }, [dispatch]);

    useEffect(() => {
        if (filterPayPartner.country) {
            dispatch(PartnerActions.get_payout_partner(filterPayPartner));
        }
    }, [dispatch, filterPayPartner]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "transaction_id",
                maxWidth: 40,
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
                                to={`/transactions/details/${data.row.original.tid}`}
                                style={{ textDecoration: "none" }}
                            >
                                {data.value ? data.value : "N/A"}
                            </Link>
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
                        <StyledName component="p">{data.value ? data.value : "N/A"}</StyledName>
                    </Box>
                ),
            },
            {
                Header: "Send Country",
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
                                ? CurrencyName(data?.row?.original?.payout_currency)
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
                                ? FormatNumber(data?.row?.original?.service_charge)
                                : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Amount",
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
                                ? FormatNumber(data?.row?.original?.payout_amount)
                                : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left">
                        <Typography sx={{ fontSize: "15px" }}>Date</Typography>
                    </Box>
                ),
                accessor: "created_ts",
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
        [],
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
        dispatch(reset("search_form_suspicious_reports"));
        dispatch({ type: "SUSPICIOUS_TRANSACTIONS_REPORT_RESET" });
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
        title: "Report on Suspicious Transactions",
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
        dispatch(actions.download_report(updatedFilterSchema, "report/transaction_suspicious"));
    };

    return (
        <PageContent title="Suspicious Transactions" disableBorder>
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
                        handlePayPartner={handlePayPartner}
                        loading={l_loading}
                    />
                </Grid>
                {l_loading && (
                    <Grid item xs={12}>
                        <Loading loading={l_loading} />
                    </Grid>
                )}
                {!l_loading && SummaryReports?.data && SummaryReports?.data?.length === 0 && (
                    <Grid item xs={12}>
                        <NoResults text="No Transaction Found" />
                    </Grid>
                )}
                {!l_loading && SummaryReports?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <CustomerWrapper>
                            <Filter
                                fileName="SuspiciousReport"
                                success={pd_success}
                                loading={pd_loading}
                                csvReport={csvReport}
                                sortData={sortData}
                                orderData={orderData}
                                title="Suspicious Transactions Report"
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
                                        paginationData={SummaryReports?.pagination}
                                        handleChangePage={handleChangePage}
                                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                )}
                            />
                        </CustomerWrapper>
                    </Grid>
                )}
            </Grid>
        </PageContent>
    );
}

export default withPermission({permission: [permissions.GENERATE_SUSPICIOUS_TRANSACTION_REPORT]})(TransactionsSuspiciousReports);
