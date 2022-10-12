import React, { useState, useEffect, useMemo, useCallback } from "react";
import { styled } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { Box, Tooltip, Typography } from "@mui/material";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import actions from "./store/actions";
import Header from "./components/Header";
import Filter from "./components/Filter";
import AddApiConfig from "./components/AddApiConfig";
import Table, { TablePagination } from "./../../../../App/components/Table";

const ConfigContainer = styled("div")(({ theme }) => ({
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

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "14px",
    color: theme.palette.secondary.contrastText,
    textTransform: "capitalize",
}));

const UserIdText = styled(Typography)(({ theme }) => ({
    opacity: 0.8,
    fontSize: "14px",
    color: theme.palette.secondary.contrastText,
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

const ApiConfiguration = () => {
    const dispatch = useDispatch();
    const [filterSchema, setFilterSchema] = useState(initialState);

    const { response: ApiConfigData, loading: g_loading } = useSelector(
        (state) => state.get_api_config
    );
    const { success: a_success } = useSelector((state) => state.add_api_config);
    const { success: u_success } = useSelector(
        (state) => state.update_api_config
    );

    useEffect(() => {
        dispatch(actions.get_api_config(filterSchema));
    }, [dispatch, filterSchema, a_success, u_success]);

    const columns = useMemo(
        () => [
            {
                Header: "Id",
                accessor: "config_id",
                maxWidth: 40,
            },
            {
                Header: "Partner Code",
                accessor: "api_partner_code",
                minWidth: 160,
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {data.value ? data.value : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Api Url</Typography>
                    </Box>
                ),
                minWidth: 160,
                accessor: "api_url",
                Cell: (data) => (
                    <Box>
                        <Tooltip title={data.value ? data.value : ""} arrow>
                            <UserIdText component="p">
                                {data.value ? data.value : "N/A"}
                            </UserIdText>
                        </Tooltip>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>User Id</Typography>
                    </Box>
                ),
                accessor: "api_user_id",
                width: 130,
                Cell: (data) => (
                    <Box>
                        <Tooltip title={data.value ? data.value : ""} arrow>
                            <UserIdText component="p">
                                {data.value ? data.value : "N/A"}
                            </UserIdText>
                        </Tooltip>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="left">
                        <Typography>User Secret</Typography>
                    </Box>
                ),
                accessor: "api_user_secret",
                width: 120,
                Cell: (data) => (
                    <Box>
                        <Tooltip title={data.value ? data.value : ""} arrow>
                            <StyledText
                                component="p"
                                sx={{ textAlign: "left" }}
                            >
                                {data.value ? data.value : "n/a"}
                            </StyledText>
                        </Tooltip>
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
                                <Tooltip title="Api Config Details" arrow>
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
                                <Tooltip title="Api Config Details" arrow>
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
                        <AddApiConfig
                            update={true}
                            update_data={row?.original}
                        />
                    </Box>
                ),
            },
        ],
        []
    );

    const sortData = [
        { key: "None", value: "" },
        { key: "Latest", value: "created_ts" },
        { key: "Partner Code", value: "api_partner_code" },
        { key: "User Id", value: "api_user_id" },
        { key: "Api Url", value: "api_url" },
    ];
    const orderData = [
        { key: "Ascending", value: "ASC" },
        { key: "Descending", value: "DESC" },
    ];

    const sub_columns = [
        { key: "tid", name: "Id" },
        { key: "api_partner_code", name: "Api Partner Code" },
        { key: "api_url", name: "Api Url" },
        { key: "api_user_id", name: "Api User Id" },
        { key: "api_user_secret", name: "Api User Secret" },
        { key: "ref1", name: "Ref 1" },
        { key: "ref2", name: "Ref 2" },
        { key: "ref3", name: "Ref 3" },
        { key: "remarks", name: "Remarks" },
        { key: "created_ts", name: "Created At" },
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
        const sort = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            sort_by: sort,
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
        <ConfigContainer>
            <Header title="API Configuration">
                <AddApiConfig />
            </Header>
            <Filter
                state={filterSchema}
                sortData={sortData}
                orderData={orderData}
                handleSearch={handleSearch}
                handleSort={handleSort}
                handleOrder={handleOrder}
            />
            <Table
                columns={columns}
                title="Api Config Details"
                data={ApiConfigData?.data || []}
                sub_columns={sub_columns}
                loading={g_loading}
                rowsPerPage={8}
                totalPage={ApiConfigData?.pagination?.totalPage || 1}
                renderPagination={() => (
                    <TablePagination
                        paginationData={ApiConfigData?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </ConfigContainer>
    );
};

export default ApiConfiguration;
