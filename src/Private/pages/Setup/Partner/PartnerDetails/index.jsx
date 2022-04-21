import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

import actions from "./../store/actions";
import PartnerSkeleton from "./Skeleton";

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

function PartnerDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { response, success, loading } = useSelector(
        (state) => state.get_partner_details
    );

    useEffect(() => {
        if (id) {
            dispatch(actions.get_partner_details(id));
        }
    }, [id]);

    const handleBack = (data) => {
        navigate(-1);
    };

    return (
        <Grid container>
            <Grid item xs={12}>
                <TitleWrapper>
                    <Title>Partner Details</Title>
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
            {loading ? <PartnerSkeleton /> : <Typography>data</Typography>}
            <Grid item xs={12}></Grid>
        </Grid>
    );
}

export default React.memo(PartnerDetails);
