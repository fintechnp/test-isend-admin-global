import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import { reset } from "redux-form";

import actions from "./store/actions";
import PermissionForm from "./PermissionForm";

const Permission = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const permissionList = useSelector(
        (state) => state.get_all_permission?.response
    );

    useEffect(() => {
        dispatch(reset("create_permission_form"));
    }, []);

    const handleUpdatePermission = (data) => {
        const policy = data.menu.map((menu) => {
            const sub_menu = menu.sub_menu.filter(
                (sub) => sub.sub_title !== "All" && sub.is_active !== false
            );
            return { ...menu, sub_menu };
        });
        dispatch(actions.create_user_permission(policy, id));
    };

    return (
        <>
            <Grid container sx={{ padding: 0 }}>
                <Grid item xs={12}>
                    <PermissionForm
                        onSubmit={handleUpdatePermission}
                        initialValues={{
                            menu: permissionList?.data && permissionList?.data,
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default Permission;
