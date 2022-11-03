import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";

import actions from "./../store/actions";
import Header from "./../components/Header";
import Filter from "./../components/Filter";
import CreateEmail from "./CreateEmail";
import ViewMail from "./ViewMail";
import { Delete } from "./../../../../App/components";
import Table, { TablePagination } from "./../../../../App/components/Table";
import { FormatDate } from "./../../../../App/helpers";

const EmailContainer = styled("div")(({ theme }) => ({
    margin: "8px 0px",
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
    fontSize: "14px",
    color: theme.palette.border.dark,
}));

const Text = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    width: "100%",
    display: "block",
    fontSize: "14px",
    color: theme.palette.border.dark,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

const Email = (props) => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: EmailData, loading: l_loading } = useSelector(
        (state) => state.get_email
    );
    const { success: c_success } = useSelector((state) => state.create_email);
    const { success: d_success } = useSelector((state) => state.delete_email);

    useEffect(() => {
        dispatch(actions.get_email(filterSchema));
        dispatch({ type: "CREATE_EMAIL_RESET" });
        dispatch({ type: "DELETE_EMAIL_RESET" });
    }, [dispatch, filterSchema, d_success, c_success]);

    const formatStatus = (status) => {
        switch (status) {
            case "I":
                return "CREATED";
            case "C":
                return "SENT";
            case "R":
                return "REJECTED";
            case "P":
                return "PROCESSING";
            case "E":
                return "EXCEPTION";
            default:
                return "N/A";
        }
    };

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
            },
            {
                Header: "Sender",
                accessor: "email_by",
                Cell: (data) => (
                    <Box>
                        <Tooltip
                            title={data.value ? data.value : "empty"}
                            arrow
                        >
                            <Text component="span">
                                {data.value ? data.value : "N/A"}
                            </Text>
                        </Tooltip>
                    </Box>
                ),
            },
            {
                Header: "Receiver",
                accessor: "email_to",
                Cell: (data) => (
                    <Box>
                        <Tooltip
                            title={data.value ? data.value : "empty"}
                            arrow
                        >
                            <Text component="span">
                                {data.value ? data.value : "N/A"}
                            </Text>
                        </Tooltip>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Subject</Typography>
                    </Box>
                ),
                accessor: "email_subject",
                Cell: (data) => (
                    <Box>
                        <Text component="span">
                            {data?.value ? data?.value : "N/A"}
                        </Text>
                    </Box>
                ),
            },
            // {
            //     Header: () => (
            //         <Box textAlign="left" sx={{}}>
            //             <Typography>Body</Typography>
            //         </Box>
            //     ),
            //     accessor: "email_body",
            //     Cell: (data) => (
            //         <Box>
            //             <Text component="span">
            //                 {data?.value ? data?.value : "N/A"}
            //             </Text>
            //         </Box>
            //     ),
            // },
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Status</Typography>
                    </Box>
                ),
                accessor: "status",
                maxWidth: 100,
                Cell: (data) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data.value ? formatStatus(data.value) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Created Date</Typography>
                    </Box>
                ),
                accessor: "created_ts",
                maxWidth: 120,
                Cell: (data) => (
                    <Box textAlign="left" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px" }}>
                            {data.value ? FormatDate(data.value) : "N/A"}
                        </StyledName>
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
                maxWidth: 120,
                Cell: ({ row }) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                        }}
                    >
                        <ViewMail id={row.original.tid} />
                        <Delete
                            id={row.original.tid}
                            handleDelete={handleDelete}
                            loading={false}
                            tooltext="Delete Email"
                        />
                    </Box>
                ),
            },
        ],
        []
    );

    const sortData = [
        { key: "None", value: "" },
        { key: "Sender", value: "email_by" },
        { key: "Receiver", value: "email_to" },
        { key: "Subject", value: "email_subject" },
    ];

    const handleSearch = useCallback(
        (e) => {
            const searchValue = e.target.value;
            const updatedFilterSchema = {
                ...filterSchema,
                search: searchValue,
            };
            setFilterSchema(updatedFilterSchema);
        },
        [filterSchema]
    );

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

    const handleDelete = (id) => {
        dispatch(actions.delete_email(id));
    };

    return (
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
            <EmailContainer>
                <Header title="Email List">
                    <CreateEmail />
                </Header>
                <Filter
                    sortData={sortData}
                    handleSearch={handleSearch}
                    handleSort={handleSort}
                    handleOrder={handleOrder}
                />
                <Table
                    columns={columns}
                    data={EmailData?.data || []}
                    title="Email Details"
                    loading={l_loading}
                    rowsPerPage={8}
                    renderPagination={() => (
                        <TablePagination
                            paginationData={EmailData?.pagination}
                            handleChangePage={handleChangePage}
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                        />
                    )}
                />
            </EmailContainer>
        </>
    );
};

export default Email;
