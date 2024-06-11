import { styled } from "@mui/material/styles";
import MuiIconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import CreateSms from "./CreateSms";
import { Delete } from "App/components";
import actions from "./../store/actions";
import Header from "./../components/Header";
import Filter from "./../components/Filter";
import { useConfirm } from "App/core/mui-confirm";
import Table, { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import { CountryName, FormatDate, ReferenceName } from "App/helpers";
import ResendIconButton from "App/components/Button/ResendIconButton";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";
import HasPermission from "Private/components/shared/HasPermission";

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

const initialState = {
    page_number: 1,
    page_size: 15,
    search: "",
    sort_by: "created_ts",
    order_by: "DESC",
};

const Sms = (props) => {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: SmsData, loading: l_loading } = useSelector((state) => state.get_sms);
    const { success: c_success } = useSelector((state) => state.create_sms);
    const { success: d_success } = useSelector((state) => state.delete_sms);

    useEffect(() => {
        dispatch(actions.get_sms(filterSchema));
        dispatch({ type: "CREATE_SMS_RESET" });
        dispatch({ type: "DELETE_SMS_RESET" });
    }, [dispatch, filterSchema, d_success, c_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "tid",
                maxWidth: 50,
            },
            {
                Header: "Sender",
                accessor: "sms_by",
                Cell: (data) => (
                    <Box>
                        <StyledName component="p" sx={{ fontSize: "14px", opacity: 0.9 }}>
                            {data.value ? data.value : "N/A"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: "Receiver",
                accessor: "sms_to",
                Cell: (data) => (
                    <Box>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "4px",
                                fontSize: "14px",
                                opacity: 0.9,
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
                        <Typography>Country</Typography>
                    </Box>
                ),
                accessor: "sms_country",
                maxWidth: 120,
                Cell: (data) => (
                    <Box>
                        <StyledName
                            component="p"
                            sx={{
                                paddingLeft: "2px",
                                fontSize: "14px",
                                opacity: 0.8,
                            }}
                        >
                            {data.value ? CountryName(data.value) : "N/A"}
                        </StyledName>
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
                maxWidth: 120,
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
                                <Tooltip title="Hide SMS Details" arrow>
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
                                <Tooltip title="Show SMS Details" arrow>
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
                        <HasPermission permission={permissions.DELETE_SMS}>
                            <Delete
                                id={row.original.tid}
                                handleDelete={handleDelete}
                                loading={false}
                                tooltext="Delete SMS"
                            />
                        </HasPermission>
                        <HasPermission permission={permissions.RESEND_SMS}>
                            <ResendIconButton
                                onClick={() => {
                                    handleOnResend(row?.original?.tid);
                                }}
                            />
                        </HasPermission>
                    </Box>
                ),
            },
        ],
        [],
    );

    const sub_columns = [
        { key: "tid", name: "Id", type: "default" },
        { key: "sms_by", name: "Sender", type: "default" },
        { key: "sms_to", name: "Receiver", type: "default" },
        { key: "sms_country", name: "Country", type: "country" },
        { key: "status", name: "Status", type: "reference", ref_value: 88 },
        { key: "sms_text", name: "Text", type: "default" },
        { key: "created_ts", name: "Created Date", type: "date" },
    ];

    const sortData = [
        { key: "None", value: "created_ts" },
        { key: "Sender", value: "sms_by" },
        { key: "Receiver", value: "sms_to" },
        { key: "Country", value: "sms_country" },
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
        dispatch(actions.delete_sms(id));
    };

    const handleOnResend = (id) => {
        confirm({
            description: "Do you want to resend this notification?",
            confirmationText: "Yes",
        }).then(() => {
            dispatch(
                actions.resend_notification({
                    notification_id: id,
                    type: "sms",
                }),
            );
        });
    };

    return (
        <PageContent documentTitle="SMS">
            <Header title="SMS List">
                <HasPermission permission={permissions.CREATE_SMS}>
                    <CreateSms />
                </HasPermission>
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
                data={SmsData?.data || []}
                title="SMS Details"
                sub_columns={sub_columns}
                loading={l_loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={SmsData?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_SMS] })(Sms);
