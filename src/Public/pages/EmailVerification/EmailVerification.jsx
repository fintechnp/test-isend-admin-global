import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import MessageBox from "../components/MessageBox";
import PublicLayoutContainer from "../components/PublicLayoutContainer";

function EmailVerification(props) {
    const { message } = useParams();

    return (
        <PublicLayoutContainer>
            <Helmet>
                <title>
                    {import.meta.env.REACT_APP_NAME} | {props.title}
                </title>
            </Helmet>
            <MessageBox message={message} />
        </PublicLayoutContainer>
    );
}

export default EmailVerification;
