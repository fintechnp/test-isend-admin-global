import { reset } from "redux-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import { Helmet } from "react-helmet-async";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import BeneficiaryForm from "./Form";

import actions from "./../store/actions";

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

function AddUpdateBeneficiary(props) {
    const { bene_id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { response, loading } = useSelector(
        (state) => state.get_beneficiary_byid
    );

    useEffect(() => {
        if (bene_id) {
            dispatch(actions.get_beneficiary_byid(bene_id));
        } else {
            dispatch({ type: "GET_BENEFICIARY_BYID_RESET" });
        }
    }, [bene_id]);

    useEffect(() => {
        dispatch(reset("add_beneficiary_form"));
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
                            <Title>
                                {bene_id ? "Update" : "Add"} Beneficiary{" "}
                            </Title>
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
                    <BeneficiaryForm
                        update_data={response?.data || []}
                        loading={loading}
                    />
                </Grid>
            </Container>
        </>
    );
}

export default React.memo(AddUpdateBeneficiary);
