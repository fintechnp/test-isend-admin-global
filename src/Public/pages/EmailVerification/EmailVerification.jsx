import React from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import MessageBox from "../components/MessageBox";

function EmailVerification(props) {
    const { message } = useParams();

    return (
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
            <MessageBox message={message} />
        </>
    );
}

export default EmailVerification;
