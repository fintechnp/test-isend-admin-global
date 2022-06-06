import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import actions from "./../store/actions";
import Header from "./../components/Header";
import Filter from "./../components/Filter";
import CreateEmail from "./CreateEmail";
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
}));

const Text = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    width: "100%",
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
    search: "",
    sort_by: "created_ts",
    order_by: "ASC",
};

const Email = () => {
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
            case "R":
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
                        <StyledName component="p" sx={{ fontSize: "14px" }}>
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Receiver",
                accessor: "email_to",
                Cell: (data) => (
                    <Box>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "14px",
                                opacity: 0.6,
                            }}
                        >
                            {data.value ? data.value : "N/A"}
                        </StyledName>
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
            {
                Header: () => (
                    <Box textAlign="left" sx={{}}>
                        <Typography>Body</Typography>
                    </Box>
                ),
                accessor: "email_body",
                Cell: (data) => (
                    <Box>
                        <Text component="span">
                            {data?.value ? data?.value : "N/A"}
                        </Text>
                    </Box>
                ),
            },
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
                        <span {...row.getToggleRowExpandedProps({})}>
                            {row.isExpanded ? (
                                <Tooltip title="Hide Route Details" arrow>
                                    <IconButton>
                                        <VisibilityOffOutlinedIcon
                                            sx={{
                                                fontSize: "20px",
                                                "&:hover": {
                                                    background: "transparent",
                                                },
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Email Details" arrow>
                                    <IconButton>
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
                            )}
                        </span>
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

    const sub_columns = [
        { key: "tid", name: "Id" },
        { key: "email_by", name: "Sender" },
        { key: "email_to", name: "Receiver" },
        { key: "status", name: "Status" },
        { key: "email_subject", name: "Subject" },
        { key: "email_cc", name: "CC" },
        { key: "email_bcc", name: "BCC" },
        { key: "email_body", name: "Body" },
        { key: "created_ts", name: "Created Date" },
    ];

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
                title="SMS Details"
                sub_columns={sub_columns}
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
    );
};

export default Email;
