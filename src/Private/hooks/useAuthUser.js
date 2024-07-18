import { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

import { useAuth } from "App/auth";
import PermissionUtils from "Private/pages/Users/ProfileSetups/utils/PermissionUtils";

const useAuthUser = () => {
    const { permissions, setPermissions } = useAuth();

    const user = {
        roles: [],
        permissions: permissions,
    };

    const { response, loading: isLoadingUserMensAndPermissions } = useSelector(
        (state) => state.get_user_menus_and_permissions,
    );

    const menus = useMemo(() => response?.data?.role_response?.menus, [response?.data?.role_response?.menus]);

    useEffect(() => {
        if (permissions.length <= 0) {
            const allowedPermissions = PermissionUtils.extractPermissionNames(
                response?.data?.role_response?.menus ?? [],
            );
            setPermissions(allowedPermissions);
        }
    }, [response?.data?.role_response?.menus]);

    /**
     * check if a user has permission
     */
    const hasPermission = (permission) => {
        return permissions.includes(permission);
    };

    /**
     * check if a user has role
     */
    const hasRole = (role) => {
        if (typeof role === "array") {
            return role.some((r) => user.roles.includes(r));
        }
        return user.roles.includes(role);
    };

    /**
     * check a user can perform action
     */
    const can = (permissions) => {
        // TODO: remove in prod

        return true;

        return (
            (typeof permissions === "string" && hasPermission(permissions)) ||
            !!(Array.isArray(permissions) && !!permissions.filter((p) => hasPermission(p)).length)
        );
    };

    return {
        can,
        hasPermission,
        hasRole: hasRole,
        permissions: menus,
        isLoadingUserMensAndPermissions,
    };
};

export default useAuthUser;
