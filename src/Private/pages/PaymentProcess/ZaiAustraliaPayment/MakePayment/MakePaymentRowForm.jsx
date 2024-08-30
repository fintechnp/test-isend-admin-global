import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import isEmpty from "App/helpers/isEmpty";
import SubmitButton from "App/components/Button/SubmitButton";

import actions from "../../store/actions";
import { makePaymentSchema } from "../schema/makePaymentSchema";

export default function MakePaymentRowForm({ row, onMakePaymentSuccess, transactionId }) {
    const dispatch = useDispatch();

    const { loading, success, webhookId } = useSelector((state) => state.make_payment);

    const [formData, setFormData] = useState({
        transactionId: transactionId,
        webhookId: row.webhook_id,
        paymentAmount: null,
        remarks: null,
    });

    const [errors, setErrors] = useState({
        paymentAmount: "",
        remarks: "",
    });

    const clearErrors = (name) => {
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const handleMakePaymentClick = async () => {
        try {
            await makePaymentSchema.validate(formData, { abortEarly: false });
            dispatch(actions.make_payment(formData));
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
            onMakePaymentSuccess?.();
            dispatch(actions.make_payment_reset());
        }
    }, [success]);

    return (
        <TableRow key={row.f_serial_no}>
            <TableCell>{row.f_serial_no}</TableCell>
            <TableCell width={300}>
                <Typography>Name: &nbsp; {!isEmpty(row.debtor_name) ? row.debtor_name : "N/A"} </Typography>
                <Typography fontWeight={500}>Account Details </Typography>
                <Typography>
                    BSB: &nbsp; {!isEmpty(row.zai_routing_number) ? row.zai_routing_number : "N/A"}{" "}
                </Typography>
                <Typography>
                    Account Number: &nbsp;
                    {!isEmpty(row.zai_account_number) ? row.zai_account_number : "N/A"}
                </Typography>
                <Typography>
                    Amount: &nbsp; {row.transaction_currency} &nbsp;
                    {!isEmpty(row.transaction_amount) ? row.transaction_amount : "N/A"}
                </Typography>
            </TableCell>
            <TableCell>{row.webhook_id}</TableCell>
            <TableCell>{row.transaction_id}</TableCell>
            <TableCell align="right">{row.transaction_amount.toLocaleString()} </TableCell>
            <TableCell>{row.transaction_currency}</TableCell>
            <TableCell>{!isEmpty(row.debtor_name) ? row.debtor_name : "N/A"}</TableCell>
            <TableCell>
                <TextField
                    type="text"
                    inputMode="numeric"
                    name="paymentAmount"
                    size="small"
                    placeholder="Enter amount"
                    onChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    helperText={errors?.paymentAmount}
                    error={!!errors?.paymentAmount}
                    onFocus={() => clearErrors("paymentAmount")}
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
                    submitText="Pay"
                    submittingText="Processing"
                />
            </TableCell>
        </TableRow>
    );
}
