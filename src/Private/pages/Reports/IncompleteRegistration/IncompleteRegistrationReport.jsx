import React, { useEffect, useState, useMemo, useRef } from "react";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";

import NoResults from "../Shared/NoResults";
import Loading from "App/components/Loading";
import { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import ReportTable from "Private/components/reports/ReportTable";
import IncompleteRegistrationFilterForm from "./IncompleteRegistrationFilterForm";

import actions from "../store/actions";
import ucwords from "App/helpers/ucwords";
import apiEndpoints from "Private/config/apiEndpoints";
import { CountryName, FormatDateTime } from "App/helpers";
import ReportTitle from "App/components/Title/ReportTitle";

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
};

function IncompleteRegistrationReport() {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: incompleteRegistrationResponse, loading: isReportLoading } = useSelector(
        (state) => state.get_incomplete_registration_report,
    );

    const columns = useMemo(
        () => [
            {
                Header: "Email",
                accessor: "email",
                hidden: false,
                pdfCellStyle: {
                    minWidth: "25%",
                },
            },
            {
                Header: "Email Confirmed",
                accessor: "email_confirmed",
                Cell: (data) => <>{data.value ? "Yes" : "No"}</>,
                exportCell: (data) => (data.email_confirmed ? "Yes" : "No"),
                hidden: false,
                pdfCellStyle: {
                    minWidth: "15%",
                },
            },
            {
                Header: "Email Confirm Count",
                accessor: "email_confirm_count",
                Cell: (data) => <>{data.value}</>,
                hidden: true,
                pdfCellStyle: {
                    minWidth: "10%",
                },
            },
            {
                Header: "Phone No.",
                accessor: "phone_number",
                hidden: false,
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Phone No. Confirmed",
                accessor: "phone_number_confirmed",
                Cell: (data) => <>{data.value ? "Yes" : "No"}</>,
                exportCell: (data) => (data.phone_number_confirmed ? "Yes" : "No"),
                hidden: false,
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Phone Confirm Count",
                accessor: "phone_confirm_count",
                Cell: (data) => <>{data.value}</>,
                hidden: true,
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Country",
                accessor: "country",
                Cell: (data) => <>{ucwords(CountryName(data.value))}</>,
                exportCell: (data) => ucwords(CountryName(data.country)),
                hidden: false,
                pdfCellStyle: {
                    minWidth: "15%",
                },
            },
            {
                Header: "Created At",
                accessor: "created_ts",
                maxWidth: 120,
                Cell: (data) => <>{FormatDateTime(data?.value)}</>,
                exportCell: (data) => FormatDateTime(data?.created_ts),
                hidden: true,
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
        ],
        [],
    );

    const defaultHiddenColumns = columns
        .map((col) => {
            return col.hidden ? col.accessor : undefined;
        })
        .filter((v) => v !== undefined);

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
        dispatch({ type: "INCOMPLETE_REGISTRATION_REPORT_RESET" });
    };

    const handleChangePage = (e, newPage) => {
        setFilterSchema({
            ...filterSchema,
            page_number: ++newPage,
        });
    };

    const handleChangeRowsPerPage = (e) => {
        const pageSize = e.target.value;
        setFilterSchema({
            ...filterSchema,
            page_number: 1,
            page_size: +pageSize,
        });
    };

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "INCOMPLETE_REGISTRATION_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) dispatch(actions.get_incomplete_registration_report(filterSchema));
        else isMounted.current = true;
    }, [dispatch, filterSchema]);

    return (
        <PageContent
            documentTitle="Incomplete Registration Reports"
            title={<ReportTitle>Incomplete Registration Reports</ReportTitle>}
        >
            <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
                <Grid item xs={12}>
                    <IncompleteRegistrationFilterForm onSubmit={handleSearch} onReset={handleReset} loading={isReportLoading} />
                </Grid>

                {isReportLoading && (
                    <Grid item xs={12}>
                        <Loading loading={isReportLoading} />
                    </Grid>
                )}

                {!isReportLoading &&
                    incompleteRegistrationResponse?.data &&
                    incompleteRegistrationResponse?.data?.length === 0 && (
                        <Grid item xs={12}>
                            <NoResults text="No Record Found" />
                        </Grid>
                    )}

                {!isReportLoading && incompleteRegistrationResponse?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <ReportTable
                            defaultHiddenColumns={defaultHiddenColumns}
                            columns={columns}
                            data={incompleteRegistrationResponse?.data || []}
                            loading={isReportLoading}
                            rowsPerPage={8}
                            filename="Incomplete Registration Report"
                            apiEndpoint={apiEndpoints.reports.incompleteRegistration}
                            filterQuery={filterSchema}
                            renderPagination={() => (
                                <TablePagination
                                    paginationData={incompleteRegistrationResponse?.pagination}
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

export default IncompleteRegistrationReport;
