import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ContactPageIcon from "@mui/icons-material/ContactPage";

import actions from "./../store/actions";
import PartnerSkeleton from "./Skeleton";
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

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <Grid container sx={{ pb: "24px" }}>
            <Grid item xs={12}>
                <TitleWrapper>
                    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                        <ContactPageIcon
                            sx={{ color: "primary.main", fontSize: "28px" }}
                        />
                        <Title> Partner Details </Title>
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
            {loading ? <PartnerSkeleton /> : <Details data={response?.data} />}
        </Grid>
    );
}

export default React.memo(PartnerDetails);
