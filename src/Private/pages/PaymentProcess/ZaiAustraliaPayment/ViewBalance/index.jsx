import * as React from "react";
import Slide from "@mui/material/Slide";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";

import View from "./View";
import actions from "../../store/actions";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function ViewBalance({ isOpen, customerId, onClose }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);

    const { response: BalanceData, loading: get_loading } = useSelector((state) => state.get_balance_details);

    React.useEffect(() => {
        if (customerId && isOpen) {
            dispatch(actions.get_balance_details(customerId));
        }
    }, [customerId, isOpen]);

    React.useEffect(() => {
        if (BalanceData && BalanceData.customerId === customerId) {
        }
    }, [BalanceData, customerId]);

    return (
        <div>
            <Modal
                onClose={onClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={isOpen}
                title="BALANCE CHECK"
                sx={{ alignItems: "center" }}
            >
                <View loading={get_loading} data={BalanceData?.data || []} />
            </Modal>
        </div>
    );
}

export default React.memo(ViewBalance);
