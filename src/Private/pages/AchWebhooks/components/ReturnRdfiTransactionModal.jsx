import * as Yup from "yup";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Row from "App/components/Row/Row";

import Modal from "App/components/Modal/Modal";
import HookForm from "App/core/hook-form/HookForm";
import SubmitButton from "App/components/Button/SubmitButton";
import CancelButton from "App/components/Button/CancelButton";
import FormDatePicker from "App/core/hook-form/FormDatePicker";
import FormReferenceDataAutoComplete from "App/core/hook-form/FormReferenceDataAutoComplete";

import isEmpty from "App/helpers/isEmpty";
import { achWebhookActions } from "../store";
import referenceTypeId from "Private/config/referenceTypeId";
import useReactHookForm from "App/core/hook-form/useReactHookForm";
import { yupResolver } from "@hookform/resolvers/yup";
import { dateOfDeathRequiredForReturnReasonCode } from "../data/returnReasonCode";

const schema = Yup.object().shape({
    returnReasonCode: Yup.string().required("Required"),
});

export default function ReturnRdfiTransactionModal({ transactionId, onReturnSuccess, onClose }) {
    const dispatch = useDispatch();

    const {
        loading: isReturning,
        success: isSuccess,
        error,
    } = useSelector((state) => state.return_ach_rdfi_transaction);

    const methods = useReactHookForm({
        resolver: yupResolver(schema),
    });

    const { reset, setValue, watch } = methods;

    const returnReasonCode = watch("returnReasonCode");

    const handleSubmit = (data) => {
        dispatch(achWebhookActions.return_ach_rdfi_transaction(transactionId, data));
    };

    const handleClose = () => {
        dispatch(achWebhookActions.return_ach_rdfi_transaction_reset());
        onClose?.();
    };

    useEffect(() => {
        if (isSuccess) {
            reset();
            setValue("dateOfDeath", null);
            dispatch(achWebhookActions.return_ach_rdfi_transaction_reset());
            onReturnSuccess?.();
        }
    }, [isSuccess]);

    useEffect(() => {
        if (!dateOfDeathRequiredForReturnReasonCode.includes(returnReasonCode)) {
            setValue("dateOfDeath", null);
        }
    }, [returnReasonCode]);

    return (
        <Modal
            title="Return RDFI Transaction"
            open={!isEmpty(transactionId)}
            sx={{ maxWidth: "600px", minWidth: "600px" }}
        >
            <HookForm {...methods} onSubmit={methods.handleSubmit(handleSubmit)}>
                <Grid container spacing={2}>
                    {error && (
                        <Grid item xs={12}>
                            <Alert severity="error">{error?.message ?? "Failed"}</Alert>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FormReferenceDataAutoComplete
                            name="returnReasonCode"
                            label="Return Reason"
                            valueKey="value"
                            referenceTypeId={referenceTypeId.rdfiReturnCodes}
                        />
                    </Grid>
                    {dateOfDeathRequiredForReturnReasonCode.includes(returnReasonCode) && (
                        <Grid item xs={12}>
                            <FormDatePicker name="dateOfDeath" label="Date of Death" disableFuture />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <Row gap={2} justifyContent="flex-end">
                            <CancelButton onClick={handleClose} disabled={isReturning} />
                            <SubmitButton isLoading={isReturning} />
                        </Row>
                    </Grid>
                </Grid>
            </HookForm>
        </Modal>
    );
}

ReturnRdfiTransactionModal.propTypes = {
    transactionId: PropTypes.string,
    onReturnSuccess: PropTypes.string,
};
