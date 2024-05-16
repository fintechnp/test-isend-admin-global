import * as React from "react";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";

import MakePaymentFrom from "./Form";
import actions from "../../store/actions";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { makePaymentSchema } from "../schema/createUserSchema";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MakePayment({ isOpen, onClose, transactionRefNo }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const methods = useForm({
        resolver: yupResolver(makePaymentSchema),
    });

    React.useEffect(() => {
        methods.setValue("transactionRefNo", transactionRefNo);
    }, [transactionRefNo]);

    const { reset } = methods;

    const { success: add_success, loading: add_loading } = useSelector((state) => state.make_payment);

    React.useEffect(() => {
        if (add_success) {
            dispatch({
                type: "MAKE_PAYMENT_RESET",
            });
            reset({
                amount: "",
                remarks: "",
            });

            onClose();
        }
    }, [add_success]);

    const handlePayment = (data) => {
        dispatch(actions.make_payment(data));
    };

    return (
        <div>
            <Modal
                onClose={onClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                title="Create Payment"
            >
                <MakePaymentFrom
                    onSubmit={handlePayment}
                    method={methods}
                    loading={add_loading}
                    handleClose={onClose}
                    transactionRefNo={transactionRefNo}
                />
            </Modal>
        </div>
    );
}

export default React.memo(MakePayment);
