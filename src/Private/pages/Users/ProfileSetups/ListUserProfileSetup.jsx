import * as Yup from "yup";
import { useForm } from "react-hook-form";
import React, { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import Radio from "@mui/material/Radio";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Column from "App/components/Column/Column";
import RadioGroup from "@mui/material/RadioGroup";
import { TablePagination } from "App/components/Table";
import ListItemButton from "@mui/material/ListItemButton";
import SubmitButton from "App/components/Button/SubmitButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import PageContent from "App/components/Container/PageContent";
import PopoverButton from "App/components/Button/PopoverButton";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import ViewUserProfileSetupModal from "./components/ViewUserProfileSetupModal";
import PageContentContainer from "App/components/Container/PageContentContainer";

import isEmpty from "App/helpers/isEmpty";
import dateUtils from "App/utils/dateUtils";
import buildRoute from "App/helpers/buildRoute";
import { userProfileSetupActions } from "./store";
import routePaths from "Private/config/routePaths";
import useAuthUser from "Private/hooks/useAuthUser";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import useListFilterStore from "App/hooks/useListFilterStore";

const initialState = {
    page_number: 1,
    page_size: 10,
};

const schema = Yup.object().shape({
    role_name: Yup.string().required("Required").min(1, "Required"),
    is_active: Yup.boolean().required("Required"),
});

function ListUserProfileSetup() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { can } = useAuthUser();

    const { response, loading: isLoading } = useSelector((state) => state.list_user_profile_setup);

    const data =
        response?.pagination?.currentPage === 1 ? [{}, ...(response?.data ?? [])] : [...(response?.data ?? [])];

    const { filterSchema, onRowsPerPageChange, onPageChange } = useListFilterStore({ initialState });

    const canUserProfileSetup = can(permissions.CREATE_USER_PROFILE_SETUP);

    const {
        response: userProfileSetup,
        loading: isCreating,
        success: isCreated,
    } = useSelector((state) => state.add_user_profile_setup);

    const methods = useForm({
        defaultValues: {
            is_active: true,
        },
        resolver: yupResolver(schema),
    });

    const {
        watch,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = methods;

    const isActive = watch("is_active");

    const handleChange = (e) => {
        setValue("is_active", e.target.value === "true");
    };

    const onSubmit = (data) => {
        dispatch(userProfileSetupActions.add_user_profile_setup(data));
    };

    const columns = useMemo(() => [
        {
            header: "S.N.",
            accessorKey: "f_serial_no",
        },
        {
            header: "Name",
            accessorKey: "role_name",
            cell: ({ row, getValue }) => (
                <>
                    {isEmpty(row.original) ? (
                        <TextField
                            {...register("role_name")}
                            size="small"
                            placeholder="Enter a name"
                            error={!!errors?.name?.message}
                            helperText={errors?.name?.message}
                        />
                    ) : (
                        getValue()
                    )}
                </>
            ),
        },
        {
            header: "Status",
            accessorKey: "is_active",
            cell: ({ row, getValue }) => (
                <>
                    {isEmpty(row.original) ? (
                        <RadioGroup row value={isActive} onChange={handleChange}>
                            <FormControlLabel value={true} control={<Radio />} label="Active" />
                            <FormControlLabel value={false} control={<Radio />} label="Inactive" />
                        </RadioGroup>
                    ) : getValue() ? (
                        "Active"
                    ) : (
                        "Inactive"
                    )}
                </>
            ),
        },
        {
            header: "Created At",
            accessorKey: "created_ts",
            cell: ({ row, getValue }) => (
                <>
                    {" "}
                    {isEmpty(row.original) ? (
                        ""
                    ) : (
                        <>
                            <Typography> {dateUtils.getFormattedDate(getValue())}</Typography>
                            <Typography>{row.original?.created_by ?? "-"}</Typography>
                        </>
                    )}
                </>
            ),
        },
        {
            header: "Updated At",
            accessorKey: "updated_ts",
            cell: ({ row, getValue }) => (
                <>
                    {isEmpty(row.original) ? (
                        ""
                    ) : (
                        <>
                            <Typography>{getValue() ? dateUtils.getFormattedDate(getValue()) : "-"}</Typography>
                            <Typography>{row.original?.updated_by}</Typography>
                        </>
                    )}
                </>
            ),
        },
        {
            header: "Actions",
            cell: ({ row }) => (
                <>
                    {isEmpty(row.original) ? (
                        <SubmitButton
                            type="button"
                            onClick={handleSubmit(onSubmit)}
                            submitText="Create"
                            submittingText="Creating"
                            isLoading={isCreating}
                        />
                    ) : (
                        <PopoverButton>
                            {({ onClose }) => (
                                <>
                                    {canUserProfileSetup && (
                                        <ViewUserProfileSetupModal
                                            userProfileSetupId={row.original.id}
                                            onClose={onClose}
                                        />
                                    )}
                                    {can(permissions.EDIT_USER_PROFILE_SETUP) && !!row.original.is_editable && (
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(
                                                    buildRoute(routePaths.users.editProfileSetup, row.original.id),
                                                );
                                                onClose();
                                            }}
                                        >
                                            Edit
                                        </ListItemButton>
                                    )}
                                </>
                            )}
                        </PopoverButton>
                    )}
                </>
            ),
        },
    ]);

    useEffect(() => {
        dispatch(userProfileSetupActions.list_user_profile_setup(filterSchema));
    }, [filterSchema]);

    useEffect(() => {
        if (isCreated) {
            navigate(buildRoute(routePaths.users.editProfileSetup, userProfileSetup.data));
        }
        dispatch(userProfileSetupActions.add_user_profile_setup_reset());
    }, [isCreated]);

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
        >
            <Column gap="16px">
                <PageContentContainer title="Roles and Permissions">
                    <TanstackReactTable columns={columns} data={data} loading={isLoading} />
                </PageContentContainer>
                <TablePagination
                    paginationData={response?.pagination}
                    handleChangePage={onPageChange}
                    handleChangeRowsPerPage={onRowsPerPageChange}
                />
            </Column>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_USER_PROFILE_SETUP] })(ListUserProfileSetup);
