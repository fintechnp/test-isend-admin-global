import { useEffect, useMemo, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

import { Loading } from "App/components";
import NoResults from "../Shared/NoResults";
import withPermission from "Private/HOC/withPermission";
import OnfidoReportFilterForm from "./OnfidoReportFilterForm";
import PageContent from "App/components/Container/PageContent";
import ReportTable from "Private/components/reports/ReportTable";

import actions from "../store/actions";
import apiEndpoints from "Private/config/apiEndpoints";
import { permissions } from "Private/data/permissions";

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "ASC",
};

function OnfidoReport() {
    const [filterSchema, setFilterSchema] = useState(initialState);
    const isMounted = useRef(false);
    const dispatch = useDispatch();

    const { response: onfidoReportResponse, loading: l_loading } = useSelector((state) => state.get_onfido_report);

    useEffect(() => {
        dispatch({ type: "ONFIDO_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_onfido_report(filterSchema));
        } else {
            isMounted.current = true;
        }
    }, [dispatch, filterSchema]);

    const handleSubmit = (data) => {
        setFilterSchema((prev) => {
            return { ...prev, ...data };
        });
    };

    const handleReset = () => {
        isMounted.current = false;
        setFilterSchema(initialState);
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "ONFIDO_REPORT_RESET" });
    };

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Result",
                accessor: "result",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Status",
                accessor: "status",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Sub Result",
                accessor: "sub_result",
                Cell: (data) => <>{data.value || "-"}</>,
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Summaries",
                accessor: "summaries",
                Cell: (data) => <>{data.value || "-"}</>,
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Summary",
                accessor: "summary",
                maxWidth: 120,
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
        ],
        [],
    );

    return (
        <PageContent
            documentTitle="Onfido Reports"
            title={
                <>
                    <ContentPasteSearchIcon />
                    <Typography>Onfido Reports</Typography>
                </>
            }
        >
            <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
                <Grid item xs={12}>
                    <OnfidoReportFilterForm onSubmit={handleSubmit} onReset={handleReset} loading={l_loading} />
                </Grid>

                {l_loading && (
                    <Grid item xs={12}>
                        <Loading loading={l_loading} />
                    </Grid>
                )}

                {!l_loading && !onfidoReportResponse && (
                    <Grid item xs={12}>
                        <NoResults text="No Record Found" />
                    </Grid>
                )}
                {!l_loading && onfidoReportResponse?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <ReportTable
                            columns={columns}
                            data={onfidoReportResponse?.data || []}
                            loading={l_loading}
                            apiEndpoint={apiEndpoints.reports.onfidoReports}
                            filterQuery={filterSchema}
                            filename="Onfido Report"
                        />
                    </Grid>
                )}
            </Grid>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.GENERATE_ONFIDO_REPORT] })(OnfidoReport);
