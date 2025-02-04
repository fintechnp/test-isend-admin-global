import React from "react";
import PropTypes from "prop-types";

import useAuthUser from "../hooks/useAuthUser";

const withDashboardPermission =
    ({ role, permission }) =>
    (WrappedComponent) => {
        return (props) => {
            const { can, hasRole } = useAuthUser();

            if (permission && can(permission)) {
                return <WrappedComponent {...props} />;
            }
            return <></>;
        };
    };

export default withDashboardPermission;

withDashboardPermission.propTypes = {
    role: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    permission: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
