import React from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

import PartnerForm from "./Form";
import actions from "./../store/actions";
import { Grid, Typography } from "@mui/material";

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: 600,
    paddingBottom: "6px",
}));

function AddUpdatePartner() {
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
        dispatch(actions.add_partner(data));
    };

    const handleChargeUpdate = (data) => {
        dispatch(actions.update_partner(data.menu_id, data));
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <Title>{id ? "Update" : "Add"} Partner </Title>
            </Grid>
            <Grid item xs={12}>
                {id ? (
                    <PartnerForm
                        destroyOnUnmount
                        // initialValues={{
                        //     menu_id: memoizedData?.menu_id,
                        //     name: memoizedData?.name,
                        //     menu_order: memoizedData?.menu_order,
                        //     is_active: memoizedData?.is_active,
                        // }}
                        onSubmit={handleChargeUpdate}
                        buttonText="Update"
                        loading={update_loading}
                        handleClose={handleClose}
                        form={`update_partner_form`}
                    />
                ) : (
                    <PartnerForm
                        enableReinitialize={true}
                        onSubmit={handleChargeCreate}
                        buttonText="Create"
                        form={`add_partner_form`}
                        handleClose={handleClose}
                        initialValues={{ is_active: false }}
                        loading={add_loading}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default React.memo(AddUpdatePartner);
