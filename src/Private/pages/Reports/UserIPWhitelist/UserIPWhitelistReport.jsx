import React, { useEffect, useState, useMemo, useRef } from "react";
import moment from "moment";
import { reset } from "redux-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";

import Filter from "../Shared/Filter";
import actions from "../store/actions";
import NoResults from "../Shared/NoResults";
import Loading from "App/components/Loading";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";

import { FormatDateTime } from "App/helpers";
import UserIPWhitelistFilterForm from "./UserIPWhitelistFilterForm";

const StyledMail = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    width: "90%",
    display: "block",
    fontSize: "14px",
    color: theme.palette.text.main,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

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

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_user_ip_whitelist_reports"));
        dispatch({ type: "BENEFICIARY_REPORT_RESET" });
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
                Cell: (data) => data.value,
            },
            {
                Header: "User",
                accessor: "user_id",
                Cell: (data) => data.value,
            },
            {
                Header: "IP Address",
                accessor: "ip_address",
                Cell: (data) => data.value,
            },
            {
                Header: "Timestamp",
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
            customer_id: data?.customer_id,
            beneficiary_id: data?.beneficiary_id,
            name: data?.name,
            id_number: data?.id_number,
            mobile_number: data?.mobile_number,
            email: data?.email,
            date_of_birth: data?.date_of_birth,
            country: data?.country,
            created_from_date: data?.created_from_date,
            created_to_date: data?.created_to_date,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleReset = () => {
        isMounted.current = false;
        setFilterSchema(initialState);
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_user_ip_whitelist_reports"));
        dispatch({ type: "BENEFICIARY_REPORT_RESET" });
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
        title: "Report on User IP Whitelist",
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: 10000,
        };
        dispatch(actions.download_report(updatedFilterSchema, "report/user_ip_whitelist"));
    };

    return (
        <PageContent
            documentTitle="User IP Whitelist Reports"
            title={
                <>
                    <ContentPasteSearchIcon />
                    <Typography>User IP Whitelist Reports</Typography>
                </>
            }
        >
            <Grid container sx={{ pb: "24px" }} rowSpacing={2}>
                {/* <Grid item xs={12}>
                    <UserIPWhitelistFilterForm
                        enableReinitialize
                        onSubmit={handleSearch}
                        handleReset={handleReset}
                        initialValues={
                            {
                                //
                            }
                        }
                    />
                </Grid> */}
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
                        <Filter
                            fileName="UserIPWhitelistReport"
                            success={pd_success}
                            loading={pd_loading}
                            sortData={sortData}
                            csvReport={csvReport}
                            orderData={orderData}
                            title="User IP Whitelist"
                            state={filterSchema}
                            handleOrder={handleOrder}
                            handleSort={handleSort}
                            downloadData={downloadData}
                        />
                        <Table
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
                        />
                    </Grid>
                )}
            </Grid>
        </PageContent>
    );
}

export default UserIPWhitelistReport;
