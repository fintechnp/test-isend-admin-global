import React, { useEffect, useState, useMemo, useRef } from "react";
import { reset } from "redux-form";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";

import actions from "../store/actions";
import NoResults from "../Shared/NoResults";
import Loading from "App/components/Loading";
import { TablePagination } from "App/components/Table";
import ACHEntriesFilterForm from "./ACHEntriesFilterForm";
import ReportTitle from "App/components/Title/ReportTitle";
import PageContent from "App/components/Container/PageContent";
import ReportTable from "Private/components/reports/ReportTable";

import { FormatDateTime } from "App/helpers";
import apiEndpoints from "Private/config/apiEndpoints";

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "ASC",
};

function ACHEntriesReport() {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: ACHEntriesResponse, loading: l_loading } = useSelector((state) => state.get_ach_entries_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_ach_entries_reports"));
        dispatch({ type: "ACH_ENTRIES_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_ach_entries_report(filterSchema));
        } else {
            isMounted.current = true;
        }
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                Header: "ACH ID",
                accessor: "ach_id",
                pdfCellStyle: {
                    minWidth: "10%",
                },
            },

            {
                Header: "Txn No",
                accessor: "txn_no",
                pdfCellStyle: {
                    minWidth: "15%",
                },
            },
            {
                Header: "Name",
                accessor: "name",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Amount",
                accessor: "amount",
                pdfCellStyle: {
                    minWidth: "15%",
                },
            },
            {
                Header: "Txn Type",
                accessor: "txn_type",
                pdfCellStyle: {
                    minWidth: "10%",
                },
            },
            {
                Header: "Status",
                accessor: "status",
                pdfCellStyle: {
                    minWidth: "10%",
                },
            },
            {
                Header: "Created At",
                accessor: "created_ts",
                maxWidth: 120,
                Cell: (data) => <>{FormatDateTime(data?.value)}</>,
                exportCell: (data) => FormatDateTime(data?.created_ts),
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
        dispatch(reset("search_form_ach_entries_reports"));
        dispatch({ type: "ACH_ENTRIES_REPORT_RESET" });
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
            title={<ReportTitle>ACH (Automated Clearing House) Entries Reports</ReportTitle>}
            documentTitle="ACH (Automated Clearing House) Entries Reports"
        >
            <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
                <Grid item xs={12}>
                    <ACHEntriesFilterForm onSubmit={handleSearch} onReset={handleReset} />
                </Grid>
                {l_loading && (
                    <Grid item xs={12}>
                        <Loading loading={l_loading} />
                    </Grid>
                )}
                {!l_loading && ACHEntriesResponse?.data && ACHEntriesResponse?.data?.length === 0 && (
                    <Grid item xs={12}>
                        <NoResults text="No Record Found" />
                    </Grid>
                )}
                {!l_loading && ACHEntriesResponse?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <ReportTable
                            columns={columns}
                            data={ACHEntriesResponse?.data || []}
                            loading={l_loading}
                            rowsPerPage={8}
                            renderPagination={() => (
                                <TablePagination
                                    paginationData={ACHEntriesResponse?.pagination}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            )}
                            apiEndpoint={apiEndpoints.reports.achEntries}
                            filterQuery={filterSchema}
                            filename="ACH Entries Report"
                        />
                    </Grid>
                )}
            </Grid>
        </PageContent>
    );
}

export default ACHEntriesReport;
