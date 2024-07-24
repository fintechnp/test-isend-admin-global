import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

import actions from "./../store/actions";
import Details from "./Details";
import Loader from "App/components/Loader/Loader";

const Title = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: "18px",
    fontWeight: 600,
    paddingLeft: "8px",
}));

function TransactionDetails(props) {
    const { id, tid } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [params] = useSearchParams();

    const { response, loading } = useSelector((state) => state.get_transaction_details);

    const { response: aml_response, loading: aml_loading } = useSelector((state) => state.get_aml_suspicious_details);

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
                <title>
                    {import.meta.env.REACT_APP_NAME} | {props.title}
                </title>
            </Helmet>
            <Box sx={{ pb: "24px" }}>
                {loading || aml_loading ? (
                    <Loader />
                ) : id ? (
                    <Details data={response?.data || []} />
                ) : (
                    <Details isAML={true} data={aml_response?.data || []} />
                )}
            </Box>
        </>
    );
}

export default TransactionDetails;
