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
import CreateFcm from "./CreateFcm";
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

const Fcm = () => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: FcmData, loading: l_loading } = useSelector(
        (state) => state.get_fcm
    );
    const { success: c_success } = useSelector((state) => state.create_fcm);
    const { success: u_success } = useSelector((state) => state.update_fcm);
    const { success: d_success } = useSelector((state) => state.delete_fcm);

    useEffect(() => {
        dispatch(actions.get_fcm(filterSchema));
        dispatch({ type: "CREATE_FCM_RESET" });
        dispatch({ type: "UPDATE_FCM_RESET" });
        dispatch({ type: "DELETE_FCM_RESET" });
    }, [dispatch, filterSchema, d_success, c_success, u_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
            },
            {
                Header: "Title",
                accessor: "title",
                Cell: (data) => (
                    <Box>
                        <StyledName component="p" sx={{ fontSize: "14px" }}>
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Topic",
                accessor: "topic",
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
                        <Typography>Body</Typography>
                    </Box>
                ),
                accessor: "body",
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
                        <Typography>Created Date</Typography>
                    </Box>
                ),
                accessor: "created_ts",
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
                                <Tooltip title="Hide FCM Details" arrow>
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
                                <Tooltip title="FCM Details" arrow>
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
                        <CreateFcm update={true} update_data={row?.original} />
                        <Delete
                            id={row.original.tid}
                            handleDelete={handleDelete}
                            loading={false}
                            tooltext="Delete FCM Message"
                        />
                    </Box>
                ),
            },
        ],
        []
    );

    const sub_columns = [
        { key: "tid", name: "Id" },
        { key: "title", name: "Title" },
        { key: "topic", name: "Receiver" },
        { key: "body", name: "Body" },
        { key: "created_ts", name: "Created Date" },
    ];

    const sortData = [
        { key: "None", value: "" },
        { key: "Title", value: "title" },
        { key: "Topic", value: "topic" },
        { key: "Body", value: "body" },
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
        dispatch(actions.delete_fcm(id));
    };

    return (
        <EmailContainer>
            <Header title="FCM Message List">
                <CreateFcm />
            </Header>
            <Filter
                sortData={sortData}
                handleSearch={handleSearch}
                handleSort={handleSort}
                handleOrder={handleOrder}
            />
            <Table
                columns={columns}
                data={FcmData?.data || []}
                title="Fcm Message Details"
                sub_columns={sub_columns}
                loading={l_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={FcmData?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </EmailContainer>
    );
};

export default Fcm;
