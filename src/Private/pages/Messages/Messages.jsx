import React from "react";
import { Helmet } from "react-helmet-async";

function Messages(props) {
    return (
        <>
            <Helmet>
                <title>{import.meta.env.REACT_APP_NAME} | {props.title}</title>
            </Helmet>
            <div>Messages</div>
        </>
    );
}

export default Messages;
