import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { reset } from "redux-form";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import actions from "../store/actions";
import TransactionForm from "./Form";

const Container = styled(Grid)(({ theme }) => ({
    display: "flex",
}));

const TitleWrapper = styled(Box)(({ theme }) => ({
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

function AddUpdateTransactions(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(reset("create_transaction_form"));
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Helmet>
                <title>{import.meta.env.REACT_APP_NAME} | {props.title}</title>
            </Helmet>
            <Container container>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <PersonAddAltOutlinedIcon
                                sx={{ color: "primary.main", fontSize: "28px" }}
                            />
                            <Title>Create Transaction </Title>
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
                    <Divider sx={{ mb: 1.2, pt: 0.5 }} />
                </Grid>
                <Grid item xs={12}>
                    <TransactionForm />
                </Grid>
            </Container>
        </>
    );
}

export default React.memo(AddUpdateTransactions);
