import * as Yup from "yup";
import PropTypes from "prop-types";
import Grid from "@mui/material/Grid";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";

import Row from "App/components/Row/Row";
import Modal from "App/components/Modal/Modal";
import HookForm from "App/core/hook-form/HookForm";
import FormSelect from "App/core/hook-form/FormSelect";
import FormTextArea from "App/core/hook-form/FormTextArea";
import SubmitButton from "App/components/Button/SubmitButton";

import { stakeholderActions } from "../store";
import { individualStakeholderStatusOptions } from "../data/stakeholderStatus";
import CancelButton from "App/components/Button/CancelButton";

const schema = Yup.object().shape({
    status: Yup.string().required(),
    remarks: Yup.string().required(),
});

export default function ChangeIndividualStakeholderStatusModal({
    open,
    onClose,
    stakeholderId,
    onSuccess,
    currentStatusId,
}) {
    const { loading: isLoading, success: isSuccess } = useSelector(
        (state) => state.change_individual_stakeholder_status,
    );

    const dispatch = useDispatch();

    const handleSubmit = (data) => {
        dispatch(stakeholderActions.change_individual_stakeholder_status(stakeholderId, data));
    };

    const methods = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        if (open) methods.reset();
    }, []);

    useEffect(() => {
        if (isSuccess) {
            methods.reset();
            dispatch(stakeholderActions.change_individual_stakeholder_status_reset());
            onSuccess?.();
            onClose?.();
        }
    }, [isSuccess]);

    const statusOptions = individualStakeholderStatusOptions.filter(
        (option) => Number(option.value) !== Number(currentStatusId),
    );

    return (
        <Modal
            open={open}
            onClose={isLoading ? null : onClose}
            title="Change Individual Stakeholder Status"
            sx={{
                minWidth: "600px",
            }}
        >
            <HookForm onSubmit={handleSubmit} {...methods}>
                <Grid container item xs={12} spacing={2}>
                    <Grid item xs={12}>
                        <FormSelect name="status" label="Status" options={statusOptions} />
                    </Grid>
                    <Grid item xs={12}>
                        <FormTextArea name="remarks" label="Remarks" multiline />
                    </Grid>
                    <Grid item xs={12}>
                        <Row justifyContent="flex-end" gap={2}>
                            <CancelButton onClick={onClose} disabled={isLoading} />
                            <SubmitButton isLoading={isLoading} />
                        </Row>
                    </Grid>
                </Grid>
            </HookForm>
        </Modal>
    );
}

ChangeIndividualStakeholderStatusModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    stakeholderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onSuccess: PropTypes.func.isRequired,
    currentStatusId: PropTypes.number.isRequired,
};
