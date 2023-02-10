import React, { useEffect, useState, useMemo, useRef } from "react";
import { reset } from "redux-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

import Filter from "../Shared/Filter";
import actions from "../store/actions";
import NoResults from "../Shared/NoResults";
import Loading from "App/components/Loading";
import ICNResponseFilterForm from "./ICNResponseFilterForm";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";

import { FormatDateTime } from "App/helpers";
import apiEndpoints from "Private/config/apiEndpoints";

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
};

function ICNResponseReport() {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: ICNResponseReportResponse, loading: l_loading } = useSelector(
        (state) => state.get_icn_response_report,
    );

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_icn_response_reports"));
        dispatch({ type: "BENEFICIARY_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_icn_response_report(filterSchema));
        } else {
            isMounted.current = true;
        }
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                Header: "ICN ID",
                accessor: "icn_id",
                Cell: (data) => data.value,
            },
            {
                Header: "Org ID",
                accessor: "orgid",
                Cell: (data) => <>{data.value}</>,
            },
            {
                Header: "Country",
                accessor: "country",
                Cell: (data) => <>{data.value}</>,
            },
            {
                Header: "Transaction Type",
                accessor: "txntype",
                Cell: (data) => <>{data.value}</>,
            },
            {
                Header: "Txn Ref ID",
                accessor: "txnrefid",
                Cell: (data) => <>{data.value}</>,
            },
            {
                Header: "Txn Date",
                accessor: "txndate",
                Cell: (data) => <>{data.value}</>,
            },
            {
                Header: "Sender",
                accessor: "senderpartyname",
                Cell: (data) => (
                    <Box display="flex" flexDirection="column">
                        <Typography>{data.value}</Typography>
                        <Typography variant="caption">{data.row.original.senderpartysenderbankid}</Typography>
                    </Box>
                ),
            },

            {
                Header: "Amount",
                accessor: "txnamt",
                Cell: (data) => (
                    <Box>
                        {data.value} {data.row.original.txnccy}
                    </Box>
                ),
            },
            {
                Header: "Receiving Party Name",
                accessor: "receivingpartyname",
                Cell: (data) => (
                    <Box display="flex" flexDirection="column">
                        <Typography>{data.value}</Typography>
                        <Typography variant="caption">{data.row.original.receivingpartyaccountno}</Typography>
                    </Box>
                ),
            },
            {
                Header: "Created At",
                accessor: "created_ts",
                maxWidth: 120,
                Cell: (data) => FormatDateTime(data?.value),
            },
        ],
        [],
    );

    const sortData = [{ key: "None", value: "created_ts" }];

    const orderData = [
        { key: "Ascending", value: "ASC" },
        { key: "Descending", value: "DESC" },
    ];

    const handleSearch = (data) => {
        const updatedFilterSchema = {
            ...filterSchema,
            ...data,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleReset = () => {
        isMounted.current = false;
        setFilterSchema(initialState);
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_icn_response_reports"));
        dispatch({ type: "ICN_RESPONSE_REPORT_RESET" });
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
        { label: "Whitelist ID", key: "whitelist_id" },
        { label: "User", key: "user_id" },
        { label: "IP Address", key: "ip_address" },
        { label: "Created", key: "created_ts" },
    ];

    const csvReport = {
        title: "Report on ICN Response",
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: 10000,
        };
        dispatch(actions.download_report(updatedFilterSchema, apiEndpoints.reports.icnResponse));
    };

    return (
        <PageContent
            documentTitle="ICN (Instant Credit Notification) Reports"
            title={
                <>
                    <ContentPasteSearchIcon />
                    <Typography>ICN (Instant Credit Notification) Reports</Typography>
                </>
            }
        >
            <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
                <Grid item xs={12}>
                    <ICNResponseFilterForm onSubmit={handleSearch} onReset={handleReset} />
                </Grid>
                {l_loading && (
                    <Grid item xs={12}>
                        <Loading loading={l_loading} />
                    </Grid>
                )}
                {!l_loading && ICNResponseReportResponse?.data && ICNResponseReportResponse?.data?.length === 0 && (
                    <Grid item xs={12}>
                        <NoResults text="No Record Found" />
                    </Grid>
                )}
                {!l_loading && ICNResponseReportResponse?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <Filter
                            fileName="ICNResponseReport"
                            success={pd_success}
                            loading={pd_loading}
                            sortData={sortData}
                            csvReport={csvReport}
                            orderData={orderData}
                            title=""
                            state={filterSchema}
                            handleOrder={handleOrder}
                            handleSort={handleSort}
                            downloadData={downloadData}
                        />
                        <Table
                            columns={columns}
                            data={ICNResponseReportResponse?.data || []}
                            loading={l_loading}
                            rowsPerPage={8}
                            renderPagination={() => (
                                <TablePagination
                                    paginationData={ICNResponseReportResponse?.pagination}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            )}
                        />
                    </Grid>
                )}
            </Grid>
        </PageContent>
    );
}

export default ICNResponseReport;
