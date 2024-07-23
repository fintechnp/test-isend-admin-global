import * as yup from "yup";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import HookForm from "App/core/hook-form/HookForm";
import FormTextField from "App/core/hook-form/FormTextField";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import SubmitButton from "App/components/Button/SubmitButton";

import actions from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

const sendMailSchema = yup.object().shape({
    email: yup.string().email().required(),
});

export default function SendMail({ id, onClose }) {
    const dispatch = useDispatch();
    const methods = useForm({
        resolver: yupResolver(sendMailSchema),
    });

    const { loading, success } = useSelector((state) => state.send_mail_transaction);

    useEffect(() => {
        if (success) {
            dispatch({
                type: "SEND_MAIL_TRANSACTION_RESET",
            });
            onClose();
        }
    }, [success]);

    const handleSubmit = (data) => {
        const requestPayload = {
            transactionId: id,
            ...data,
        };
        dispatch(actions.send_mail_transaction(requestPayload));
    };
    return (
        <HookForm onSubmit={methods.handleSubmit(handleSubmit)} {...methods}>
            <Grid container>
                <Grid item xs={12}>
                    <FormTextField name="email" label="Email" />
                </Grid>
                <Grid item xs={12} mt={2}>
                    <ButtonWrapper
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        columnSpacing={2}
                    >
                        <Grid item>
                            <SubmitButton disabled={loading} size="medium" variant="outlined" type="submit">
                                Send
                            </SubmitButton>
                        </Grid>
                    </ButtonWrapper>
                </Grid>
            </Grid>
        </HookForm>
    );
}
