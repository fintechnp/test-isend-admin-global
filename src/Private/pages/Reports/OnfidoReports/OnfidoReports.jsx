import PageContent from "App/components/Container/PageContent";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import { Grid, Typography } from "@mui/material";
import { OnfidoReportFilterForm } from "./OnfidoReportsFilter";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../store/actions";
import { Loading } from "App/components";
import NoResults from "../Shared/NoResults";
import Table from "App/components/Table";

export const OnfidoReports = () => {
    const initial = {};
    const [filterSchema, setFilterSchema] = useState(initial);
    const isMounted = useRef(false);
    const dispatch = useDispatch();

    const { response: onfidoReport, loading: l_loading } = useSelector((state) => state.get_onfido_report);

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
        // dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "ONFIDO_REPORT_RESET" });
    };

    const columns = useMemo(
        () => [
            {
                Header: "Name",
                accessor: "name",
            },
            {
                Header: "Result",
                accessor: "result",
            },
            {
                Header: "Status",
                accessor: "status",
            },
            {
                Header: "Sub Result",
                accessor: "sub_result",
                Cell: (data) => <>{data.value || "-"}</>,
            },
            {
                Header: "Summaries",
                accessor: "summaries",
                Cell: (data) => <>{data.value || "-"}</>,
            },
            {
                Header: "Summary",
                accessor: "summary",
                maxWidth: 120,
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
                    <OnfidoReportFilterForm onSubmit={handleSubmit} onReset={handleReset} />
                </Grid>

                {l_loading && (
                    <Grid item xs={12}>
                        <Loading loading={l_loading} />
                    </Grid>
                )}

                {!l_loading && !onfidoReport && (
                    <Grid item xs={12}>
                        <NoResults text="No Record Found" />
                    </Grid>
                )}
                {!l_loading && onfidoReport && (
                    <Grid item xs={12}>
                        <Table columns={columns} data={onfidoReport?.data || []} loading={l_loading} />
                    </Grid>
                )}
            </Grid>
        </PageContent>
    );
};
