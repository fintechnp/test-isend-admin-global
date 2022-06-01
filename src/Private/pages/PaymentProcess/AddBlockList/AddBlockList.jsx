import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";

import Loading from "./../../../../App/components/Loading";
import actions from "./../store/actions";
import MessageBox from "./MessageBox";
import Search from "./Search";
import Details from "./Details";
import Form from "./Form";
import { useNavigate } from "react-router-dom";

const TitleWrapper = styled(Box)(({ theme }) => ({
    paddingBottom: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("sm")]: {
        alignItems: "flex-start",
        flexDirection: "column",
    },
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

function AddBlockList() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { response, loading, success } = useSelector(
        (state) => state.get_transaction_details
    );

    const { success: b_sucess, loading: b_loading } = useSelector(
        (state) => state.block_transactions
    );

    useEffect(() => {
        if (b_sucess) {
            dispatch({ type: "BLOCK_TRANSACTIONS_RESET" });
            dispatch({ type: "GET_TRANSACTION_DETAILS_RESET" });
        }
    }, [b_sucess]);

    useEffect(() => {
        dispatch({ type: "GET_TRANSACTION_DETAILS_RESET" });
    }, []);

    const handleSearch = (data) => {
        dispatch(actions.get_transaction_details(data));
    };

    const handleBlock = (id, data) => {
        dispatch(actions.block_transactions(id, data));
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Grid container sx={{ pb: "24px" }}>
            <Grid item xs={12}>
                <TitleWrapper>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <CancelPresentationIcon
                            sx={{ color: "primary.main", fontSize: "28px" }}
                        />
                        <Title> Add Transaction to Block List </Title>
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
                <Search handleSearch={handleSearch} loading={loading} />
            </Grid>
            {/* <Grid item xs={12}>
                <Divider sx={{ mb: 1.2, mt: 1.2 }} />
            </Grid> */}
            {loading && (
                <Grid item xs={12}>
                    <Loading loading={loading} />
                </Grid>
            )}
            {!response?.data && !loading && success && (
                <Grid item xs={12}>
                    <MessageBox text="No Transaction Found" />
                </Grid>
            )}
            {response?.data && !loading && (
                <>
                    <Grid item xs={12}>
                        <Details data={response?.data} />
                    </Grid>
                    <Grid item xs={12}>
                        <Form onSubmit={handleBlock} loading={b_loading} />
                    </Grid>
                </>
            )}
        </Grid>
    );
}

export default AddBlockList;
