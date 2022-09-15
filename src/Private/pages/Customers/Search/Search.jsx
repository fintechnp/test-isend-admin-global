import React, { useEffect, useState, useMemo, useRef } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import { reset } from "redux-form";
import { useNavigate } from "react-router-dom";
import MuiIconButton from "@mui/material/IconButton";
import { Box, Tooltip, Typography } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

import Header from "./components/Header";
import actions from "./store/actions";
import SearchForm from "./components/Form";
import NoResults from "./components/NoResults";
import { Block } from "./../../../../App/components";
import Loading from "./../../../../App/components/Loading";
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

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
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
    width: "100%",
    display: "block",
    fontSize: "14px",
    color: "border.main",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

function stringToColor(string) {
    switch (string.toUpperCase()) {
        case "R":
            return "#b81220";
        case "P":
            return "#bbd14d";
        case "N":
            return "#848581";
        case "C":
            return "#117308";
        default:
            return "#1a4b87";
    }
}

const initialState = {
    page_number: 1,
    page_size: 15,
    name: "",
    customer_id: 0,
    id_number: "",
    mobile_number: "",
    email: "",
    date_of_birth: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

function Search() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: customersData, loading: l_loading } = useSelector(
        (state) => state.get_customers
    );
    const { success: b_success, loading: b_loading } = useSelector(
        (state) => state.block_unblock_customer
    );

    useEffect(() => {
        dispatch(reset("block_customer_form"));
        dispatch(reset("search_form_customer"));
        dispatch({ type: "GET_CUSTOMERS_RESET" });
        dispatch({ type: "GET_CUSTOMER_BYID_RESET" });
        dispatch({ type: "CREATE_CUSTOMERS_RESET" });
        dispatch({ type: "UPDATE_CUSTOMERS_RESET" });
        dispatch({ type: "GET_SENDING_PARTNER_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_customers(filterSchema));
            dispatch({ type: "BLOCK_UNBLOCK_CUSTOMER_RESET" });
        } else {
            isMounted.current = true;
        }
    }, [dispatch, filterSchema, b_success]);

    const handleBlock = (data) => {
        dispatch(
            actions.block_unblock_customer(
                data?.id,
                { is_active: !data?.is_active },
                { remarks: data?.remarks }
            )
        );
    };

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
                            {data.value && data.value}{" "}
                            {data?.row?.original?.middle_name &&
                                data?.row?.original?.middle_name}{" "}
                            {data?.row?.original?.last_name &&
                                data?.row?.original?.last_name}
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
                            {data.value ? CountryName(data.value) : ""}
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
                                {data?.row?.original?.email
                                    ? data?.row?.original?.email
                                    : ""}
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
                            {data.value ? ReferenceName(21, data.value) : ""}
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
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Actions</Typography>
                    </Box>
                ),
                accessor: "show",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <Tooltip title="Customer Details" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/customer/details/${data.row.original.tid}`
                                    )
                                }
                            >
                                <RemoveRedEyeOutlinedIcon
                                    sx={{
                                        fontSize: "20px",
                                        "&:hover": {
                                            background: "transparent",
                                        },
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit Customer" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/customer/update/${data.row.original.tid}`
                                    )
                                }
                            >
                                <EditOutlinedIcon
                                    sx={{
                                        fontSize: "20px",
                                        "&:hover": {
                                            background: "transparent",
                                        },
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                        <Block
                            name="Customer"
                            destroyOnUnmount
                            enableReinitialize
                            remark={true}
                            initialValues={{
                                id: data?.row.original.tid,
                                is_active: data.row.original.is_active,
                                remarks: "",
                            }}
                            onSubmit={handleBlock}
                            loading={b_loading}
                            form={`block_form_customer`}
                            status={data?.row?.original?.is_active}
                        />
                    </Box>
                ),
            },
        ],
        [handleBlock]
    );

    const handleSearch = (data) => {
        const updatedFilterSchema = {
            ...filterSchema,
            name: data?.name,
            customer_id: data?.customer_id,
            id_number: data?.id_number,
            mobile_number: data?.mobile_number,
            email: data?.email,
            date_of_birth: data?.date_of_birth,
        };
        setFilterSchema(updatedFilterSchema);
    };

    const handleReset = () => {
        isMounted.current = false;
        setFilterSchema(initialState);
        dispatch(reset("search_form_customer"));
        dispatch({ type: "GET_CUSTOMERS_RESET" });
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
                <SearchForm onSubmit={handleSearch} handleReset={handleReset} />
            </Grid>
            {l_loading && (
                <Grid item xs={12}>
                    <Loading loading={l_loading} />
                </Grid>
            )}
            {!l_loading &&
                customersData?.data &&
                customersData?.data?.length === 0 && (
                    <Grid item xs={12}>
                        <NoResults text="No Customer Found" />
                    </Grid>
                )}
            {!l_loading && customersData?.data?.length > 0 && (
                <Grid item xs={12}>
                    <CustomerWrapper>
                        <Header />
                        <Table
                            columns={columns}
                            data={customersData?.data || []}
                            loading={l_loading}
                            rowsPerPage={8}
                            renderPagination={() => (
                                <TablePagination
                                    paginationData={customersData?.pagination}
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

export default Search;
