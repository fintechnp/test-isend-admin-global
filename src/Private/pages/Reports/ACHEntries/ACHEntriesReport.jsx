import React, { useEffect, useState, useMemo, useRef } from "react";
import { reset } from "redux-form";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

import Filter from "../Shared/Filter";
import actions from "../store/actions";
import NoResults from "../Shared/NoResults";
import Loading from "App/components/Loading";
import ACHEntriesFilterForm from "./ACHEntriesFilterForm";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";

import { FormatDateTime } from "App/helpers";

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
};

function ACHEntriesReport() {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: ACHEntriesResponse, loading: l_loading } = useSelector((state) => state.get_ach_entries_report);

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

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
                Cell: (data) => <>{data.value}</>,
            },

            {
                Header: "Txn No",
                accessor: "txn_no",
                Cell: (data) => <>{data.value}</>,
            },
            {
                Header: "Name",
                accessor: "name",
                Cell: (data) => <>{data.value}</>,
            },
            {
                Header: "Amount",
                accessor: "amount",
                Cell: (data) => <>{data.value}</>,
            },
            {
                Header: "Txn Type",
                accessor: "txn_type",
                Cell: (data) => <>{data.value}</>,
            },
            {
                Header: "Status",
                accessor: "status",
                Cell: (data) => <>{data.value}</>,
            },
            {
                Header: "Timestamp",
                accessor: "created_ts",
                maxWidth: 120,
                Cell: (data) => <>{FormatDateTime(data?.value)}</>,
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
        dispatch(reset("search_form_ach_entries_reports"));
        dispatch({ type: "ACH_ENTRIES_REPORT_RESET" });
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
        { label: "ACH ID", key: "ach_id" },
        { label: "Txn No", key: "txn_no" },
        { label: "Amount", key: "amount" },
        { label: "Txn Type", key: "txn_type" },
        { label: "Status", key: "status" },
        { label: "Created", key: "created_ts" },
    ];

    const csvReport = {
        title: "Report on User IP Whitelist",
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: 10000,
        };
        dispatch(actions.download_report(updatedFilterSchema, "report/ach_entries"));
    };

    return (
        <PageContent
            documentTitle="ACH (Automated Clearing House) Entries Reports"
            title={
                <>
                    <ContentPasteSearchIcon />
                    <Typography>ACH (Automated Clearing House) Entries Reports</Typography>
                </>
            }
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
                        <Filter
                            fileName="ACH Entries"
                            success={pd_success}
                            loading={pd_loading}
                            sortData={sortData}
                            csvReport={csvReport}
                            orderData={orderData}
                            title="ACH (Automated Clearing House) Entries"
                            state={filterSchema}
                            handleOrder={handleOrder}
                            handleSort={handleSort}
                            downloadData={downloadData}
                        />
                        <Table
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
                        />
                    </Grid>
                )}
            </Grid>
        </PageContent>
    );
}

export default ACHEntriesReport;
