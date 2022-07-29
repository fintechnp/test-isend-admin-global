import React, { useEffect, useState, useMemo, useRef } from "react";
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
    sort_by: "created_ts",
    order_by: "DESC",
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

    useEffect(() => {
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
                accessor: "average_customer_rate",
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
                            {data?.row?.original?.total_charge
                                ? FormatNumber(
                                      data?.row?.original?.total_charge
                                  )
                                : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Payout Amount",
                accessor: "payout_amount",
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
            sending_agent_id: data?.sending_agent_id,
            transaction_year: data?.transaction_year,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleReset = () => {
        isMounted.current = false;
        setFilterSchema(initialState);
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

    return (
        <Grid container sx={{ pb: "24px" }}>
            <Grid item xs={12}>
                <SearchForm
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
                        <NoResults text="No Transaction Found" />
                    </Grid>
                )}
            {!l_loading && YearlyTransactions?.data?.length > 0 && (
                <Grid item xs={12}>
                    <CustomerWrapper>
                        <Filter
                            sortData={sortData}
                            orderData={orderData}
                            title="Transaction Summary Lists"
                            state={filterSchema}
                            handleOrder={handleOrder}
                            handleSort={handleSort}
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
