import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withZaiCountryCheck = (WrappedComponent) => {
    return function CountryCheckWrapper(props) {
        const SELECTED_COUNTRY_KEY = "iSendRemit.166e95bafdc0bb30c1daea3a47afc91b.csk";

        const navigate = useNavigate();

        useEffect(() => {
            const getCountryISO3 = localStorage.getItem(SELECTED_COUNTRY_KEY);

            if (getCountryISO3 !== "SGP") {
                navigate("/");
            }
        }, [navigate]);

        return <WrappedComponent {...props} />;
    };
};

export default withZaiCountryCheck;
