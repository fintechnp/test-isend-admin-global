import React from "react";
import PropTypes from "prop-types";
import useAuthUser from "Private/hooks/useAuthUser";

export default function HasPermission({ role, permission, children }) {
    const { can, hasRole } = useAuthUser();

    return <>{(can(permission) || hasRole(role)) && children}</>;
}

HasPermission.propTypes = {
    role: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    permission: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
