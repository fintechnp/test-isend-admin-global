import React, { useEffect } from "react";
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

    const { response: chargeData, loading: get_loading } = useSelector(
        (state) => state.get_service_charge_details
    );

    useEffect(() => {
        if (id) {
            dispatch(actions.get_service_charge_details(id));
        }
    }, [dispatch, id]);

    const handleClose = () => {
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
                        enableReinitialize
                        initialValues={{
                            min_amount: chargeData?.data?.min_amount,
                            max_amount: chargeData?.data?.max_amount,
                            charge_mode: chargeData?.data?.charge_mode,
                            charge_flat: chargeData?.data?.charge_flat,
                            charge_per: chargeData?.data?.charge_per,
                            send_commission_type:
                                chargeData?.data?.send_commission_type,
                            send_commission_amount:
                                chargeData?.data?.send_commission_amount,
                            pay_commission_type:
                                chargeData?.data?.pay_commission_type,
                            pay_commission_amount:
                                chargeData?.data?.pay_commission_amount,
                            additional_fee: chargeData?.data?.additional_fee,
                            is_enable: chargeData?.data?.is_enable,
                        }}
                        onSubmit={handleChargeUpdate}
                        buttonText="Update"
                        update={true}
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
                        initialValues={{ is_enable: true }}
                        loading={add_loading}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default React.memo(AddUpdateServiceCharge);
