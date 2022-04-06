import React from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import ServiceChargeForm from "./Form";
import actions from "./../store/actions";
import { Grid, Typography } from "@mui/material";

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: 600,
    paddingBottom: "6px",
}));

function AddUpdateServiceCharge() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success: add_success, loading: add_loading } = useSelector(
        (state) => state.add_service_charge
    );
    const { success: update_success, loading: update_loading } = useSelector(
        (state) => state.update_service_charge
    );

    const handleClose = (data) => {
        navigate(-1);
    };

    const handleChargeCreate = (data) => {
        dispatch(actions.add_service_charge(data));
    };

    const handleChargeUpdate = (data) => {
        dispatch(actions.update_service_charge(data.menu_id, data));
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Title>{id ? "Update" : "Add"} Service Charge</Title>
            </Grid>
            <Grid item xs={12}>
                {id ? (
                    <ServiceChargeForm
                        destroyOnUnmount
                        // initialValues={{
                        //     menu_id: memoizedData?.menu_id,
                        //     name: memoizedData?.name,
                        //     menu_order: memoizedData?.menu_order,
                        //     is_active: memoizedData?.is_active,
                        // }}
                        onSubmit={handleChargeUpdate}
                        buttonText="Update"
                        handleClose={handleClose}
                        loading={update_loading}
                        form={`update_service_charge_form`}
                    />
                ) : (
                    <ServiceChargeForm
                        enableReinitialize={true}
                        onSubmit={handleChargeCreate}
                        buttonText="Create"
                        handleClose={handleClose}
                        form={`add_service_charge_form`}
                        initialValues={{ is_active: false }}
                        loading={add_loading}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default React.memo(AddUpdateServiceCharge);
