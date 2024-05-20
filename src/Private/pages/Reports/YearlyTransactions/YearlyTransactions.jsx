import moment from "moment";
import { reset } from "redux-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useMemo, useRef } from "react";

import Filter from "../Shared/Filter";
import actions from "../store/actions";
import SearchForm from "./SearchForm";
import NoResults from "../Shared/NoResults";
import Loading from "App/components/Loading";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";

import { FormatNumber } from "App/helpers";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";
import PartnerActions from "../../Setup/Partner/store/actions";

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
    sending_agent_id: 0,
    transaction_year: 0,
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

function YearlyTransactions(props) {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [show, setShow] = useState("txn_count");
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: YearlyTransactions, loading: l_loading } = useSelector(
        (state) => state.get_yearly_transactions_report,
    );

    const { response: SendPartner, loading: s_loading } = useSelector((state) => state.get_sending_partner);

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_yearly_reports"));
        dispatch({ type: "YEARLY_TRANSACTIONS_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_yearly_transactions_report(filterSchema));
        } else {
            isMounted.current = true;
        }
    }, [dispatch, filterSchema]);

    useEffect(() => {
        dispatch(PartnerActions.get_sending_partner(stateSend));
    }, [dispatch]);

    const columns = useMemo(
        () => [
            {
                Header: "SN",
                maxWidth: 40,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {data?.row?.index + 1}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left">
                        <Typography
                            sx={{
                                fontSize: "15px",
                            }}
                        >
                            Partner
                        </Typography>
                    </Box>
                ),
                accessor: "agent",
            },
            {
                Header: () => (
                    <Box
                        textAlign="center"
                        sx={{
                            borderLeft: "1px solid #fff",
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: "15px",
                            }}
                        >
                            Months
                        </Typography>
                    </Box>
                ),
                id: "Months",
                columns: [
                    {
                        Header: "Jan",
                        accessor: "jan",
                        width: "60",
                        Cell: ({ row }) => {
                            const fmonth = row.original.month.find((x) => x.txn_month === "JANUARY");
                            if (fmonth) {
                                if (show === "avg_rate") {
                                    return fmonth.avg_rate.toFixed(2);
                                } else if (show === "charge") {
                                    return fmonth.charge.toFixed(2);
                                } else if (show === "txn_amount") {
                                    return FormatNumber(fmonth.txn_amount);
                                } else if (show === "txn_count") {
                                    return fmonth.txn_count;
                                } else {
                                    return "0";
                                }
                            } else {
                                return "0";
                            }
                        },
                    },
                    {
                        Header: "Feb",
                        accessor: "feb",
                        width: "60",
                        Cell: ({ row }) => {
                            const fmonth = row.original.month.find((x) => x.txn_month === "FEBRUARY");
                            if (fmonth) {
                                if (show === "avg_rate") {
                                    return fmonth.avg_rate.toFixed(2);
                                } else if (show === "charge") {
                                    return fmonth.charge.toFixed(2);
                                } else if (show === "txn_amount") {
                                    return FormatNumber(fmonth.txn_amount);
                                } else if (show === "txn_count") {
                                    return fmonth.txn_count;
                                } else {
                                    return "0";
                                }
                            } else {
                                return "0";
                            }
                        },
                    },
                    {
                        Header: "Mar",
                        accessor: "mar",
                        width: "60",
                        Cell: ({ row }) => {
                            const fmonth = row.original.month.find((x) => x.txn_month === "MARCH");
                            if (fmonth) {
                                if (show === "avg_rate") {
                                    return fmonth.avg_rate.toFixed(2);
                                } else if (show === "charge") {
                                    return fmonth.charge.toFixed(2);
                                } else if (show === "txn_amount") {
                                    return FormatNumber(fmonth.txn_amount);
                                } else if (show === "txn_count") {
                                    return fmonth.txn_count;
                                } else {
                                    return "0";
                                }
                            } else {
                                return "0";
                            }
                        },
                    },
                    {
                        Header: "Apr",
                        accessor: "apr",
                        width: "60",
                        Cell: ({ row }) => {
                            const fmonth = row.original.month.find((x) => x.txn_month === "APRIL");
                            if (fmonth) {
                                if (show === "avg_rate") {
                                    return fmonth.avg_rate.toFixed(2);
                                } else if (show === "charge") {
                                    return fmonth.charge.toFixed(2);
                                } else if (show === "txn_amount") {
                                    return FormatNumber(fmonth.txn_amount);
                                } else if (show === "txn_count") {
                                    return fmonth.txn_count;
                                } else {
                                    return "0";
                                }
                            } else {
                                return "0";
                            }
                        },
                    },
                    {
                        Header: "May",
                        accessor: "may",
                        width: "60",
                        Cell: ({ row }) => {
                            const fmonth = row.original.month.find((x) => x.txn_month === "MAY");
                            if (fmonth) {
                                if (show === "avg_rate") {
                                    return fmonth.avg_rate.toFixed(2);
                                } else if (show === "charge") {
                                    return fmonth.charge.toFixed(2);
                                } else if (show === "txn_amount") {
                                    return FormatNumber(fmonth.txn_amount);
                                } else if (show === "txn_count") {
                                    return fmonth.txn_count;
                                } else {
                                    return "0";
                                }
                            } else {
                                return "0";
                            }
                        },
                    },
                    {
                        Header: "Jun",
                        accessor: "jun",
                        width: "60",
                        Cell: ({ row }) => {
                            const fmonth = row.original.month.find((x) => x.txn_month === "JUNE");
                            if (fmonth) {
                                if (show === "avg_rate") {
                                    return fmonth.avg_rate.toFixed(2);
                                } else if (show === "charge") {
                                    return fmonth.charge.toFixed(2);
                                } else if (show === "txn_amount") {
                                    return FormatNumber(fmonth.txn_amount);
                                } else if (show === "txn_count") {
                                    return fmonth.txn_count;
                                } else {
                                    return "0";
                                }
                            } else {
                                return "0";
                            }
                        },
                    },
                    {
                        Header: "Jul",
                        accessor: "jul",
                        width: "60",
                        Cell: ({ row }) => {
                            const fmonth = row.original.month.find((x) => x.txn_month === "JULY");
                            if (fmonth) {
                                if (show === "avg_rate") {
                                    return fmonth.avg_rate.toFixed(2);
                                } else if (show === "charge") {
                                    return fmonth.charge.toFixed(2);
                                } else if (show === "txn_amount") {
                                    return FormatNumber(fmonth.txn_amount);
                                } else if (show === "txn_count") {
                                    return fmonth.txn_count;
                                } else {
                                    return "0";
                                }
                            } else {
                                return "0";
                            }
                        },
                    },
                    {
                        Header: "Aug",
                        accessor: "aug",
                        width: "60",
                        Cell: ({ row }) => {
                            const fmonth = row.original.month.find((x) => x.txn_month === "AUGUST");
                            if (fmonth) {
                                if (show === "avg_rate") {
                                    return fmonth.avg_rate.toFixed(2);
                                } else if (show === "charge") {
                                    return fmonth.charge.toFixed(2);
                                } else if (show === "txn_amount") {
                                    return FormatNumber(fmonth.txn_amount);
                                } else if (show === "txn_count") {
                                    return fmonth.txn_count;
                                } else {
                                    return "0";
                                }
                            } else {
                                return "0";
                            }
                        },
                    },
                    {
                        Header: "Sep",
                        accessor: "sep",
                        width: "60",
                        Cell: ({ row }) => {
                            const fmonth = row.original.month.find((x) => x.txn_month === "SEPTEMBER");
                            if (fmonth) {
                                if (show === "avg_rate") {
                                    return fmonth.avg_rate.toFixed(2);
                                } else if (show === "charge") {
                                    return fmonth.charge.toFixed(2);
                                } else if (show === "txn_amount") {
                                    return FormatNumber(fmonth.txn_amount);
                                } else if (show === "txn_count") {
                                    return fmonth.txn_count;
                                } else {
                                    return "0";
                                }
                            } else {
                                return "0";
                            }
                        },
                    },
                    {
                        Header: "Oct",
                        accessor: "oct",
                        width: "60",
                        Cell: ({ row }) => {
                            const fmonth = row.original.month.find((x) => x.txn_month === "OCTOBER");
                            if (fmonth) {
                                if (show === "avg_rate") {
                                    return fmonth.avg_rate.toFixed(2);
                                } else if (show === "charge") {
                                    return fmonth.charge.toFixed(2);
                                } else if (show === "txn_amount") {
                                    return FormatNumber(fmonth.txn_amount);
                                } else if (show === "txn_count") {
                                    return fmonth.txn_count;
                                } else {
                                    return "0";
                                }
                            } else {
                                return "0";
                            }
                        },
                    },
                    {
                        Header: "Nov",
                        accessor: "nov",
                        width: "60",
                        Cell: ({ row }) => {
                            const fmonth = row.original.month.find((x) => x.txn_month === "NOVEMBER");
                            if (fmonth) {
                                if (show === "avg_rate") {
                                    return fmonth.avg_rate.toFixed(2);
                                } else if (show === "charge") {
                                    return fmonth.charge.toFixed(2);
                                } else if (show === "txn_amount") {
                                    return FormatNumber(fmonth.txn_amount);
                                } else if (show === "txn_count") {
                                    return fmonth.txn_count;
                                } else {
                                    return "0";
                                }
                            } else {
                                return "0";
                            }
                        },
                    },
                    {
                        Header: "Dec",
                        accessor: "dec",
                        width: "60",
                        Cell: ({ row }) => {
                            const fmonth = row.original.month.find((x) => x.txn_month === "DECEMBER");
                            if (fmonth) {
                                if (show === "avg_rate") {
                                    return fmonth.avg_rate.toFixed(2);
                                } else if (show === "charge") {
                                    return fmonth.charge.toFixed(2);
                                } else if (show === "txn_amount") {
                                    return FormatNumber(fmonth.txn_amount);
                                } else if (show === "txn_count") {
                                    return fmonth.txn_count;
                                } else {
                                    return "0";
                                }
                            } else {
                                return "0";
                            }
                        },
                    },
                ],
            },
            {
                Header: () => (
                    <Box
                        textAlign="center"
                        sx={{
                            borderLeft: "1px solid #fff",
                        }}
                    >
                        <Typography sx={{ fontSize: "15px" }}>Info</Typography>
                    </Box>
                ),
                id: "Info",
                columns: [
                    {
                        Header: () => (
                            <Box textAlign="center">
                                <Typography sx={{ fontSize: "15px" }}>Total Txn</Typography>
                            </Box>
                        ),
                        accessor: "total_txn",
                        width: 100,
                        Cell: (data) => (
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <StyledName component="p">{data.value ? data.value : "N/A"}</StyledName>
                            </Box>
                        ),
                    },
                    {
                        Header: () => (
                            <Box textAlign="right">
                                <Typography sx={{ fontSize: "15px" }}>Total Amt</Typography>
                            </Box>
                        ),
                        accessor: "total_amt",
                        width: 100,
                        Cell: (data) => (
                            <Box textAlign="right">
                                <StyledName component="p" value={data.value}>
                                    {data.value ? FormatNumber(data.value) : "N/A"}
                                </StyledName>
                            </Box>
                        ),
                    },
                ],
            },
        ],
        [show],
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

    const showData = [
        { key: "Rate", value: "avg_rate" },
        { key: "Charge", value: "charge" },
        { key: "Amount", value: "txn_amount" },
        { key: "No. Count", value: "txn_count" },
    ];

    const handleSearch = (data) => {
        const d = new Date(data?.transaction_year);
        const updatedFilterSchema = {
            ...filterSchema,
            sending_agent_id: data?.sending_agent_id,
            transaction_year: d.getFullYear(),
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleReset = () => {
        isMounted.current = false;
        setFilterSchema(initialState);
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_yearly_reports"));
        dispatch({ type: "YEARLY_TRANSACTIONS_REPORT_RESET" });
    };

    const handleShow = (e) => {
        setShow(e.target.value);
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
        { label: "Partner", key: "agent" },
        { label: "Months", key: "months" },
        { label: "Rate", key: "avg_rate" },
        { label: "Charge", key: "charge" },
        { label: "No. Txn", key: "txn_count" },
        { label: "Tot. Amt", key: "txn_amount" },
        { label: "Total Txn", key: "total_txn" },
        { label: "Toatal Amount", key: "total_amt" },
    ];

    const csvReport = {
        title: "Report on Yearly Transactions",
        year: filterSchema?.transaction_year,
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: 10000,
        };
        dispatch(actions.download_report(updatedFilterSchema, "report/transaction_yearly"));
    };

    return (
        <PageContent title="Yearly Transactions" disableBorder>
            <Grid container sx={{ pb: "24px" }}>
                <Grid item xs={12}>
                    <SearchForm
                        enableReinitialize
                        initialValues={{
                            transaction_year: moment().format("YYYY-MM-DD"),
                        }}
                        onSubmit={handleSearch}
                        s_loading={s_loading}
                        SendPartner={SendPartner?.data}
                        handleReset={handleReset}
                        loading={l_loading}
                    />
                </Grid>
                {l_loading && (
                    <Grid item xs={12}>
                        <Loading loading={l_loading} />
                    </Grid>
                )}
                {!l_loading && YearlyTransactions?.data && YearlyTransactions?.data?.length === 0 && (
                    <Grid item xs={12}>
                        <NoResults text="No Data Found" />
                    </Grid>
                )}
                {!l_loading && YearlyTransactions?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <CustomerWrapper>
                            <Filter
                                fileName="YearlyReport"
                                success={pd_success}
                                loading={pd_loading}
                                csvReport={csvReport}
                                sortData={sortData}
                                orderData={orderData}
                                showData={showData}
                                state={filterSchema}
                                show={show}
                                handleShow={handleShow}
                                handleOrder={handleOrder}
                                handleSort={handleSort}
                                downloadData={downloadData}
                                title={`Yearly Transactions Report [${filterSchema?.transaction_year}]`}
                            />
                            <Table
                                group={true}
                                columns={columns}
                                data={YearlyTransactions?.data || []}
                                loading={l_loading}
                                rowsPerPage={8}
                                renderPagination={() => (
                                    <TablePagination
                                        paginationData={YearlyTransactions?.pagination}
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

export default withPermission({permission: [permissions.GENERATE_YEARLY_TRANSACTION_REPORT]})(YearlyTransactions);
