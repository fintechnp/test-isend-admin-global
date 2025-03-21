import * as React from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import AddTaskIcon from "@mui/icons-material/AddTask";

import PromoSetupForm from "./Form";
import actions from "./../../store/actions";
import PartnerActions from "./../../../Partner/store/actions";

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

const sendState = {
    page_number: 1,
    page_size: 100,
    agent_type: "SEND",
    country: "",
    sort_by: "name",
    order_by: "DESC",
};

function AddPromoSetup({ update_data, update }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [filterSchema, setFilterSchema] = React.useState({
        page_number: 1,
        page_size: 100,
        agent_type: "PAY",
        country: "",
        sort_by: "name",
        order_by: "DESC",
    });
    const { response: PartnerSend } = useSelector((state) => state.get_sending_partner);
    const { response: PartnerPayout } = useSelector((state) => state.get_payout_partner);
    const { success: add_success, loading: add_loading } = useSelector((state) => state.add_promo_setup);
    const { success: update_success, loading: update_loading } = useSelector((state) => state.update_promo_setup);

    const memoizedData = React.useMemo(() => update_data, [update_data]);

    React.useEffect(() => {
        if (open) {
            dispatch(PartnerActions.get_sending_partner(sendState));
        }
    }, [dispatch, open]);

    React.useEffect(() => {
        if (filterSchema?.country) {
            dispatch(PartnerActions.get_payout_partner(filterSchema));
        } else {
            dispatch({ type: "GET_PAYOUT_PARTNER_RESET" });
        }
    }, [filterSchema]);

    React.useEffect(() => {
        if (add_success || update_success) {
            setOpen(false);
            dispatch({ type: "ADD_PROMO_SETUP_RESET" });
            dispatch({ type: "UPDATE_PROMO_SETUP_RESET" });
        }
    }, [add_success, update_success]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        const updatedFilter = {
            ...filterSchema,
            country: "",
        };
        setFilterSchema(updatedFilter);
        setOpen(false);
    };

    const handlePromoSubmit = (data) => {
        dispatch(actions.add_promo_setup(data));
    };

    const handleUpdate = (data) => {
        dispatch(actions.update_promo_setup(update_data?.tid, data));
    };

    const handlePayoutPartner = React.useCallback(
        (country) => {
            const updatedFilter = {
                ...filterSchema,
                country: country,
            };
            setFilterSchema(updatedFilter);
        },
        [filterSchema],
    );

    return (
        <div>
            {update ? (
                <Tooltip title="Edit Promo Setup" arrow>
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
                    Add Promo Setup
                </AddButton>
            )}
            <BootstrapDialog
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {update ? "Update" : "Create"} Promo Setup
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {update ? (
                        <PromoSetupForm
                            destroyOnUnmount
                            initialValues={{
                                sending_agent_id: memoizedData?.sending_agent_id,
                                payout_agent_id: memoizedData?.payout_agent_id,
                                name: memoizedData?.name,
                                payment_type: memoizedData?.payment_type,
                                payout_country: memoizedData?.payout_country,
                                payout_currency: memoizedData?.payout_currency,
                                fee_discount: memoizedData?.fee_discount,
                                premium_rate: memoizedData?.premium_rate,
                                is_active: memoizedData?.is_active,
                            }}
                            onSubmit={handleUpdate}
                            buttonText="Update"
                            update={update}
                            payout_country={memoizedData?.payout_country}
                            PartnerSend={PartnerSend?.data || []}
                            partnerPayout={PartnerPayout?.data || []}
                            loading={update_loading}
                            form={`update_promo_setup_form`}
                            handleClose={handleClose}
                            handleAgent={handlePayoutPartner}
                        />
                    ) : (
                        <PromoSetupForm
                            update={update}
                            enableReinitialize={true}
                            onSubmit={handlePromoSubmit}
                            buttonText="Create"
                            form={`add_promo_setup_form`}
                            PartnerSend={PartnerSend?.data || []}
                            partnerPayout={PartnerPayout?.data || []}
                            loading={add_loading}
                            handleClose={handleClose}
                            handleAgent={handlePayoutPartner}
                        />
                    )}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default React.memo(AddPromoSetup);
