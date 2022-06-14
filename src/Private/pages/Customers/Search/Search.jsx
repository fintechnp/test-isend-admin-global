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

import Header from "./components/Header";
import actions from "./store/actions";
import SearchForm from "./components/Form";
import NoResults from "./components/NoResults";
import { Block } from "./../../../../App/components";
import Loading from "./../../../../App/components/Loading";
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

const StyledMail = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "border.main",
}));

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
    order_by: "ASC",
};

function Search() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isMounted = useRef(false);
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: customersData, loading: l_loading } = useSelector(
        (state) => state.get_customers
    );

    useEffect(() => {
        dispatch(reset("search_form_customer"));
        dispatch({ type: "GET_CUSTOMERS_RESET" });
    }, [dispatch]);

    useEffect(() => {
        if (isMounted.current) {
            dispatch(actions.get_customers(filterSchema));
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
                        <StyledName component="p" sx={{ fontSize: "13px" }}>
                            {data.value} {data?.row?.original?.middle_name}{" "}
                            {data?.row?.original?.last_name}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Partner",
                accessor: "agent_name",
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
                                opacity: 0.6,
                            }}
                        >
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                        <StyledName
                            component="p"
                            sx={{ paddingLeft: "4px", fontSize: "13px" }}
                        >
                            {data?.row?.original?.payout_agent}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Type</Typography>
                    </Box>
                ),
                accessor: "customer_type_data",
                Cell: (data) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data.value}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Country</Typography>
                    </Box>
                ),
                accessor: "country_data",
                Cell: (data) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data.value}
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
                                opacity: 0.6,
                            }}
                        >
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                        <StyledMail
                            component="p"
                            sx={{ paddingLeft: "4px", fontSize: "13px" }}
                        >
                            {data?.row?.original?.email}
                        </StyledMail>
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
                Cell: ({ row }) => (
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
                                        `/customer/details/${row.original.tid}`
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
                                        `/customer/update/${row.original.tid}`
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
                            destroyOnUnmount
                            initialValues={{ id: row.original.tid }}
                            // onSubmit={handleBlock}
                            // loading={u_loading}
                            validatation={true}
                            tooltext="Block Customer"
                        />
                    </Box>
                ),
            },
        ],
        []
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
                <SearchForm
                    onSubmit={handleSearch}
                    handleReset={handleReset}
                    initialValues={{ customer_id: "", id_number: "" }}
                />
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
