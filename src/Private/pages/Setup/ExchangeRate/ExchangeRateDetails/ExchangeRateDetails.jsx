import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";

import actions from "./../store/actions";
import Skeleton from "./Skeleton";
import Details from "./Details";

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

function ExchangeRateDetails(props) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { response, loading } = useSelector(
        (state) => state.get_exchange_rate_details
    );

    useEffect(() => {
        if (id) {
            dispatch(actions.get_exchange_rate_details(id));
        }
    }, [dispatch, id]);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Helmet>
                <title>{import.meta.env.REACT_APP_NAME} | {props.title}</title>
            </Helmet>
            <Grid container>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <CurrencyExchangeIcon
                                sx={{ color: "primary.main", fontSize: "28px" }}
                            />
                            <Title> Exchange Rate Details </Title>
                        </Box>
                        <BackButton
                            variant="outlined"
                            size="small"
                            onClick={handleBack}
                        >
                            Back
                        </BackButton>
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ mb: 1.2 }} />
                </Grid>
                {loading ? <Skeleton /> : <Details data={response?.data} />}
            </Grid>
        </>
    );
}

export default ExchangeRateDetails;
