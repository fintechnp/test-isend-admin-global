import React, { useEffect, useState, useMemo, useRef } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { reset } from "redux-form";
import moment from "moment";
import { Box, Tooltip, Typography } from "@mui/material";

import Filter from "../Shared/Filter";
import actions from "../store/actions";
import SearchForm from "./SearchForm";
import NoResults from "../Shared/NoResults";
import Loading from "./../../../../App/components/Loading";
import PartnerActions from "../../Setup/Partner/store/actions";
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
    color: "border.main",
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

function CustomerReports() {
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);
    const [filterPartner, setFilterPartner] = useState(stateSend);

    const { response: CustomerReports, loading: l_loading } = useSelector(
        (state) => state.get_customer_report
    );

    const { response: SendingPartner, loading: p_loading } = useSelector(
        (state) => state.get_sending_partner
    );

    useEffect(() => {
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
                            {data?.row?.original?.customer_type_data
                                ? data?.row?.original?.customer_type_data
                                : "N/A"}
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
                            {data?.row?.original?.id_number
                                ? data?.row?.original?.id_number
                                : "N/A"}
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
                            KYC Status
                        </Typography>
                    </Box>
                ),
                accessor: "kyc_status",
                maxWidth: 110,
                Cell: (data) => (
                    <Box textAlign="left">
                        <StyledStatus
                            component="p"
                            value={data.value}
                            sx={{ opacity: 1 }}
                        >
                            {ReferenceName(21, data.value)}
                        </StyledStatus>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "13px",
                                opacity: 0.8,
                            }}
                        >
                            {data?.row?.original?.address
                                ? data?.row?.original?.address
                                : "N/A"}
                        </StyledName>
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
        <Grid container sx={{ pb: "24px" }}>
            <Grid item xs={12}>
                <SearchForm
                    onSubmit={handleSearch}
                    handlePartner={handlePartner}
                    handleReset={handleReset}
                    loading={p_loading}
                    partner={SendingPartner?.data}
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
                CustomerReports?.data &&
                CustomerReports?.data?.length === 0 && (
                    <Grid item xs={12}>
                        <NoResults text="No Customer Found" />
                    </Grid>
                )}
            {!l_loading && CustomerReports?.data?.length > 0 && (
                <Grid item xs={12}>
                    <CustomerWrapper>
                        <Filter
                            sortData={sortData}
                            orderData={orderData}
                            title="Customers List"
                            state={filterSchema}
                            handleOrder={handleOrder}
                            handleSort={handleSort}
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

export default CustomerReports;
