import React from "react";
import { useParams } from "react-router-dom";

import MessageBox from "../components/MessageBox";

function EmailVerification() {
    const { message } = useParams();

    return <MessageBox message={message} />;
}

export default EmailVerification;
