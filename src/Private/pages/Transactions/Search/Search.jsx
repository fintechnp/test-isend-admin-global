import moment from "moment";
import { reset } from "redux-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useMemo, useRef } from "react";

import Row from "App/components/Row/Row";
import dateUtils from "App/utils/dateUtils";
import { ReferenceName } from "App/helpers";
import Loading from "App/components/Loading";
import getFlagUrl from "App/helpers/getFlagUrl";
import Column from "App/components/Column/Column";
import { TablePagination } from "App/components/Table";
import BadgeAvatar from "App/components/Avatar/BadgeAvatar";
import PageContent from "App/components/Container/PageContent";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import PageContentContainer from "App/components/Container/PageContentContainer";

import actions from "../store/actions";
import NoResults from "../components/NoResults";
import Filter from "../../Reports/Shared/Filter";
import SearchForm from "../components/SearchForm";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import downloadActions from "../../Reports/store/actions";
import StatusBadge from "Private/pages/PaymentProcess/data/StatusBadge";

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
    full_name: "",
    email: "",
    mobile: "",
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
                header: "S.N.",
                accessorKey: "f_serial_no",
            },

            {
                header: "Transaction ID",
                accessorKey: "tid",
                cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ opacity: 0.8 }}>
                            <Link to={`/transactions/details/${row?.original?.tid}`} style={{ textDecoration: "none" }}>
                                {row?.original?.tid ? row?.original?.tid : "N/A"}
                            </Link>
                        </StyledName>
                    </Box>
                ),
            },

            {
                header: "Sender & Receiver Details",
                cell: ({ row }) => (
                    <Box>
                        <Row
                            gap={2}
                            sx={{
                                marginBottom: "3px",
                            }}
                        >
                            <Typography variant="body1">CN :</Typography>
                            <BadgeAvatar
                                avatarUrl={getFlagUrl(row.original.send_country_iso2)}
                                avatarDimension={20}
                                smallAvatarDimension={0}
                            />
                            <Typography variant="body2">
                                {row.original.customer_name}&nbsp;({row.original.customer_id_number})
                            </Typography>
                        </Row>
                        <Divider
                            sx={{
                                width: "100%",
                            }}
                        />
                        <Row
                            gap={2}
                            sx={{
                                marginTop: "5px",
                            }}
                        >
                            <Typography>BN :</Typography>
                            <BadgeAvatar
                                avatarUrl={getFlagUrl(row.original.payout_country_iso2)}
                                avatarDimension={20}
                                smallAvatarDimension={0}
                            />
                            <Typography>
                                {row.original.beneficiary_name}&nbsp;({row?.original?.customer_id})
                            </Typography>
                        </Row>
                    </Box>
                ),
            },

            {
                header: "Contact Details",
                cell: ({ row }) => (
                    <Column sx={{ wordBreak: "break-all" }}>
                        <Typography variant="body1">{row?.original?.customer_phone}</Typography>
                        <Typography variant="body1">{row?.original?.customer_email}</Typography>
                    </Column>
                ),
            },

            {
                header: "Created Date & Time",
                cell: ({ row }) => (
                    <Column sx={{ wordBreak: "break-all" }}>
                        <Typography variant="body1">
                            {dateUtils.getLocalDateFromUTC(row?.original?.created_ts)}
                        </Typography>
                        <Typography variant="body2">
                            {dateUtils.getLocalTimeFromUTC(row?.original?.created_ts)}
                        </Typography>
                    </Column>
                ),
            },

            {
                header: "FX Rate",
                accessorKey: "payout_cost_rate",
            },

            {
                header: "Transfer Amount",
                cell: ({ row }) => (
                    <Typography variant="body1">
                        {row?.original?.payout_currency}&nbsp;
                        {row?.original?.payout_amount}
                    </Typography>
                ),
            },

            {
                header: "Service Charge",
                cell: ({ row }) => (
                    <Typography variant="body1">
                        {row?.original?.payout_currency}&nbsp;
                        {row?.original?.service_charge}
                    </Typography>
                ),
            },

            {
                header: "Colleted Amount",
                cell: ({ row }) => (
                    <Typography variant="body1">
                        {row?.original?.collected_currency}&nbsp;
                        {row?.original?.collected_amount}
                    </Typography>
                ),
            },

            {
                header: "Deposite Type",
                cell: ({ row }) => <Typography variant="body1">{row?.original?.deposit_type}</Typography>,
            },

            {
                header: "Payment Type",
                cell: ({ row }) => (
                    <Typography variant="body1">{ReferenceName(1, row?.original?.payment_type)}</Typography>
                ),
            },

            {
                header: "Payout Amount",
                cell: ({ row }) => (
                    <Typography variant="body1">
                        {row?.original?.payout_currency}&nbsp;
                        {row?.original?.payout_amount}
                    </Typography>
                ),
            },
            {
                header: "Transaction Status",
                accessorKey: "transaction_status",
                cell: ({ getValue }) => <StatusBadge status={getValue() ?? "N/A"} />,
            },
            {
                header: "Send Status",
                accessorKey: "send_status",
                cell: ({ getValue }) => <StatusBadge status={getValue() ?? "N/A"} />,
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
            full_name: data?.full_name,
            mobile: data?.mobile,
            email: data?.email,
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
        <PageContent documentTitle="Search Transactions" disableBorder>
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

                            <PageContentContainer>
                                <TanstackReactTable
                                    columns={columns}
                                    data={transactionsData?.data || []}
                                    loading={l_loading}
                                    rowsPerPage={8}
                                />
                            </PageContentContainer>
                        </CustomerWrapper>
                        <TablePagination
                            paginationData={transactionsData?.pagination}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    </Grid>
                )}
            </Grid>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.SEARCH_TRANSACTION] })(Search);
