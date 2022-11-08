import React from "react";
import { Helmet } from "react-helmet-async";

function Messages(props) {
    return (
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
            <div>Messages</div>
        </>
    );
}

export default Messages;
