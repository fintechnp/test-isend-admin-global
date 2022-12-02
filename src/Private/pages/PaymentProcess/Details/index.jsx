import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import actions from "./../store/actions";
import TransactionSkeleton from "./Skeleton";
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

function TransactionDetails(props) {
    const { id, tid } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { response, loading } = useSelector(
        (state) => state.get_transaction_details
    );

    const { response: aml_response, loading: aml_loading } = useSelector(
        (state) => state.get_aml_suspicious_details
    );

    useEffect(() => {
        if (id) {
            dispatch(actions.get_transaction_details(id));
        }
    }, [id]);

    useEffect(() => {
        if (tid) {
            dispatch(actions.get_aml_suspicious_details(tid));
        }
    }, [tid]);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Helmet>
                <title>Isend Global Admin | {props.title}</title>
            </Helmet>
            <Grid container sx={{ pb: "24px" }}>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <ReceiptLongIcon
                                sx={{ color: "primary.main", fontSize: "28px" }}
                            />
                            <Title> Transaction Details </Title>
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
                {loading || aml_loading ? (
                    <TransactionSkeleton />
                ) : id ? (
                    <Details data={response?.data || []} />
                ) : (
                    <Details data={aml_response?.data || []} />
                )}
            </Grid>
        </>
    );
}

export default TransactionDetails;
