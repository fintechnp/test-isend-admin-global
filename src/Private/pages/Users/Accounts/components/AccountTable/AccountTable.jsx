import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import MuiIconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import React, { useMemo, useEffect, useState, useCallback } from "react";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import Filter from "./../Filter";
import AddAccount from "./../AddAccount";
import FilterForm from "../Filter/FilterForm";
import Modal from "App/components/Modal/Modal";
import Button from "App/components/Button/Button";
import Column from "App/components/Column/Column";
import HasPermission from "Private/components/shared/HasPermission";
import Table, { TablePagination, TableSwitch } from "App/components/Table";
import BusinessKycDetail from "Private/components/Business/BusinessKycDetail";

import actions from "./../../store/actions";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";
import { businessActions } from "Private/pages/Business/store";
import dateUtils from "App/utils/dateUtils";

const TransactionsContainer = styled("div")(({ theme }) => ({
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
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
    const [isOpenFilterForm, setIsOpenFilterForm] = useState(false);

    const { can } = useAuthUser();

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
                        </Avatar>
                        <StyledName component="p" sx={{ paddingLeft: "8px" }}>
                            {data.value ? data.value : "n/a"}
                        </StyledName>
                    </Box>
                ),
            },
            {
                Header: () => (
                    <Box>
                        <Typography>Role</Typography>
                    </Box>
                ),
                accessor: "roles",
                Cell: (data) => (
                    <Box>
                        <StyledText component="p">
                            {data.value ? data.value?.map((r) => r.name).join(", ") : "n/a"}
                        </StyledText>
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
            ...(can(permissions.EDIT_USER)
                ? [
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
                  ]
                : []),
            {
                Header: "Created At",
                accessor: "created_ts",
                maxWidth: 250,
                Cell: ({ row, value }) => (
                    <Box>
                        <Typography component="p">{value ? dateUtils.getFormattedDate(value) : "n/a"}</Typography>
                        <Typography variant="caption">{row.original.created_by}</Typography>
                    </Box>
                ),
            },
            {
                Header: "Updated At",
                accessor: "updated_ts",
                maxWidth: 250,
                Cell: ({ row, value }) => (
                    <Box>
                        <Typography component="p">{value ? dateUtils.getFormattedDate(value) : "n/a"}</Typography>
                        <Typography variant="caption">{row.original.updated_by ?? '-'}</Typography>
                    </Box>
                ),
            },
            ...(can([permissions.CREATE_USER_KYC, permissions.READ_USER_KYC, permissions.EDIT_USER_KYC])
                ? [
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
                                              <HasPermission permission={permissions.READ_USER_KYC}>
                                                  <Tooltip title="Show KYC" arrow>
                                                      <Button
                                                          size="small"
                                                          onClick={() => {
                                                              setOpen(true);
                                                              dispatch(
                                                                  businessActions.get_business_kyc_details(
                                                                      row?.original?.kyc_id,
                                                                  ),
                                                              );
                                                          }}
                                                      >
                                                          Show Kyc
                                                      </Button>
                                                  </Tooltip>
                                              </HasPermission>
                                              <HasPermission permission={permissions.EDIT_USER_KYC}>
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
                                              </HasPermission>
                                          </Box>
                                      ) : (
                                          <HasPermission permission={permissions.CREATE_USER_KYC}>
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
                                          </HasPermission>
                                      )}
                                  </Box>
                              );
                          },
                      },
                  ]
                : []),
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
                        <HasPermission permission={permissions.EDIT_USER}>
                            <AddAccount update={true} update_data={row?.original} />
                        </HasPermission>
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

    const handleFilter = useCallback((data) => {
        setFilterSchema((prev) => ({
            ...prev,
            ...data,
        }));
    }, []);

    const handleReset = useCallback(
        (value) => {
            const params = { ...filterSchema };
            ["name", "email", "role", "phone_number", "status"].forEach((key) => delete params[key]);
            setFilterSchema(params);
        },
        [filterSchema],
    );
    return (
        <>
            <TransactionsContainer>
                <FilterForm isOpen={isOpenFilterForm} onSubmit={handleFilter} onReset={handleReset} />
                <Column justifyContent="flex-end" alignItems="flex-end" p={1}>
                    <HasPermission permission={permissions.CREATE_USER}>
                        <AddAccount update={false} />
                    </HasPermission>
                    <Filter
                        isOpenFilterForm={isOpenFilterForm}
                        onClickFilter={() => setIsOpenFilterForm((value) => !value)}
                        handleSearch={handleSearch}
                        filterUserType={filterUserType}
                        handleSort={handleSort}
                        handleOrder={handleOrder}
                    />
                </Column>
                <Table
                    columns={columns}
                    title="Account Details"
                    data={user_list?.data || []}
                    sub_columns={sub_columns}
                    handleDelete={can(permissions.DELETE_USER) ? handleDelete : undefined}
                    handleForgotPassword={can(permissions.RESET_USER_PASSWORD) ? handleForgotPassword : undefined}
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
