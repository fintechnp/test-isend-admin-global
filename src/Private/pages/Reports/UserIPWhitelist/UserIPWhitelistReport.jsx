import React, { useEffect, useState, useMemo, useRef } from "react";
import { reset } from "redux-form";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "react-redux";

import NoResults from "../Shared/NoResults";
import Loading from "App/components/Loading";
import { TablePagination } from "App/components/Table";
import ReportTitle from "App/components/Title/ReportTitle";
import PageContent from "App/components/Container/PageContent";
import ReportTable from "Private/components/reports/ReportTable";
import UserIPWhitelistFilterForm from "./UserIPWhitelistFilterForm";

import actions from "../store/actions";
import { FormatDateTime } from "App/helpers";
import apiEndpoints from "Private/config/apiEndpoints";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";

const initialState = {
    page_number: 1,
    page_size: 15,
    sort_by: "created_ts",
    order_by: "DESC",
};

function UserIPWhitelistReport() {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: UserIPWhitelistReport, loading: l_loading } = useSelector(
        (state) => state.get_user_ip_whitelist_report,
    );

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_user_ip_whitelist_reports"));
        dispatch({ type: "USER_IP_WHITELIST_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_user_ip_whitelist_report(filterSchema));
        } else {
            isMounted.current = true;
        }
    }, [dispatch, filterSchema]);

    const columns = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "whitelist_id",
                pdfCellStyle: {
                    minWidth: "15%",
                },
            },
            {
                Header: "Email",
                accessor: "email",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "IP Address",
                accessor: "ip_address",
                pdfCellStyle: {
                    minWidth: "20%",
                },
            },
            {
                Header: "Timestamp",
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
        dispatch(reset("search_form_user_ip_whitelist_reports"));
        dispatch({ type: "USER_IP_WHITELIST_REPORT_RESET" });
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
            documentTitle="User IP Whitelist Reports"
            title={<ReportTitle>User IP Whitelist Reports</ReportTitle>}
        >
            <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
                <Grid item xs={12}>
                    <UserIPWhitelistFilterForm onSubmit={handleSearch} onReset={handleReset} loading={l_loading} />
                </Grid>
                {l_loading && (
                    <Grid item xs={12}>
                        <Loading loading={l_loading} />
                    </Grid>
                )}
                {!l_loading && UserIPWhitelistReport?.data && UserIPWhitelistReport?.data?.length === 0 && (
                    <Grid item xs={12}>
                        <NoResults text="No Record Found" />
                    </Grid>
                )}
                {!l_loading && UserIPWhitelistReport?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <ReportTable
                            columns={columns}
                            data={UserIPWhitelistReport?.data || []}
                            loading={l_loading}
                            rowsPerPage={8}
                            renderPagination={() => (
                                <TablePagination
                                    paginationData={UserIPWhitelistReport?.pagination}
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                                />
                            )}
                            apiEndpoint={apiEndpoints.reports.userIpWhitelist}
                            filterQuery={filterSchema}
                            filename="User IP Whitelist Report"
                        />
                    </Grid>
                )}
            </Grid>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.GENERATE_USER_IP_WHITELIST_REPORT] })(UserIPWhitelistReport);
