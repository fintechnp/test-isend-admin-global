import React from "react";
import PropTypes from "prop-types";

import useAuthUser from "../hooks/useAuthUser";
import AccessDenied from "App/components/Error/AccessDenied";

const withPermission =
    ({ role, permission }) =>
    (WrappedComponent) => {
        return (props) => {
            const { can, hasRole } = useAuthUser();

            if (permission && can(permission)) {
                return <WrappedComponent {...props} />;
            }
            return <AccessDenied />;
        };
    };

export default withPermission;

withPermission.propTypes = {
    role: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    permission: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};
