import React from "react";
import { useParams } from "react-router-dom";

import MessageBox from "../components/MessageBox";
import { PublicLayout } from "../../../App/layouts";

function EmailVerification() {
    const { message } = useParams();

    return (
        <PublicLayout>
            <MessageBox message={message} />
        </PublicLayout>
    );
}

export default EmailVerification;
