import { Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import actions from "./store/actions";
import Numbers from "./components/Numbers";
import AccountTable from "./components/AccountTable";

function Accounts(props) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            actions.get_user_number({
                include_count: true,
                page_number: 1,
                page_size: 20,
            }),
        );
    }, []);

    return (
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
            <Grid container spacing={2} sx={{ paddingTop: "8px" }}>
                <Grid item xs={12}>
                    <Numbers />
                </Grid>
                <Grid item xs={12}>
                    <AccountTable />
                </Grid>
            </Grid>
        </>
    );
}

export default Accounts;
