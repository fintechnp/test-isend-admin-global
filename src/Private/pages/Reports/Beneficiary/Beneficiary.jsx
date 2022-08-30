import React, { useEffect, useState, useMemo, useRef } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import moment from "moment";
import { reset } from "redux-form";
import { Link } from "react-router-dom";
import { Box, Tooltip, Typography } from "@mui/material";

import Filter from "../Shared/Filter";
import actions from "../store/actions";
import SearchForm from "./SearchForm";
import NoResults from "../Shared/NoResults";
import Loading from "./../../../../App/components/Loading";

import {
    CountryName,
    ReferenceName,
    FormatDate,
} from "./../../../../App/helpers";
import Table, { TablePagination } from "./../../../../App/components/Table";

const CustomerWrapper = styled("div")(({ theme }) => ({
    margin: "12px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "border.main",
    textTransform: "capitalize",
}));

const StyledMail = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    width: "90%",
    display: "block",
    fontSize: "14px",
    color: "border.main",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    customer_id: 0,
    beneficiary_id: 0,
    name: "",
    id_number: "",
    mobile_number: "",
    email: "",
    date_of_birth: "",
    created_from_date: "",
    created_to_date: "",
    country: "",
    search: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

function BeneficiaryReports() {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: BeneficiaryReports, loading: l_loading } = useSelector(
        (state) => state.get_beneficiary_report
    );

    const {
        response: ReportsDownload,
        loading: pd_loading,
        success: pd_success,
    } = useSelector((state) => state.download_report);

    useEffect(() => {
        dispatch({ type: "DOWNLOAD_REPORT_RESET" });
        dispatch(reset("search_form_beneficiary_reports"));
        dispatch({ type: "BENEFICIARY_REPORT_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_beneficiary_report(filterSchema));
        } else {
            isMounted.current = true;
        }
    }, [dispatch, filterSchema]);

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
                            <Link
                                to={`/customer/beneficiary/details/${data?.row?.original?.customer_id}/${data.value}`}
                                style={{ textDecoration: "none" }}
                            >
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
                            {data.value} {data?.row?.original?.middle_name}{" "}
                            {data?.row?.original?.last_name}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {data?.row?.original?.receiver_type_data
                                ? data?.row?.original?.receiver_type_data
                                : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Address",
                accessor: "country",
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
                                paddingLeft: "2px",
                                fontSize: "13px",
                            }}
                        >
                            {data?.row?.original?.postcode}{" "}
                            {data?.row?.original?.unit}{" "}
                            {data?.row?.original?.street}{" "}
                            {data?.row?.original?.address}
                        </StyledName>
                        <StyledName
                            component="span"
                            sx={{ paddingLeft: "2px", opacity: 0.8 }}
                        >
                            {data?.row?.original?.state}
                            {data?.row?.original?.state && ","}{" "}
                            {CountryName(data.value)}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Customer",
                accessor: "customer_id",
                maxWidth: 130,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            <Link
                                to={`/customer/details/${data.value}`}
                                style={{ textDecoration: "none" }}
                            >
                                {data.value ? data.value : "N/A"}
                            </Link>
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Payment Type",
                accessor: "payment_type",
                maxWidth: 120,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            fontSize: "12px",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data.value ? ReferenceName(1, data.value) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Collection",
                accessor: "bank_name",
                minWidth: 180,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            fontSize: "12px",
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
                            {data?.row?.original?.account_number
                                ? data?.row?.original?.account_number
                                : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Contact",
                accessor: "mobile_number",
                maxWidth: 120,
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
                                {data?.row?.original?.email}
                            </StyledMail>
                        </Tooltip>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left">
                        <Typography sx={{ fontSize: "15px" }}>
                            Since/Status
                        </Typography>
                    </Box>
                ),
                accessor: "created_ts",
                maxWidth: 100,
                Cell: (data) => (
                    <Box textAlign="left">
                        <StyledName component="p" value={data.value}>
                            {FormatDate(data?.value)}
                        </StyledName>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            {data?.row?.original?.is_active ? (
                                <Tooltip title="Active" arrow>
                                    <StyledName sx={{ opacity: 0.8 }}>
                                        Active
                                    </StyledName>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Blocked" arrow>
                                    <StyledName sx={{ opacity: 0.8 }}>
                                        Inactive
                                    </StyledName>
                                </Tooltip>
                            )}
                        </Box>
                    </Box>
                ),
            },
        ],
        []
    );

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Name", value: "first_name" },
        { key: "Customer", value: "customer_id" },
        { key: "Payment Type", value: "payment_type" },
        { key: "Country", value: "country" },
    ];

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
        dispatch(reset("search_form_beneficiary_reports"));
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
        { label: "Id", key: "tid" },
        { label: "First Name", key: "first_name" },
        { label: "Middle Name", key: "middle_name" },
        { label: "Last Name", key: "last_name" },
        { label: "Country", key: "country" },
        { label: "Customer", key: "customer_id" },
        { label: "Payment Type", key: "payment_type" },
        { label: "Bank Name", key: "bank_name" },
        { label: "Account Number", key: "account_number" },
        { label: "Contact", key: "mobile_number" },
        { label: "Created Time", key: "created_ts" },
    ];

    const csvReport = {
        title: "Report on Beneficiary",
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
        dispatch(actions.download_report(updatedFilterSchema, "report/beneficiary"));
    };

    return (
        <Grid container sx={{ pb: "24px" }}>
            <Grid item xs={12}>
                <SearchForm
                    enableReinitialize
                    onSubmit={handleSearch}
                    handleReset={handleReset}
                    initialValues={{
                        created_from_date: moment().format("YYYY-MM-DD"),
                        created_to_date: moment().format("YYYY-MM-DD"),
                    }}
                />
            </Grid>
            {l_loading && (
                <Grid item xs={12}>
                    <Loading loading={l_loading} />
                </Grid>
            )}
            {!l_loading &&
                BeneficiaryReports?.data &&
                BeneficiaryReports?.data?.length === 0 && (
                    <Grid item xs={12}>
                        <NoResults text="No Beneficiary Found" />
                    </Grid>
                )}
            {!l_loading && BeneficiaryReports?.data?.length > 0 && (
                <Grid item xs={12}>
                    <CustomerWrapper>
                        <Filter
                            fileName="BeneficiaryReport"
                            success={pd_success}
                            loading={pd_loading}
                            sortData={sortData}
                            csvReport={csvReport}
                            orderData={orderData}
                            title="Beneficiary List"
                            state={filterSchema}
                            handleOrder={handleOrder}
                            handleSort={handleSort}
                            downloadData={downloadData}
                        />
                        <Table
                            columns={columns}
                            data={BeneficiaryReports?.data || []}
                            loading={l_loading}
                            rowsPerPage={8}
                            renderPagination={() => (
                                <TablePagination
                                    paginationData={
                                        BeneficiaryReports?.pagination
                                    }
                                    handleChangePage={handleChangePage}
                                    handleChangeRowsPerPage={
                                        handleChangeRowsPerPage
                                    }
                                />
                            )}
                        />
                    </CustomerWrapper>
                </Grid>
            )}
        </Grid>
    );
}

export default BeneficiaryReports;
