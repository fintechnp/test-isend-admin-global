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
import IncompleteRegistrationFilterForm from "./IncompleteRegistrationFilterForm";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";

import { CountryName, FormatDateTime } from "App/helpers";
import apiEndpoints from "Private/config/apiEndpoints";
import ucwords from "App/helpers/ucwords";
import ReportExport from "../../../components/reports/ReportExport";

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

    const { response: incompleteRegistrationResponse, loading: l_loading } = useSelector(
        (state) => state.get_incomplete_registration_report,
    );

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch({ type: "INCOMPLETE_REGISTRATION_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_incomplete_registration_report(filterSchema));
        } else {
            isMounted.current = true;
        }
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Email Confirmed",
                accessor: "email_confirmed",
                Cell: (data) => <>{data.value ? "Yes" : "No"}</>,
            },
            {
                Header: "Phone No.",
                accessor: "phone_number",
            },
            {
                Header: "Phone No. Confirmed",
                accessor: "phone_number_confirmed",
                Cell: (data) => <>{data.value ? "Yes" : "No"}</>,
            },
            {
                Header: "Country",
                accessor: "country",
                Cell: (data) => <>{ucwords(CountryName(data.value))}</>,
            },
            {
                Header: "Created At",
                accessor: "created_ts",
                maxWidth: 120,
                Cell: (data) => <>{FormatDateTime(data?.value)}</>,
            },
        ],
        [],
    );

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Email", value: "email" },
        { key: "Phone Number", value: "phone_number" },
    ];

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
        dispatch({ type: "INCOMPLETE_REGISTRATION_REPORT_RESET" });
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
        { label: "Email", key: "email" },
        { label: "Email Confirmed", key: "email_confirmed" },
        { label: "Ph. No.", key: "phone_number" },
        { label: "Ph. No. Confirmed", key: "phone_number_confirmed" },
        { label: "Country", key: "country" },
        { label: "Created", key: "created_ts" },
    ];

    const csvReport = {
        title: "Report on Incomplete Registration",
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: 10000,
        };
        dispatch(actions.download_report(updatedFilterSchema, apiEndpoints.reports.incompleteRegistration));
    };

    const exportColumns = [
        {
            label: "Country",
            name: "country",
            accessor: ({ value }) => CountryName(value),
            pdf: true,
            csv: true,
            xlsx: true,
        },
        {
            label: "Email",
            name: "email",
            pdf: true,
            csv: true,
            xlsx: true,
        },
        {
            label: "Email Confirmed",
            name: "email_confirmed",
            pdf: false,
            csv: true,
            xlsx: true,
        },
        {
            label: "Email Confirm Count",
            name: "email_confirm_count",
            pdf: false,
            csv: true,
            xlsx: true,
        },
        {
            label: "Phone Country Code",
            name: "phone_country_code",
            pdf: true,
            csv: true,
            xlsx: true,
        },
        {
            label: "Phone Number",
            name: "phone_number",
            pdf: true,
            csv: true,
            xlsx: true,
        },

        {
            label: "Phone Number Confirmed",
            name: "phone_number_confirmed",
            accessor: ({ value }) => value,
            pdf: true,
            csv: true,
            xlsx: true,
        },
        {
            label: "Phone Confirm Count",
            name: "phone_confirm_count",
            pdf: false,
            csv: true,
            xlsx: true,
        },
        {
            label: "Created At",
            name: "created_ts",
            accessor: ({ value }) => value,
            pdf: true,
            csv: true,
            xlsx: true,
        },
    ];

    return (
        <PageContent
            documentTitle="Incomplete Registration Reports"
            title={
                <>
                    <ContentPasteSearchIcon />
                    <Typography>Incomplete Registration Reports</Typography>
                </>
            }
        >
            <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
                <Grid item xs={12}>
                    <IncompleteRegistrationFilterForm onSubmit={handleSearch} onReset={handleReset} />
                </Grid>

                <ReportExport columns={exportColumns} apiEndpoint="" filterQueryString={{}} />

                {l_loading && (
                    <Grid item xs={12}>
                        <Loading loading={l_loading} />
                    </Grid>
                )}
                {!l_loading &&
                    incompleteRegistrationResponse?.data &&
                    incompleteRegistrationResponse?.data?.length === 0 && (
                        <Grid item xs={12}>
                            <NoResults text="No Record Found" />
                        </Grid>
                    )}
                {!l_loading && incompleteRegistrationResponse?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <Filter
                            fileName="IncompleteRegistration"
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
                            data={incompleteRegistrationResponse?.data || []}
                            loading={l_loading}
                            rowsPerPage={8}
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
