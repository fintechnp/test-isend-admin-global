import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";

import ServiceChargeForm from "./Form";
import actions from "./../store/actions";
import PartnerActions from "./../../Partner/store/actions";

const TitleWrapper = styled(Box)(({ theme }) => ({
    paddingBottom: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
}));

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: 600,
    paddingLeft: "8px",
}));

const Fetching = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.main,
    fontSize: "16px",
    fontWeight: 400,
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

const filter = {
    page_number: 1,
    page_size: 100,
    agent_type: "SEND",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

function AddUpdateServiceCharge(props) {
    const { id, agent_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { success: add_success, loading: add_loading } = useSelector((state) => state.add_service_charge);
    const { success: update_success, loading: update_loading } = useSelector((state) => state.update_service_charge);

    const { response: chargeData, loading: get_loading } = useSelector((state) => state.get_service_charge_details);

    useEffect(() => {
        if (id) {
            dispatch(actions.get_service_charge_details(id));
        }
    }, [dispatch, id]);

    React.useEffect(() => {
        if (agent_id == 0) {
            dispatch(PartnerActions.get_sending_partner(filter));
        }
    }, [dispatch, agent_id]);

    useEffect(() => {
        if (add_success || update_success) {
            handleClose();
        }
    }, [add_success, update_success]);

    const handleClose = () => {
        navigate(-1);
    };

    const handleChargeCreate = (data) => {
        dispatch(actions.add_service_charge(data));
    };

    const handleChargeUpdate = (data) => {
        dispatch(actions.update_service_charge(id, data));
    };

    if (get_loading) {
        return (
            <>
                <Helmet>
                    <title>BNB Admin | {props.title}</title>
                </Helmet>
                <Grid container>
                    <Grid item xs={12}>
                        <TitleWrapper>
                            <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                                <PublishedWithChangesIcon
                                    sx={{
                                        color: "primary.main",
                                        fontSize: "28px",
                                    }}
                                />
                                <Title>{id ? "Update" : "Add"} Service Charge</Title>
                            </Box>
                            <BackButton variant="outlined" size="small" onClick={handleClose}>
                                Back
                            </BackButton>
                        </TitleWrapper>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider sx={{ mb: 1.2 }} />
                    </Grid>
                    <Grid item xs={12}>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                            <Fetching>Fetching...</Fetching>
                        </Box>
                    </Grid>
                </Grid>
            </>
        );
    }

    return (
        <>
            <Helmet>
                <title>BNB Admin | {props.title}</title>
            </Helmet>
            <Grid container>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <PublishedWithChangesIcon sx={{ color: "primary.main", fontSize: "28px" }} />
                            <Title>{id ? "Update" : "Add"} Service Charge</Title>
                        </Box>
                        <BackButton variant="outlined" size="small" onClick={handleClose}>
                            Back
                        </BackButton>
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ mb: 1.2 }} />
                </Grid>
                <Grid item xs={12}>
                    {id ? (
                        <ServiceChargeForm
                            destroyOnUnmount
                            enableReinitialize={true}
                            initialValues={
                                chargeData?.data && {
                                    min_amount: chargeData?.data?.min_amount,
                                    max_amount: chargeData?.data?.max_amount,
                                    charge_mode: chargeData?.data?.charge_mode,
                                    charge_flat: chargeData?.data?.charge_flat,
                                    charge_per: chargeData?.data?.charge_per,
                                    send_commission_type: chargeData?.data?.send_commission_type,
                                    send_commission_amount: chargeData?.data?.send_commission_amount,
                                    pay_commission_type: chargeData?.data?.pay_commission_type,
                                    pay_commission_amount: chargeData?.data?.pay_commission_amount,
                                    additional_fee: chargeData?.data?.additional_fee,
                                    is_enable: chargeData?.data?.is_enable,
                                }
                            }
                            onSubmit={handleChargeUpdate}
                            buttonText="Update"
                            update={true}
                            c_mode={chargeData?.data && chargeData?.data?.charge_mode}
                            handleClose={handleClose}
                            loading={update_loading}
                            form={`update_service_charge_form`}
                            agent_id={agent_id}
                        />
                    ) : (
                        <ServiceChargeForm
                            destroyOnUnmount
                            enableReinitialize={true}
                            onSubmit={handleChargeCreate}
                            buttonText="Create"
                            handleClose={handleClose}
                            form={`add_service_charge_form`}
                            initialValues={
                                agent_id == 0
                                    ? {
                                          sending_agent_id: "",
                                      }
                                    : {
                                          sending_agent_id: agent_id,
                                      }
                            }
                            loading={add_loading}
                            agent_id={agent_id}
                        />
                    )}
                </Grid>
            </Grid>
        </>
    );
}

export default React.memo(AddUpdateServiceCharge);
