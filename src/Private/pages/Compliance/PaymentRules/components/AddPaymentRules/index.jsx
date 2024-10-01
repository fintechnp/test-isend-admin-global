import * as React from "react";
import PropTypes from "prop-types";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import AddTaskIcon from "@mui/icons-material/AddTask";

import AccountForm from "./Form";
import actions from "./../../store/actions";
import PartnerActions from "./../../../../Setup/Partner/store/actions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-container": {
        backdropFilter: "blur(3px)",
    },
    "& .MuiDialog-paper": {
        maxWidth: "90%",
        backgroundColor: theme.palette.background.dark,
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));

const UpdateButton = styled(IconButton)(({ theme }) => ({
    opacity: 0.7,
    padding: "3px",
    color: "border.main",
    "&: hover": { color: "border.dark", opacity: 1 },
}));

const AddButton = styled(Button)(({ theme }) => ({
    padding: "6px 12px",
    textTransform: "capitalize",

    borderColor: theme.palette.border.main,
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
    padding: "4px",
    position: "absolute",
    right: "15px",
    top: "15px",
    color: theme.palette.grey[500],
    borderRadius: "3px",
}));

const HeaderIcon = styled(AddTaskIcon)(({ theme }) => ({
    color: theme.palette.border.main,
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle
            sx={{
                m: 0,
                p: 1.8,
                pl: 2.5,
                display: "flex",
                alignItems: "center",
            }}
            {...other}
        >
            {" "}
            <Box
                sx={{
                    pr: 1.5,
                    pl: 0.5,
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <HeaderIcon />
            </Box>
            {children}
            {onClose ? (
                <CloseButton aria-label="close" onClick={onClose}>
                    <CloseIcon />
                </CloseButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const stateSend = {
    page_number: 1,
    page_size: 100,
    agent_type: "SEND",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

const statePay = {
    page_number: 1,
    page_size: 100,
    agent_type: "PAY",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

function AddUpdatePaymentRules({ update_data, update }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [filterSend, setFilterSend] = React.useState(stateSend);
    const [filterPay, setFilterPay] = React.useState(statePay);
    const { success: add_success, loading: add_loading } = useSelector((state) => state.add_payment_rules);
    const { success: update_success, loading: update_loading } = useSelector((state) => state.update_payment_rules);
    const { response: partner_sending } = useSelector((state) => state.get_sending_partner);
    const { response: partner_payout } = useSelector((state) => state.get_payout_partner);

    const memoizedData = React.useMemo(() => update_data, [update_data]);

    React.useEffect(() => {
        if (add_success || update_success) {
            setOpen(false);
        }
    }, [add_success, update_success]);

    React.useEffect(() => {
        if (filterPay?.country) {
            dispatch(PartnerActions.get_payout_partner(filterPay));
        }
    }, [dispatch, filterPay]);

    React.useEffect(() => {
        if (filterSend?.country) {
            dispatch(PartnerActions.get_sending_partner(filterSend));
        }
    }, [dispatch, filterSend]);

    const handleClickOpen = () => {
        dispatch({ type: "GET_PAYOUT_PARTNER_RESET" });
        dispatch({ type: "GET_SENDING_PARTNER_RESET" });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSendPartner = (e) => {
        const country = e.target.value;
        const updatedFilterSchema = {
            ...filterSend,
            country: country,
        };
        setFilterSend(updatedFilterSchema);
    };

    const handlePayoutPartner = (e) => {
        const country = e.target.value;
        const updatedFilterSchema = {
            ...filterPay,
            country: country,
        };
        setFilterPay(updatedFilterSchema);
    };

    const handlePaymentRulesSubmit = (data) => {
        dispatch(actions.add_payment_rules(data));
    };

    const handlePaymentRulesUpdate = (data) => {
        dispatch(actions.update_payemnt_rules(data.rules_id, data));
    };

    return (
        <div>
            {update ? (
                <Tooltip title="Edit Payment Rules" arrow>
                    <UpdateButton onClick={handleClickOpen}>
                        <EditOutlinedIcon
                            sx={{
                                fontSize: "20px",
                                "&:hover": {
                                    background: "transparent",
                                },
                            }}
                        />
                    </UpdateButton>
                </Tooltip>
            ) : (
                <AddButton size="small" variant="outlined" onClick={handleClickOpen} endIcon={<AddIcon />}>
                    Add Payment Rules
                </AddButton>
            )}
            <BootstrapDialog
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {update ? "Update" : "Create New"} Payment Rules
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {update ? (
                        <AccountForm
                            destroyOnUnmount
                            initialValues={{
                                rules_id: memoizedData?.tid,
                                rule_name: memoizedData?.rule_name,
                                send_agent_id: memoizedData?.send_agent_id,
                                send_country: memoizedData?.send_country,
                                send_currency: memoizedData?.send_currency,
                                payout_agent_id: memoizedData?.payout_agent_id,
                                payout_country: memoizedData?.payout_country,
                                no_of_days: memoizedData?.no_of_days,
                                no_of_transactions: memoizedData?.no_of_transactions,
                                amount: memoizedData?.amount,
                                compliance_action: memoizedData?.compliance_action,
                                is_active: memoizedData?.is_active,
                            }}
                            onSubmit={handlePaymentRulesUpdate}
                            buttonText="Update"
                            update={update}
                            loading={update_loading}
                            form={`update_payment_rules_form`}
                            handleClose={handleClose}
                            handleSendPartner={handleSendPartner}
                            handlePayoutPartner={handlePayoutPartner}
                            partner_sending={partner_sending?.data || []}
                            partner_payout={partner_payout?.data || []}
                        />
                    ) : (
                        <AccountForm
                            update={update}
                            enableReinitialize={true}
                            onSubmit={handlePaymentRulesSubmit}
                            buttonText="Create"
                            form={`add_payment_rules_form`}
                            loading={add_loading}
                            handleClose={handleClose}
                            handleSendPartner={handleSendPartner}
                            handlePayoutPartner={handlePayoutPartner}
                            partner_sending={partner_sending?.data || []}
                            partner_payout={partner_payout?.data || []}
                        />
                    )}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default AddUpdatePaymentRules;
