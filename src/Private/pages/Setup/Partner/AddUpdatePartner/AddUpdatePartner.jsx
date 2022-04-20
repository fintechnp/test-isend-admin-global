import React from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import PartnerForm from "./Form";
import actions from "./../store/actions";

const TitleWrapper = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: 600,
    paddingBottom: "6px",
}));

const BackButton = styled(Button)(({ theme }) => ({
    fontSize: "12px",
    textTransform: "capitalize",
    color: theme.palette.border.main,
    borderColor: theme.palette.border.main,
    "&:hover": {
        color: theme.palette.border.dark,
        borderColor: theme.palette.border.dark,
    },
    "& .MuiButton-startIcon>*:nth-of-type(1)": {
        fontSize: "15px",
    },
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

    const handleBack = (data) => {
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
                <TitleWrapper>
                    <Title>{id ? "Update" : "Add"} Partner </Title>
                    <BackButton
                        variant="outlined"
                        size="small"
                        onClick={handleBack}
                        startIcon={<ArrowBackIosNewIcon />}
                    >
                        Back
                    </BackButton>
                </TitleWrapper>
            </Grid>
            <Grid item xs={12}>
                <Divider sx={{ mb: 1.2 }} />
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
                        handleBack={handleBack}
                        form={`update_partner_form`}
                    />
                ) : (
                    <PartnerForm
                        enableReinitialize={true}
                        onSubmit={handleChargeCreate}
                        buttonText="Create"
                        form={`add_partner_form`}
                        handleBack={handleBack}
                        loading={add_loading}
                    />
                )}
            </Grid>
        </Grid>
    );
}

export default React.memo(AddUpdatePartner);
