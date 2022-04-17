import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import actions from "./store/actions";
import Numbers from "./components/Numbers";
import AccountTable from "./components/AccountTable";

function Accounts() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            actions.get_user_number({
                include_count: true,
                page_number: 1,
                page_size: 20,
            })
        );
    }, []);

    return (
        <Grid container spacing={2} sx={{ paddingTop: "8px" }}>
            <Grid item xs={12}>
                <Numbers />
            </Grid>
            <Grid item xs={12}>
                <AccountTable />
            </Grid>
        </Grid>
    );
}

export default Accounts;
