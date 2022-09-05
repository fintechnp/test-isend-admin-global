import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import actions from "./store/actions";

function Documents() {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(actions.get_documents(id));
        }
    }, [dispatch, id]);

    return <div>Documents</div>;
}

export default Documents;
