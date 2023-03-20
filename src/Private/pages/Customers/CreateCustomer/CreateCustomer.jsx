import React, { useEffect } from "react";

import { reset } from "redux-form";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Helmet } from "react-helmet-async";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";

import actions from "./store/actions";
import CustomerForm from "./components/Form";
import PageContent from "App/components/Container/PageContent";

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

function AddUpdateCustomer(props) {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { response, loading } = useSelector((state) => state.get_customer_byid);

    useEffect(() => {
        if (id) {
            dispatch(actions.get_customer_byid(id));
        }
    }, [id]);

    useEffect(() => {
        dispatch(reset("add_customer_form"));
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <PageContent
            documentTitle="Edit Customer"
            title={
                <>
                    <PersonAddAltOutlinedIcon />
                    <Typography>{id ? "Edit" : "Add"} Customer </Typography>
                </>
            }
        >
            <Container container>
                <Grid item xs={12}>
                    <TitleWrapper>
                        <Box sx={{ display: "flex", alignItems: "flex-end" }}></Box>
                    </TitleWrapper>
                </Grid>
                <Grid item xs={12}>
                    <Divider sx={{ mb: 1.2, pt: 0.5 }} />
                </Grid>
                <Grid item xs={12}>
                    <CustomerForm update_data={response?.data || []} loading={loading} />
                </Grid>
            </Container>
        </PageContent>
    );
}

export default React.memo(AddUpdateCustomer);
