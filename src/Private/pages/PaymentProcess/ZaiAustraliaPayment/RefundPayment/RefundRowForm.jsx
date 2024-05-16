import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SubmitButton from "App/components/Button/SubmitButton";

import { RefundPaymentSchema } from "../schema/createUserSchema";
import actions from "../../store/actions";

export default function RefundRowForm({ row }) {
    const dispatch = useDispatch();

    const { loading, success, webhookId } = useSelector((state) => state.refund_payment);

    const [formData, setFormData] = useState({
        webhookId: row.webhook_id,
        amount: null,
        remarks: null,
    });

    const [errors, setErrors] = useState({
        amount: "",
        remarks: "",
    });

    const clearErrors = (name) => {
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleMakePaymentClick = async () => {
        try {
            await RefundPaymentSchema.validate(formData, { abortEarly: false });
            dispatch(actions.refund_payment(formData));
        } catch (err) {
            const validationErrors = {};
            err.inner.forEach((error) => {
                if (error.path !== undefined) {
                    validationErrors[error.path] = error.errors[0];
                }
            });
            setErrors(validationErrors);
        }
    };

    useEffect(() => {
        if (success) {
            onSuccessfulRefund?.();
            dispatch(actions.refund_payment_reset());
        }
    }, [success]);

    return (
        <TableRow key={row.f_serial_no}>
            <TableCell>{row.f_serial_no}</TableCell>
            <TableCell>{row.webhook_id}</TableCell>
            <TableCell>
                {row.transaction_currency} {row.transaction_amount.toLocaleString()}
            </TableCell>
            <TableCell>
                <TextField
                    type="text"
                    inputMode="numeric"
                    name="amount"
                    size="small"
                    placeholder="Enter amount"
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    helperText={errors?.amount}
                    error={!!errors?.amount}
                    onFocus={() => clearErrors("amount")}
                />
            </TableCell>
            <TableCell>
                <TextField
                    name="remarks"
                    size="small"
                    placeholder="Enter remarks"
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    error={!!errors?.remarks}
                    helperText={errors?.remarks}
                    onFocus={() => clearErrors("remarks")}
                />
            </TableCell>
            <TableCell>
                <SubmitButton
                    type="button"
                    variant="contained"
                    size="small"
                    onClick={handleMakePaymentClick}
                    isLoading={loading && webhookId === row.webhook_id}
                    disabled={loading && webhookId !== row.webhook_id}
                    submitText="Refund"
                    submittingText="Refunding"
                />
            </TableCell>
        </TableRow>
    );
}
