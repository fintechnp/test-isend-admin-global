import React, { useEffect, useState, useMemo, useRef } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { reset } from "redux-form";
import { useNavigate } from "react-router-dom";
import { Box, Tooltip, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import Header from "../Shared/Header";
import actions from "../store/actions";
import SearchForm from "./SearchForm";
import NoResults from "../Shared/NoResults";
import Loading from "./../../../../App/components/Loading";
import PartnerActions from "../../Setup/Partner/store/actions";
import { CountryName, ReferenceName } from "./../../../../App/helpers";
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

const StyledStatus = styled(Typography)(({ theme, value }) => ({
    opacity: 0.8,
    paddingTop: "4px",
    paddingBottom: "4px",
    fontSize: "11px",
    borderRadius: "6px",
    textTransform: "capitalize",
    color: theme.palette.primary.contrastText,
    background: stringToColor(value),
    "&: hover": {
        background: stringToColor(value),
    },
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

function stringToColor(string) {
    switch (string) {
        case "R":
            // code block
            return "#b81220";
        case "P":
            // code block
            return "#bbd14d";
        case "N":
            // code block
            return "#848581";
        case "C":
            // code block
            return "#117308";
        case "c":
            // code block
            return "#117308";
        default:
            // code block
            return "#1a4b87";
    }
}

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
    const navigate = useNavigate();
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
                maxWidth: 140,
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
                Header: "Address",
                accessor: "country",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {CountryName(data.value)}
                        </StyledName>
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
                Header: "Contact",
                accessor: "mobile_number",
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
                    <Box textAlign="center">
                        <Typography>KYC Status</Typography>
                    </Box>
                ),
                accessor: "kyc_status",
                Cell: (data) => (
                    <Box textAlign="center" sx={{ margin: "0px 12px" }}>
                        <StyledStatus component="p" value={data.value}>
                            {ReferenceName(21, data.value)}
                        </StyledStatus>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Acc. Status</Typography>
                    </Box>
                ),
                accessor: "is_active",
                maxWidth: 90,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {data.value ? (
                            <Tooltip title="Active" arrow>
                                <CheckCircleOutlineIcon
                                    sx={{ color: "success.main" }}
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip title="Blocked" arrow>
                                <RemoveCircleOutlineIcon
                                    sx={{ color: "border.main" }}
                                />
                            </Tooltip>
                        )}
                    </Box>
                ),
            },
        ],
        []
    );

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
            transaction_id: data?.transaction_id,
            customer_id: data?.customer_id,
            pin_number: data?.pin_number,
            sending_agent_id: data?.sending_agent_id,
            payout_agent_id: data?.payout_agent_id,
            payment_type: data?.payment_type,
            payout_country: data?.payout_country,
            status: data?.status,
            from_date: data?.from_date,
            to_date: data?.to_date,
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
                        <Header title="Customer List" />
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
