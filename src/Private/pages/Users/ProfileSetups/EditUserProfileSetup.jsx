import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import ProfileSetupForm from "./components/ProfileSetupForm";
import PageContent from "App/components/Container/PageContent";
import ProfileSetupFormSkeleton from "./components/ProfileSetupFormSkeleton";

import isEmpty from "App/helpers/isEmpty";
import { userProfileSetupActions } from "./store";
import routePaths from "Private/config/routePaths";
import useAuthUser from "Private/hooks/useAuthUser";
import PermissionUtils from "./utils/PermissionUtils";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";
import actions from "Common/store/actions";
import PageContentContainer from "App/components/Container/PageContentContainer";

function EditUserProfileSetup() {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const params = useParams();

    const { response: getUserMensAndPermissionsResponse, loading: isLoadingUserMenuAndPermissions } = useSelector(
        (state) => state.get_user_menus_and_permissions,
    );

    const loggedInUserMenus = getUserMensAndPermissionsResponse?.data?.role_response?.menus ?? [];

    const { response: getUserProfileSetupByIdResponse, loading: isLoadingGetUserProfileSetupById } = useSelector(
        (state) => state.get_user_profile_setup_by_id,
    );

    const userProfileSetup = getUserProfileSetupByIdResponse?.data?.role_response;

    const { success: isSuccess } = useSelector((state) => state.update_user_profile_setup);

    const defaultSelectedMenuIds = useMemo(() => {
        return PermissionUtils.getMenuIds(getUserProfileSetupByIdResponse?.data?.role_response?.menus ?? []);
    }, [getUserProfileSetupByIdResponse, getUserMensAndPermissionsResponse]);

    const defaultSelectedPermissionIds = useMemo(() => {
        const allowedPermissionIdsForCurrentUser = PermissionUtils.extractPermissionIds(
            getUserProfileSetupByIdResponse?.data?.role_response?.menus ?? [],
            null,
            true,
        );
        return PermissionUtils.extractPermissionIds(loggedInUserMenus, null, true).filter((id) =>
            allowedPermissionIdsForCurrentUser.includes(id),
        );
    }, [getUserProfileSetupByIdResponse, getUserMensAndPermissionsResponse]);

    useEffect(() => {
        dispatch(userProfileSetupActions.get_user_profile_setup_by_id(params.userProfileSetupId));
        if (!getUserMensAndPermissionsResponse) {
            dispatch({ type: actions.GET_USER_MENUS_AND_PERMISSIONS });
        }
    }, []);

    useEffect(() => {
        if (isSuccess) {
            dispatch(userProfileSetupActions.update_user_profile_setup_reset());
            navigate(-1);
        }
    }, [isSuccess]);

    const handleSubmit = (data) => {
        dispatch(
            userProfileSetupActions.update_user_profile_setup(
                {
                    role_name: data.role_name,
                    is_active: data.is_active,
                    remarks: data.remarks,
                    description: data.description,
                    menu_ids: data.permission_ids,
                },
                params.userProfileSetupId,
            ),
        );
    };

    return (
        <PageContent
            documentTitle="Create Role"
            breadcrumbs={[
                {
                    label: "Users",
                },
                {
                    label: "Roles and Permissions",
                    link: routePaths.users.listProfileSetup,
                },
                {
                    label: "Create Role",
                },
            ]}
        >
            <PageContentContainer>
                {isLoadingGetUserProfileSetupById || isLoadingUserMenuAndPermissions ? (
                    <ProfileSetupFormSkeleton />
                ) : (
                    <ProfileSetupForm
                        onSubmit={handleSubmit}
                        defaultValues={{
                            role_name: userProfileSetup?.role_name,
                            description: userProfileSetup?.description,
                            is_active: !!userProfileSetup?.is_active,
                            remarks: userProfileSetup?.remarks,
                            permission_ids: defaultSelectedPermissionIds,
                            selected_menu_ids: defaultSelectedMenuIds,
                        }}
                        permissions={getUserMensAndPermissionsResponse?.data?.role_response?.menus ?? []}
                    />
                )}
            </PageContentContainer>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.EDIT_USER_PROFILE_SETUP] })(EditUserProfileSetup);
