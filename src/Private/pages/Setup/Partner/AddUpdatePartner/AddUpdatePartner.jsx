import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "redux-form";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

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

function AddUpdatePartner(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { response, loading } = useSelector((state) => state.get_partner_details);

    useEffect(() => {
        if (id) {
            dispatch(actions.get_partner_details(id));
        }
    }, [id]);

    useEffect(() => {
        dispatch(reset("add_partner_form"));
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <>
            <Helmet>
                <title>BNB Admin | {props.title}</title>
            </Helmet>
            <Grid container>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                            <PersonAddAltOutlinedIcon sx={{ color: "primary.main", fontSize: "28px" }} />
                            <Title>{id ? "Update" : "Add"} Partner </Title>
                        </Box>
                        <BackButton variant="outlined" size="small" onClick={handleBack}>
                            Back
                        </BackButton>
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ mb: 1.2, pt: 0.5 }} />
                </Grid>
                <Grid item xs={12}>
                    <PartnerForm update_data={response?.data} loading={loading} />
                </Grid>
            </Grid>
        </>
    );
}

export default React.memo(AddUpdatePartner);
