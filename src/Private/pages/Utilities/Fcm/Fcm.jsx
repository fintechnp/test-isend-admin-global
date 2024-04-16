import { styled } from "@mui/material/styles";
import MuiIconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import CreateFcm from "./CreateFcm";
import { Delete } from "App/components";
import actions from "./../store/actions";
import Header from "./../components/Header";
import Filter from "./../components/Filter";
import { useConfirm } from "App/core/mui-confirm";
import { FormatDate, ReferenceName } from "App/helpers";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import ResendIconButton from "App/components/Button/ResendIconButton";

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
    order_by: "DESC",
};

const Fcm = () => {
    const dispatch = useDispatch();
    const confirm = useConfirm();

    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: FcmData, loading: l_loading } = useSelector((state) => state.get_fcm);
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
                        <StyledName component="p" sx={{ fontSize: "14px", opacity: 0.9 }}>
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
                                opacity: 0.8,
                            }}
                        >
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Type",
                accessor: "type",
                maxWidth: 80,
                Cell: (data) => (
                    <Box>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "14px",
                                opacity: 0.8,
                            }}
                        >
                            {data.value ? ReferenceName(89, data.value) : "N/A"}
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
                        <Text component="span">{data?.value ? data?.value : "N/A"}</Text>
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
                        <StyledName component="p" sx={{ paddingLeft: "2px", opacity: 0.8 }}>
                            {data.value ? ReferenceName(88, data.value) : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center" sx={{}}>
                        <Typography>Created Date</Typography>
                    </Box>
                ),
                accessor: "created_ts",
                Cell: (data) => (
                    <Box textAlign="center" sx={{}}>
                        <StyledName component="p" sx={{ paddingLeft: "2px", opacity: 0.8 }}>
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
                        {/* <ResendIconButton
                            onClick={() => {
                                handleOnResend(row?.original?.tid);
                            }}
                        /> */}
                    </Box>
                ),
            },
        ],
        [],
    );

    const sub_columns = [
        { key: "tid", name: "Id", type: "default" },
        { key: "title", name: "Title", type: "default" },
        { key: "type", name: "Type", type: "reference", ref_value: 89 },
        { key: "topic", name: "Receiver", type: "default" },
        { key: "customer_id", name: "Customer Id", type: "default" },
        { key: "status", name: "Status", type: "reference", ref_value: 88 },
        { key: "body", name: "Body", type: "default" },
        {
            key: "display_notification",
            name: "Display Notification",
            type: "boolean",
        },
        { key: "detail_content", name: "Detail Contents", type: "default" },
        { key: "image_url", name: "Image Url", type: "default" },
        { key: "redirect_url", name: "Redirect Url", type: "default" },
        { key: "created_ts", name: "Created Date", type: "date" },
    ];

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Title", value: "title" },
        { key: "Topic", value: "topic" },
        { key: "Body", value: "body" },
    ];

    const handleSearch = useCallback(
        (value) => {
            const updatedFilterSchema = {
                ...filterSchema,
                search: value,
            };
            setFilterSchema(updatedFilterSchema);
        },
        [filterSchema],
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

    const handleOnResend = (id) => {
        confirm({
            description: "Do you want to resend this notification?",
            confirmationText: "Yes",
        }).then(() => {
            dispatch(
                actions.resend_notification({
                    notification_id: id,
                    type: "fcm",
                }),
            );
        });
    };

    return (
        <PageContent documentTitle="FCM">
            <Header title="FCM Message List">
                <CreateFcm />
            </Header>
            <Filter
                sortData={sortData}
                handleSearch={handleSearch}
                handleSort={handleSort}
                handleOrder={handleOrder}
                filterSchema={filterSchema}
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
        </PageContent>
    );
};

export default Fcm;
