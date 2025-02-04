import isEmpty from "App/helpers/isEmpty";

function useGridSizePermission(permissions) {
    const permissionArray = Array.isArray(permissions) ? permissions : [permissions];

    return {
        xs1: permissionArray.some((permission) => !isEmpty(permission)) ? 6 : 12,
        xs2: permissionArray.some((permission) => !isEmpty(permission)) ? 6 : 12,
    };
}

export default useGridSizePermission;
