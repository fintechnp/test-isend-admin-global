import React from "react";
import PropTypes from "prop-types";

import { ReactComponent as ShortLogo } from "assets/isend/logo/short.svg";
import { ReactComponent as DefaultLogo } from "assets/isend/logo/default.svg";
import { ReactComponent as WhiteShortLogo } from "assets/isend/logo/white-short.svg";
import { ReactComponent as WhiteDefaultLogo } from "assets/isend/logo/white-default.svg";

export default function ISendLogo({ variant = "default", color = "default" }) {
    const logos = {
        default: {
            default: <DefaultLogo />,
            white: <WhiteDefaultLogo />,
        },
        short: {
            default: <ShortLogo />,
            white: <WhiteShortLogo />,
        },
    };

    return logos[variant][color];
}

ISendLogo.propTypes = {
    variant: PropTypes.oneOf(["default", "short"]),
    color: PropTypes.oneOf(["default", "white"]),
};
