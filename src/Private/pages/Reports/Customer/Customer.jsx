import moment from "moment";
import { reset } from "redux-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState, useMemo, useRef } from "react";

import Filter from "../Shared/Filter";
import SearchForm from "./SearchForm";
import NoResults from "../Shared/NoResults";
import Loading from "App/components/Loading";
import withPermission from "Private/HOC/withPermission";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";

import actions from "../store/actions";
import dateUtils from "App/utils/dateUtils";
import { permissions } from "Private/data/permissions";
import PartnerActions from "../../Setup/Partner/store/actions";
import { CountryName, ReferenceName, FormatDateTime } from "App/helpers";

const CustomerWrapper = styled("div")(({ theme }) => ({
    margin: "12px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
    background: theme.palette.background.dark,
}));

const StyledName = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "14px",
    color: theme.palette.text.dark,
    textTransform: "capitalize",
}));

const StyledStatus = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    paddingTop: "4px",
    paddingBottom: "4px",
    fontSize: "11px",
    borderRadius: "6px",
    textTransform: "capitalize",
}));

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
    customer_id: 0,
    agent_id: 0,
    name: "",
    id_number: "",
    mobile_number: "",
    email: "",
    date_of_birth: "",
    created_from_date: "",
    created_to_date: "",
    kyc_status: "",
    kyc_from_date: "",
    kyc_to_date: "",
    country: "",
    nationality: "",
    search: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

const stateSend = {
    page_number: 1,
    page_size: 100,
    agent_type: "SEND",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

function CustomerReports(props) {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);
    const [filterPartner, setFilterPartner] = useState(stateSend);

    const { response: CustomerReports, loading: l_loading } = useSelector((state) => state.get_customer_report);

    const { response: SendingPartner, loading: p_loading } = useSelector((state) => state.get_sending_partner);

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_customer_reports"));
        dispatch({ type: "CUSTOMER_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_customer_report(filterSchema));
        } else {
            isMounted.current = true;
        }
    }, [dispatch, filterSchema]);

    useEffect(() => {
        if (filterPartner.country) {
            dispatch(PartnerActions.get_sending_partner(filterPartner));
        }
    }, [dispatch, filterPartner]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ opacity: 0.8 }}>
                            <Link to={`/customer/details/${data.row.original.tid}`} style={{ textDecoration: "none" }}>
                                {data.value ? data.value : "N/A"}
                            </Link>
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Name",
                accessor: "first_name",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p">
                            {data.value} {data?.row?.original?.middle_name} {data?.row?.original?.last_name}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {data?.row?.original?.customer_type_data ? data?.row?.original?.customer_type_data : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Identity",
                accessor: "id_type",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {data?.row?.original?.id_number ? data?.row?.original?.id_number : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Address",
                accessor: "country",
                minWidth: 170,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "13px",
                            }}
                        >
                            {data?.row?.original?.postcode} {data?.row?.original?.unit} {data?.row?.original?.street}{" "}
                            {data?.row?.original?.address}
                        </StyledName>
                        <StyledName component="span" sx={{ paddingLeft: "2px", opacity: 0.8 }}>
                            {data?.row?.original?.state}
                            {data?.row?.original?.state && ","} {CountryName(data.value)}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Contact",
                accessor: "mobile_number",
                minWidth: 160,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "13px",
                            }}
                        >
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                        <Tooltip title={data?.row?.original?.email} arrow>
                            <StyledMail
                                component="p"
                                sx={{
                                    paddingLeft: "4px",
                                    fontSize: "13px",
                                    opacity: 0.6,
                                }}
                            >
                                {data?.row?.original?.email ? data?.row?.original?.email : "N/A"}
                            </StyledMail>
                        </Tooltip>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left">
                        <Typography sx={{ fontSize: "15px" }}>KYC Status</Typography>
                    </Box>
                ),
                accessor: "kyc_status",
                maxWidth: 110,
                Cell: (data) => (
                    <Box textAlign="left">
                        <StyledStatus component="p" value={data.value} sx={{ opacity: 0.8 }}>
                            {data.value ? ReferenceName(21, data.value) : "N/A"}
                        </StyledStatus>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {data?.row?.original?.address ? data?.row?.original?.address : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left">
                        <Typography sx={{ fontSize: "15px" }}>Since/Status</Typography>
                    </Box>
                ),
                accessor: "created_ts",
                maxWidth: 110,
                Cell: (data) => (
                    <Box textAlign="left">
                        <StyledName component="p" value={data.value}>
                            {FormatDateTime(data?.value)}
                        </StyledName>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                            }}
                        >
                            {data?.row?.original?.is_active ? (
                                <Tooltip title="Active" arrow>
                                    <StyledName sx={{ opacity: 0.8 }}>Active</StyledName>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Blocked" arrow>
                                    <StyledName sx={{ opacity: 0.8 }}>Inactive</StyledName>
                                </Tooltip>
                            )}
                        </Box>
                    </Box>
                ),
            },
        ],
        [],
    );

    //Filter
    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Customer ID", value: "customer_id" },
        { key: "Name", value: "first_name" },
        { key: "Partner", value: "register_agent_id" },
        { key: "Country", value: "country" },
    ];

    const orderData = [
        { key: "Ascending", value: "ASC" },
        { key: "Descending", value: "DESC" },
    ];

    const handlePartner = (e) => {
        const updatedFilterSchema = {
            ...filterPartner,
            country: e.target.value,
        };
        setFilterPartner(updatedFilterSchema);
    };

    const handleSearch = (data) => {
        const updatedFilterSchema = {
            ...filterSchema,
            agent_id: data?.agent_id,
            customer_id: data?.customer_id,
            id_number: data?.id_number,
            name: data?.name,
            mobile_number: data?.mobile_number,
            email: data?.email,
            date_of_birth: data?.date_of_birth,
            created_from_date: data?.created_from_date,
            created_to_date: data?.created_to_date,
            kyc_status: data?.kyc_status,
            kyc_from_date: data?.kyc_from_date,
            kyc_to_date: data?.kyc_to_date,
            country: data?.country,
            nationality: data?.nationality,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleReset = () => {
        isMounted.current = false;
        setFilterSchema(initialState);
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_customer_reports"));
        dispatch({ type: "CUSTOMER_REPORT_RESET" });
        dispatch({ type: "GET_SENDING_PARTNER_RESET" });
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

    //Pagination
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
        { label: "Name", key: "first_name" },
        { label: "Country", key: "country" },
        { label: "Customer Id", key: "customer_id" },
        { label: "Kyc Status", key: "kyc_status" },
        { label: "Mobile Number", key: "mobile_number" },
        { label: "Created By", key: "created_by" },
        { label: "Created", key: "created_ts" },
    ];

    const csvReport = {
        title: "Report on Customers",
        start: filterSchema?.created_from_date,
        end: filterSchema?.created_to_date,
        headers: headers,
        data: ReportsDownload?.data || [],
    };

    const downloadData = () => {
        const updatedFilterSchema = {
            ...filterSchema,
            page_size: 10000,
        };
        dispatch(actions.download_report(updatedFilterSchema, "report/customer"));
    };

    return (
        <PageContent title="Filter Customers" disableBorder>
            <Grid container sx={{ pb: "24px" }}>
                <Grid item xs={12}>
                    <SearchForm
                        onSubmit={handleSearch}
                        handlePartner={handlePartner}
                        handleReset={handleReset}
                        loading={l_loading}
                        partner={SendingPartner?.data}
                        initialValues={{
                            created_from_date: dateUtils.getFromDate(moment().format("YYYY-MM-DD")),
                            created_to_date: dateUtils.getToDate(moment().format("YYYY-MM-DD")),
                        }}
                    />
                </Grid>
                {l_loading && (
                    <Grid item xs={12}>
                        <Loading loading={l_loading} />
                    </Grid>
                )}
                {!l_loading && CustomerReports?.data && CustomerReports?.data?.length === 0 && (
                    <Grid item xs={12}>
                        <NoResults text="No Customer Found" />
                    </Grid>
                )}
                {!l_loading && CustomerReports?.data?.length > 0 && (
                    <Grid item xs={12}>
                        <CustomerWrapper>
                            <Filter
                                fileName="CustomerReport"
                                success={pd_success}
                                loading={pd_loading}
                                csvReport={csvReport}
                                sortData={sortData}
                                orderData={orderData}
                                title="Customers List"
                                state={filterSchema}
                                handleOrder={handleOrder}
                                handleSort={handleSort}
                                downloadData={downloadData}
                            />
                            <Table
                                columns={columns}
                                data={CustomerReports?.data || []}
                                loading={l_loading}
                                rowsPerPage={8}
                                renderPagination={() => (
                                    <TablePagination
                                        paginationData={CustomerReports?.pagination}
                                        handleChangePage={handleChangePage}
                                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                                    />
                                )}
                            />
                        </CustomerWrapper>
                    </Grid>
                )}
            </Grid>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.GENERATE_CUSTOMER_REPORT] })(CustomerReports);
