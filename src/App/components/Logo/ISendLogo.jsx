import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as SquareLogoDefault } from "assets/isend/logo/square-default.svg";

export default function ISendLogo({ variant = "square" }) {
    return <SquareLogoDefault />;
}

ISendLogo.propTypes = {
    variant: PropTypes.oneOf(["square"]),
};
