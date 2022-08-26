import React, { useEffect, useState, useMemo, useRef } from "react";
import moment from "moment";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
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

function YearlyTransactions() {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: YearlyTransactions, loading: l_loading } = useSelector(
        (state) => state.get_yearly_transactions_report
    );

    const { response: SendPartner, loading: s_loading } = useSelector(
        (state) => state.get_sending_partner
    );

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
                Header: () => (
                    <Box textAlign="center">
                        <Typography sx={{ fontSize: "15px" }}>
                            Partner
                        </Typography>
                    </Box>
                ),
                accessor: "agent_name",
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
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right">
                        <Typography sx={{ fontSize: "15px" }}>JAN</Typography>
                    </Box>
                ),
                accessor: "txn_cnt",
                minWidth: 190,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
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
                    <Box textAlign="right">
                        <Typography sx={{ fontSize: "15px" }}>FEB</Typography>
                    </Box>
                ),
                accessor: "txn_month_no",
                minWidth: 190,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
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
                    <Box textAlign="right">
                        <Typography sx={{ fontSize: "15px" }}>MAR</Typography>
                    </Box>
                ),
                accessor: "total_charge",
                minWidth: 190,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-end",
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
                    <Box textAlign="right">
                        <Typography sx={{ fontSize: "15px" }}>Total</Typography>
                    </Box>
                ),
                accessor: "collected_amount",
                maxWidth: 120,
                Cell: (data) => (
                    <Box textAlign="right">
                        <StyledName component="p" value={data.value}>
                            {data.value ? data.value : "N/A"}
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
        { label: "First Name", key: "first_name" },
        { label: "Middle Name", key: "middle_name" },
        { label: "Last Name", key: "last_name" },
        { label: "Country", key: "country" },
        { label: "Customer Id", key: "customer_id" },
        { label: "Date of Birth", key: "date_of_birth" },
        { label: "Kyc Status", key: "kyc_status" },
        { label: "Mobile Number", key: "mobile_number" },
        { label: "Email", key: "email" },
        { label: "Created By", key: "created_by" },
        { label: "Created Time", key: "created_ts" },
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
        dispatch(actions.download_report(updatedFilterSchema, "transaction_yearly"));
    };

    return (
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
                />
            </Grid>
            {l_loading && (
                <Grid item xs={12}>
                    <Loading loading={l_loading} />
                </Grid>
            )}
            {!l_loading &&
                YearlyTransactions?.data &&
                YearlyTransactions?.data?.length === 0 && (
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
                            title={`Yearly Transactions Report [${filterSchema?.transaction_year}]`}
                            state={filterSchema}
                            handleOrder={handleOrder}
                            handleSort={handleSort}
                            downloadData={downloadData}
                        />
                        <Table
                            columns={columns}
                            data={YearlyTransactions?.data || []}
                            loading={l_loading}
                            rowsPerPage={8}
                            renderPagination={() => (
                                <TablePagination
                                    paginationData={
                                        YearlyTransactions?.pagination
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

export default YearlyTransactions;
