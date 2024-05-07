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

import Table, { TablePagination, TableSwitch } from "./../../../../../../App/components/Table";
import actions from "./../../store/actions";
import AddAccount from "./../AddAccount";
import Header from "./../Header";
import Filter from "./../Filter";
import Button from "App/components/Button/Button";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import BusinessKycDetail from "Private/components/Business/BusinessKycDetail";
import Modal from "App/components/Modal/Modal";

import { businessActions } from "Private/pages/Business/store";

const TransactionsContainer = styled("div")(({ theme }) => ({
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
    
}));

const StyledText = styled(Typography)(({ theme }) => ({
    opacity: 0.9,
    fontSize: "15px",
    
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
    const [open, setOpen] = useState(false);
    const { response: user_list, loading: loading } = useSelector((state) => state.get_all_user);
    const { success: a_success } = useSelector((state) => state.add_user);
    const { success: u_success } = useSelector((state) => state.update_user);
    const { success: d_success } = useSelector((state) => state.delete_user);

    const { response: kycDetailData, loading: kycDetailLoading } = useSelector(
        (state) => state.get_business_kyc_details,
    );

    useEffect(() => {
        dispatch(actions.get_all_user(filterSchema));
    }, [filterSchema]);

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        if (u_success || d_success || a_success) {
            setFilterSchema({ ...initialState });
            dispatch(
                actions.get_user_number({
                    include_count: true,
                    page_number: 1,
                    page_size: 20,
                }),
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
                            {data.value ? data.value : "n/a"}
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
                        <StyledText component="p">{data.value ? data.value : "n/a"}</StyledText>
                    </Box>
                ),
            },
            {
                Header: "Phone Number",
                accessor: "phone_number",
                Cell: (data) => (
                    <>
                        <StyledText component="p">{data.value ? data.value : "n/a"}</StyledText>
                    </>
                ),
            },
            {
                Header: "Email",
                accessor: "email",
                maxWidth: 250,
                Cell: (data) => (
                    <>
                        <StyledText component="p">{data.value ? data.value : "n/a"}</StyledText>
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
                        <TableSwitch value={data?.value} data={data.row.original} handleStatus={handleStatus} />
                    </SwitchWrapper>
                ),
            },
            {
                Header: () => (
                    <Box textAlign="center">
                        <Typography>KYC</Typography>
                    </Box>
                ),
                accessor: "kyc",
                Cell: ({ row }) => {
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "center",
                            }}
                        >
                            {row?.original?.has_kyc ? (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        gap: 2,
                                    }}
                                >
                                    <Tooltip title="Show KYC" arrow>
                                        <Button
                                            size="small"
                                            onClick={() => {
                                                setOpen(true);
                                                dispatch(
                                                    businessActions.get_business_kyc_details(row?.original?.kyc_id),
                                                );
                                            }}
                                        >
                                            Show Kyc
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Edit KYC" arrow>
                                        <Button
                                            size="small"
                                            onClick={() => {
                                                navigate(
                                                    buildRoute(routePaths.userKyc.editSystemUserKyc, {
                                                        id: row?.original?.id,
                                                        kycId: row?.original?.kyc_id,
                                                    }),
                                                );
                                            }}
                                        >
                                            Edit Kyc
                                        </Button>
                                    </Tooltip>
                                </Box>
                            ) : (
                                <Tooltip title="Add KYC" arrow>
                                    <Button
                                        size="small"
                                        onClick={() => {
                                            navigate(
                                                buildRoute(routePaths.userKyc.addSystemUserKyc, {
                                                    id: row?.original?.id,
                                                }),
                                            );
                                        }}
                                    >
                                        Add Kyc
                                    </Button>
                                </Tooltip>
                            )}
                        </Box>
                    );
                },
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
                            <IconButton onClick={() => navigate(`/user/permission/${row?.original?.id}`)}>
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
        [],
    );

    const sub_columns = [
        { key: "name", name: "Name", type: "default" },
        { key: "phone_number", name: "Phone Number", type: "default" },
        { key: "email", name: "Email", type: "default" },
        { key: "user_type", name: "User Type", type: "default" },
        { key: "agent_id", name: "Agent", type: "default" },
        { key: "is_active", name: "Status", type: "boolean" },
        { key: "created_by", name: "Created By", type: "default" },
        { key: "created_ts", name: "Created Date", type: "date" },
        { key: "last_login_ts", name: "Last Login", type: "date" },
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
        dispatch(actions.forgot_password({ email: email }));
    };

    return (
        <>
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
            <Modal
                title="Kyc Detail"
                open={open}
                onClose={handleClose}
                sx={{
                    width: "60%",
                }}
            >
                <BusinessKycDetail data={kycDetailData?.data} loading={kycDetailLoading} relatedTo="market-maker" />
            </Modal>
        </>
    );
}

export default AccountTable;
