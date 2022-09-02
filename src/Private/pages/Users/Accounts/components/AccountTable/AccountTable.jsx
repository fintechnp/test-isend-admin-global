import { styled } from "@mui/material/styles";
import React, { useMemo, useEffect, useState, useCallback } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Tooltip from "@mui/material/Tooltip";
import MuiIconButton from "@mui/material/IconButton";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";

import Table, {
    TablePagination,
    TableSwitch,
} from "./../../../../../../App/components/Table";
import actions from "./../../store/actions";
import AddAccount from "./../AddAccount";
import Header from "./../Header";
import Filter from "./../Filter";

const TransactionsContainer = styled("div")(({ theme }) => ({
    margin: "8px 0px",
    borderRadius: "6px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.border.light}`,
}));

const SwitchWrapper = styled(Box)(({ theme }) => ({
    "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked": {
        opacity: 0.8,
        color: theme.palette.primary.main,
    },
}));

const IconButton = styled(MuiIconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const StyledName = styled(Typography)(({ theme }) => ({
    fontSize: "15px",
    color: theme.palette.secondary.contrastText,
}));

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    fontSize: "15px",
    color: theme.palette.secondary.contrastText,
}));

const initialState = {
    page_number: 1,
    page_size: 15,
    user_type: "",
    search: "",
    sort_by: "name",
    order_by: "DESC",
};

function AccountTable() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filterSchema, setFilterSchema] = useState(initialState);
    const { response: user_list, loading: loading } = useSelector(
        (state) => state.get_all_user
    );
    const { success: a_success } = useSelector((state) => state.add_user);
    const { success: u_success } = useSelector((state) => state.update_user);
    const { success: d_success } = useSelector((state) => state.delete_user);

    useEffect(() => {
        dispatch(actions.get_all_user(filterSchema));
    }, [filterSchema]);

    useEffect(() => {
        if (u_success || d_success || a_success) {
            setFilterSchema({ ...initialState });
            dispatch(
                actions.get_user_number({
                    include_count: true,
                    page_number: 1,
                    page_size: 20,
                })
            );
        }
        dispatch({ type: "ADD_ACCOUNT_USER_RESET" });
        dispatch({ type: "UPDATE_ACCOUNT_USER_RESET" });
        dispatch({ type: "DELETE_ACCOUNT_USER_RESET" });
        dispatch({ type: "UPDATE_ACCOUNT_STATUS_RESET" });
    }, [d_success, u_success, a_success]);

    const columns = useMemo(
        () => [
            {
                Header: "SN",
                maxWidth: 50,
                Cell: ({ row }) => <Typography>{row.index + 1}</Typography>,
            },
            {
                Header: "Name",
                accessor: "name",
                Cell: (data) => (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ fontSize: "15px" }}>
                            {/* {data?.value.charAt(1)} */}
                            {/* {data?.value.split(" ")[1][0]} */}
                        </Avatar>
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {data.value}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>Role</Typography>
                    </Box>
                ),
                accessor: "user_type",
                Cell: (data) => (
                    <Box textAlign="center">
                        <StyledText component="p">{data.value}</StyledText>
                    </Box>
                ),
            },
            {
                Header: "Phone Number",
                accessor: "phone_number",
                Cell: (data) => (
                    <>
                        <StyledText component="p">{data.value}</StyledText>
                    </>
                ),
            },
            {
                Header: "Email",
                accessor: "email",
                maxWidth: 250,
                Cell: (data) => (
                    <>
                        <StyledText component="p">{data.value}</StyledText>
                    </>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="right" sx={{}}>
                        <Typography>Status</Typography>
                    </Box>
                ),
                accessor: "is_active",
                width: 120,
                Cell: (data) => (
                    <SwitchWrapper textAlign="right" sx={{}}>
                        <TableSwitch
                            value={data?.value}
                            data={data.row.original}
                            handleStatus={handleStatus}
                        />
                    </SwitchWrapper>
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
                                <Tooltip title="Hide Account Details" arrow>
                                    <IconButton>
                                        <VisibilityOffOutlinedIcon
                                            sx={{
                                                fontSize: "20px",
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Show Account Details" arrow>
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
                        <AddAccount update={true} update_data={row?.original} />
                        <Tooltip title="Map Privilege" arrow>
                            <IconButton
                                onClick={() =>
                                    navigate(
                                        `/user/permission/${row?.original?.id}`
                                    )
                                }
                            >
                                <SyncAltOutlinedIcon
                                    sx={{
                                        fontSize: "20px",
                                        "&:hover": {
                                            background: "transparent",
                                        },
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
                    </Box>
                ),
            },
        ],
        []
    );

    const sub_columns = [
        { key: "name", name: "Name" },
        { key: "phone_number", name: "Phone Number" },
        { key: "email", name: "Email" },
        { key: "user_type", name: "User Type" },
        { key: "is_active", name: "Status" },
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

    const filterUserType = (e) => {
        const type = e.target.value;
        const updatedFilterSchema = {
            ...filterSchema,
            user_type: type,
        };
        setFilterSchema(updatedFilterSchema);
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

    const handleStatus = useCallback((is_active, id) => {
        dispatch(actions.update_user_status({ is_active: is_active }, id));
    }, []);

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
        dispatch(actions.delete_user(id));
    };

    const handleForgotPassword = (email) => {
        dispatch(actions.forgot_password({email: email}));
    };

    return (
        <TransactionsContainer>
            <Header />
            <Filter
                handleSearch={handleSearch}
                filterUserType={filterUserType}
                handleSort={handleSort}
                handleOrder={handleOrder}
            />
            <Table
                columns={columns}
                title="Account Details"
                data={user_list?.data || []}
                sub_columns={sub_columns}
                handleDelete={handleDelete}
                handleForgotPassword={handleForgotPassword}
                loading={loading}
                rowsPerPage={8}
                renderPagination={() => (
                    <TablePagination
                        paginationData={user_list?.pagination}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                )}
            />
        </TransactionsContainer>
    );
}

export default AccountTable;
