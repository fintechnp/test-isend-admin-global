import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import actions from "./../store/actions";
import { Grid, Typography } from "@mui/material";

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: 600,
    paddingBottom: "6px",
}));

function ServiceChargeDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { response: service_data, loading: loading } = useSelector(
        (state) => state.get_service_charge_by_partner
    );

    useEffect(() => {
        dispatch(actions.get_service_charge_by_partner(id));
    }, [dispatch, id]);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Title>Service Charge Details</Title>
            </Grid>
            <Grid item xs={12}></Grid>
        </Grid>
    );
}

export default ServiceChargeDetails;
