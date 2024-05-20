import React, { useEffect, useMemo, useState } from "react";

import Table from "@mui/material/Table";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { useDispatch, useSelector } from "react-redux";
import TableContainer from "@mui/material/TableContainer";

import Row from "App/components/Row/Row";
import { useNavigate } from "react-router-dom";
import { userProfileSetupActions } from "./store";
import Typography from "@mui/material/Typography";
import { TablePagination } from "App/components/Table";
import PageContent from "App/components/Container/PageContent";
import EditIconButton from "App/components/Button/EditIconButton";
import ViewIconButton from "App/components/Button/ViewIconButton";
import SearchTextField from "App/components/Fields/SearchTextField";
import TableBodySkeleton from "App/components/Table/TableBodySkeleton";
import AddProfileSetupTableRowForm from "./components/AddProfileSetupTableRowForm";

import buildRoute from "App/helpers/buildRoute";
import routePaths from "Private/config/routePaths";
import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import dateUtils from "App/utils/dateUtils";
import ViewUserProfileSetupModal from "./components/ViewUserProfileSetupModal";

const initialQueryParams = {
    page_number: 1,
    page_size: 10,
};

function ListUserProfileSetup() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { can } = useAuthUser();

    const { response, loading } = useSelector((state) => state.list_user_profile_setup);

    const [filterSchema, setFilterSchema] = useState({ ...initialQueryParams });

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

    useEffect(() => {
        dispatch(userProfileSetupActions.list_user_profile_setup(filterSchema));
    }, [filterSchema]);

    const canUserProfileSetup = can(permissions.CREATE_USER_PROFILE_SETUP);

    return (
        <PageContent
            documentTitle="Roles and Permissions"
            breadcrumbs={[
                {
                    label: "Users",
                },
                {
                    label: "Roles and Permissions",
                },
            ]}
            disablePadding
        >
            <Row p={2}>
                <SearchTextField
                    onChange={(value) => {
                        setFilterSchema((prev) => ({ ...prev, search: value }));
                    }}
                    onClear={() => {
                        setFilterSchema((prev) => ({ ...prev, search: null }));
                    }}
                />
            </Row>
            <TableContainer>
                <Table>
                    <TableHead sx={{ bgcolor: "primary.main", color: "white" }}>
                        <TableRow>
                            <TableCell>
                                <Typography color="white">SN</Typography>
                            </TableCell>
                            <TableCell color="white">
                                <Typography color="white">Name</Typography>
                            </TableCell>

                            <TableCell>
                                <Typography align="center" color="white">
                                    Status
                                </Typography>
                            </TableCell>
                            <TableCell color="white">
                                <Typography color="white">Created At</Typography>
                            </TableCell>
                            <TableCell color="white">
                                <Typography color="white">Created By</Typography>
                            </TableCell>
                            <TableCell color="white">
                                <Typography color="white">Updated At</Typography>
                            </TableCell>
                            <TableCell color="white">
                                <Typography color="white">Updated By</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography color="white">Actions</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableBodySkeleton columnCount={8} />
                        ) : (
                            <>
                                {canUserProfileSetup && response?.pagination?.currentPage === 1 && (
                                    <AddProfileSetupTableRowForm />
                                )}
                                {response?.data?.map((role) => (
                                    <TableRow key={role.id}>
                                        <TableCell>
                                            <Typography>{role.f_serial_no + (canUserProfileSetup ? 1 : 0)}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{role.role_name}</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography textAlign="center">
                                                {role.is_active ? "Active" : "Inactive"}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>{dateUtils.getFormattedDate(role.created_ts)}</TableCell>
                                        <TableCell>{role.created_by ?? "-"}</TableCell>
                                        <TableCell>
                                            {role.updated_ts ? dateUtils.getFormattedDate(role.updated_ts) : "-"}
                                        </TableCell>
                                        <TableCell>{role.updated_by ?? "-"}</TableCell>
                                        <TableCell>
                                            <ViewUserProfileSetupModal userProfileSetupId={role.id}/>
                                            {can(permissions.EDIT_USER_PROFILE_SETUP) && !!role?.is_editable && (
                                                <EditIconButton
                                                    onClick={() =>
                                                        navigate(buildRoute(routePaths.users.editProfileSetup, role.id))
                                                    }
                                                />
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    paginationData={response?.pagination}
                    handleChangePage={handleChangePage}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </TableContainer>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_USER_PROFILE_SETUP] })(ListUserProfileSetup);
