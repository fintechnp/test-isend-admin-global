import React from "react";
import { Helmet } from "react-helmet-async";

function Accounting(props) {
    return (
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
            <div>Accounting</div>
        </>
    );
}

export default Accounting;
