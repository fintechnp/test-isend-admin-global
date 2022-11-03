import React from "react";
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

import ExchangeRateForm from "./Form";
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

function AddUpdateExchangeRate(props) {
    const { id, currency, agent_id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { response: partner_sending, loading: partner_loading } = useSelector(
        (state) => state.get_sending_partner
    );
    const { response: exchangeData, loading: get_loading } = useSelector(
        (state) => state.get_exchange_rate_details
    );

    const { success: add_success, loading: add_loading } = useSelector(
        (state) => state.add_exchange_rate
    );
    const { success: update_success, loading: update_loading } = useSelector(
        (state) => state.update_exchange_rate
    );

    React.useEffect(() => {
        dispatch(PartnerActions.get_sending_partner(filter));
    }, [dispatch]);

    React.useEffect(() => {
        if (id) {
            dispatch(actions.get_exchange_rate_details(id));
        }
    }, [dispatch, id]);

    React.useEffect(() => {
        if (add_success || update_success) {
            handleClose();
        }
    }, [add_success, update_success]);

    const handleClose = () => {
        navigate(-1);
    };

    const handleChargeCreate = (data) => {
        dispatch(actions.add_exchange_rate(data));
    };

    const handleChargeUpdate = (data) => {
        dispatch(actions.update_exchange_rate(id, data));
    };

    if (get_loading || partner_loading) {
        return (
            <Grid container>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <PublishedWithChangesIcon
                                sx={{ color: "primary.main", fontSize: "28px" }}
                            />
                            <Title>{id ? "Update" : "Add"} Exchange Rate</Title>
                        </Box>
                        <BackButton
                            variant="outlined"
                            size="small"
                            onClick={handleClose}
                        >
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
        );
    }

    return (
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
            <Grid container>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <PublishedWithChangesIcon
                                sx={{ color: "primary.main", fontSize: "28px" }}
                            />
                            <Title>
                                {id ? "Update" : "Add"} Exchange Rate{" "}
                            </Title>
                        </Box>
                        <BackButton
                            variant="outlined"
                            size="small"
                            onClick={handleClose}
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
                        <ExchangeRateForm
                            destroyOnUnmount
                            enableReinitialize={true}
                            initialValues={
                                exchangeData?.data && {
                                    base_to_sending:
                                        exchangeData?.data?.base_to_sending,
                                    base_to_sending_margin:
                                        exchangeData?.data
                                            ?.base_to_sending_margin,
                                    base_to_sending_settle:
                                        exchangeData?.data
                                            ?.base_to_sending_settle,
                                    send_min_amount:
                                        exchangeData?.data?.send_min_amount,
                                    send_max_amount:
                                        exchangeData?.data?.send_max_amount,
                                    round_send_amount:
                                        exchangeData?.data?.round_send_amount,
                                    base_to_receiving:
                                        exchangeData?.data?.base_to_receiving,
                                    base_to_receiving_margin:
                                        exchangeData?.data
                                            ?.base_to_receiving_margin,
                                    base_to_receiving_settle:
                                        exchangeData?.data
                                            ?.base_to_receiving_settle,
                                    receive_min_amount:
                                        exchangeData?.data?.receive_min_amount,
                                    receive_max_amount:
                                        exchangeData?.data?.receive_max_amount,
                                    round_receiving_amount:
                                        exchangeData?.data
                                            ?.round_receiving_amount,
                                    customer_rate:
                                        exchangeData?.data?.customer_rate,
                                    round_customer_rate:
                                        exchangeData?.data?.round_customer_rate,
                                }
                            }
                            data={exchangeData?.data}
                            onSubmit={handleChargeUpdate}
                            buttonText="Update"
                            handleClose={handleClose}
                            loading={update_loading}
                            form={`update_exchange_rate`}
                            partner_sending={partner_sending?.data || []}
                        />
                    ) : (
                        <ExchangeRateForm
                            destroyOnUnmount
                            enableReinitialize
                            onSubmit={handleChargeCreate}
                            buttonText="Create"
                            form={`add_exchange_rate`}
                            handleClose={handleClose}
                            initialValues={
                                agent_id == 0
                                    ? {
                                          sending_agent_id: "",
                                          sending_currency: "",
                                      }
                                    : {
                                          sending_agent_id: agent_id,
                                          sending_currency: currency,
                                      }
                            }
                            loading={add_loading}
                            partner_sending={partner_sending?.data || []}
                        />
                    )}
                </Grid>
            </Grid>
        </>
    );
}

export default React.memo(AddUpdateExchangeRate);
