import Box from "@mui/material/Box";
import { PropTypes } from "prop-types";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useCallback, useEffect, useMemo, useState } from "react";

import AddAccount from "./../AddAccount";
import Modal from "App/components/Modal/Modal";
import { useConfirm } from "App/core/mui-confirm";
import PopoverButton from "App/components/Button/PopoverButton";
import { TablePagination, TableSwitch } from "App/components/Table";
import HasPermission from "Private/components/shared/HasPermission";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import BusinessKycDetail from "Private/components/Business/BusinessKycDetail";

import actions from "./../../store/actions";
import dateUtils from "App/utils/dateUtils";
import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";
import { businessActions } from "Private/pages/Agent/Business/store";

const SwitchWrapper = styled(Box)(({ theme }) => ({
    "& .MuiButtonBase-root.MuiSwitch-switchBase.Mui-checked": {
        opacity: 0.8,
        color: theme.palette.primary.main,
    },
}));
function AccountTable({ onPageChange, onRowsPerPageChange, filterSchema }) {
    const dispatch = useDispatch();
    const confirm = useConfirm();
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { response: user_list, loading: loading } = useSelector((state) => state.get_all_user);
    const { success: a_success } = useSelector((state) => state.add_user);
    const { success: u_success } = useSelector((state) => state.update_user);
    const { success: d_success } = useSelector((state) => state.delete_user);

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

    const handleResetPassword = (id, email) => {
        confirm({
            title: "Reset Password",
            message: "Are you sure you want to reset the password for this user?",
        }).then(() => {
            dispatch(
                actions.forgot_password({
                    email,
                }),
            );
        });
    };

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Name",
                accessorKey: "name",
            },
            {
                header: "Role",
                accessorKey: "roles",
                cell: ({ row }) => <>{row.original.roles ? row.original.roles?.map((r) => r.name).join(", ") : "-"}</>,
            },
            {
                header: "Phone Number",
                accessorKey: "phone_number",
            },
            {
                header: "Email",
                accessorKey: "email",
            },
            ...(can(permissions.EDIT_USER)
                ? [
                      {
                          header: "Status",
                          accessorKey: "is_active",
                          cell: ({ row, getValue }) => (
                              <SwitchWrapper textAlign="right">
                                  <TableSwitch value={getValue()} data={row.original} handleStatus={handleStatus} />
                              </SwitchWrapper>
                          ),
                      },
                  ]
                : []),
            {
                header: "Created At",
                accessorKey: "created_ts",
                cell: ({ row, getValue }) => (
                    <Box>
                        <Typography component="p">
                            {getValue() ? dateUtils.getFormattedDate(getValue()) : "-"}
                        </Typography>
                        <Typography variant="caption">{row.original.created_by}</Typography>
                    </Box>
                ),
            },
            {
                header: "Updated At",
                accessorKey: "updated_ts",
                cell: ({ row, getValue }) => (
                    <Box>
                        <Typography component="p">
                            {getValue() ? dateUtils.getFormattedDate(getValue()) : "-"}
                        </Typography>
                        <Typography variant="caption">{row.original.updated_by}</Typography>
                    </Box>
                ),
            },
            {
                header: "Action",
                accessorKey: "action",
                cell: ({ row }) => {
                    return (
                        <PopoverButton>
                            {({ onClose }) => (
                                <>
                                    {row.original?.has_kyc ? (
                                        <>
                                            <HasPermission permission={permissions.READ_USER_KYC}>
                                                <ListItemButton
                                                    onClick={() => {
                                                        setOpen(true);
                                                        dispatch(
                                                            businessActions.get_business_kyc_details(
                                                                row?.original?.kyc_id,
                                                            ),
                                                        );
                                                        onClose();
                                                    }}
                                                >
                                                    Show KYC
                                                </ListItemButton>
                                            </HasPermission>

                                            <HasPermission permission={permissions.RESET_USER_PASSWORD}>
                                                <ListItemButton
                                                    onClick={() =>
                                                        handleResetPassword(
                                                            row?.original,
                                                            row?.original?.email,
                                                            onClose(),
                                                        )
                                                    }
                                                >
                                                    Reset Password
                                                </ListItemButton>
                                            </HasPermission>

                                            <HasPermission permission={permissions.EDIT_USER_KYC}>
                                                <ListItemButton
                                                    onClick={() => {
                                                        navigate(
                                                            buildRoute(routePaths.userKyc.editSystemUserKyc, {
                                                                id: row?.original?.id,
                                                                kycId: row?.original?.kyc_id,
                                                            }),
                                                        );
                                                    }}
                                                >
                                                    Edit KYC
                                                </ListItemButton>
                                            </HasPermission>
                                        </>
                                    ) : (
                                        <HasPermission permission={permissions.CREATE_USER_KYC}>
                                            <ListItemButton
                                                onClick={() => {
                                                    navigate(
                                                        buildRoute(routePaths.userKyc.addSystemUserKyc, {
                                                            id: row?.original?.id,
                                                        }),
                                                    );
                                                }}
                                            >
                                                Add KYC
                                            </ListItemButton>
                                        </HasPermission>
                                    )}
                                    <HasPermission permission={permissions.EDIT_USER}>
                                        <AddAccount update={true} update_data={row?.original} onClose={onClose} />
                                    </HasPermission>
                                </>
                            )}
                        </PopoverButton>
                    );
                },
            },
        ],
        [],
    );

    const handleStatus = useCallback((is_active, id) => {
        dispatch(actions.update_user_status({ is_active: is_active }, id));
    }, []);

    return (
        <>
            <TanstackReactTable columns={columns} data={user_list?.data ?? []} loading={loading} />
            <TablePagination
                paginationData={user_list.pagination}
                handleChangePage={onPageChange}
                handleChangeRowsPerPage={onRowsPerPageChange}
            />
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

AccountTable.propTypes = {
    onPageChange: PropTypes.func,
    onRowsPerPageChange: PropTypes.func,
    filterSchema: PropTypes.any,
};
