import React, { useEffect, useState, useMemo, useRef } from "react";
import { reset } from "redux-form";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";

import actions from "../store/actions";
import NoResults from "../Shared/NoResults";
import Loading from "App/components/Loading";
import { TablePagination } from "App/components/Table";
import ReportTitle from "App/components/Title/ReportTitle";
import ICNResponseFilterForm from "./ICNResponseFilterForm";
import PageContent from "App/components/Container/PageContent";
import ReportTable from "Private/components/reports/ReportTable";

import apiEndpoints from "Private/config/apiEndpoints";
import { CountryNameByIso2Code, FormatDateTime } from "App/helpers";

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

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "ICN_RESPONSE_REPORT_RESET" });
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
                pdfCellStyle: {
                    minWidth: "10%",
                },
            },
            {
                Header: "Org ID",
                accessor: "orgid",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Country",
                accessor: "country",
                Cell: (data) => <>{CountryNameByIso2Code(data.value)}</>,
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Transaction Type",
                accessor: "txntype",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Txn Ref ID",
                accessor: "txnrefid",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Txn Date",
                accessor: "txndate",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Sender Party Name",
                accessor: "senderpartyname",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Sender Bank ID",
                accessor: "senderpartysenderbankid",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Amount",
                accessor: "txnamt",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Currency",
                accessor: "txnccy",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Receiving Party Name",
                accessor: "receivingpartyname",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Receiving Party Account No.",
                accessor: "receivingpartyaccountno",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Created At",
                accessor: "created_ts",
                maxWidth: 120,
                Cell: (data) => FormatDateTime(data?.value),
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
        ],
        [],
    );

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
        dispatch({ type: "ICN_RESPONSE_REPORT_RESET" });
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
        <PageContent
            documentTitle="ICN (Instant Credit Notification) Reports"
            title={<ReportTitle>ICN (Instant Credit Notification) Reports</ReportTitle>}
        >
            <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
                <Grid item xs={12}>
                    <ICNResponseFilterForm onSubmit={handleSearch} onReset={handleReset} loading={l_loading}/>
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
                        <ReportTable
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
                            apiEndpoint={apiEndpoints.reports.icnResponse}
                            filterQuery={filterSchema}
                            filename="ICN Report"
                        />
                    </Grid>
                )}
            </Grid>
        </PageContent>
    );
}

export default ICNResponseReport;
