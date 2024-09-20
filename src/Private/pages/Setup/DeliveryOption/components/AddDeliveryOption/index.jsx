import * as React from "react";
import PropTypes from "prop-types";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import { Box, ListItemButton } from "@mui/material";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useDispatch, useSelector } from "react-redux";
import DialogContent from "@mui/material/DialogContent";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import AccountForm from "./Form";
import actions from "./../../store/actions";
import PartnerActions from "./../../../Partner/store/actions";
import DeliveryOptionForm from "./Form";
import Modal from "App/components/Modal/Modal";

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

function AddDeliveryOption({ update_data, update, enablePopoverAction }) {
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
    const { response: partner_data } = useSelector((state) => state.get_payout_partner);

    const { success: add_success, loading: add_loading } = useSelector((state) => state.add_delivery_option);
    const { success: update_success, loading: update_loading } = useSelector((state) => state.update_delivery_option);

    const memoizedData = React.useMemo(() => update_data, [update_data]);

    React.useEffect(() => {
        if (open && filterSchema?.country) {
            dispatch(PartnerActions.get_payout_partner(filterSchema));
        } else if (open && !filterSchema?.country) {
            dispatch({ type: "GET_PAYOUT_PARTNER_RESET" });
        }
    }, [open, filterSchema]);

    React.useEffect(() => {
        if (add_success || update_success) {
            setOpen(false);
            dispatch({ type: "ADD_DELIVERY_OPTION_RESET" });
            dispatch({ type: "UPDATE_DELIVERY_OPTION_RESET" });
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

    const handleDeliveryOptionSubmit = (data) => {
        dispatch(actions.add_delivery_option(data));
    };

    const handleDeliveryOptionUpdate = (data) => {
        dispatch(actions.update_delivery_option(update_data?.tid, data));
    };

    const handleAgent = React.useCallback(
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
                enablePopoverAction ? (
                    <ListItemButton onClick={handleClickOpen}>Edit</ListItemButton>
                ) : (
                    <Tooltip title="Edit Delivery Option" arrow>
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
                )
            ) : (
                <AddButton
                    size="medium"
                    variant="contained"
                    onClick={handleClickOpen}
                    endIcon={<AddCircleOutlineIcon />}
                >
                    Add Delivery Option
                </AddButton>
            )}
            <Modal
                onClose={handleClose}
                TransitionComponent={Transition}
                open={open}
                title={update ? "Update Delivery Option" : "Create Delivery Option"}
            >
                {update ? (
                    <DeliveryOptionForm
                        partnerList={partner_data?.data || []}
                        initialValues={{
                            payout_agent_id: memoizedData?.payout_agent_id,
                            delivery_name: memoizedData?.delivery_name,
                            payment_type: memoizedData?.payment_type,
                            country_code: memoizedData?.country_code,
                            currency_code: memoizedData?.currency_code,
                            is_active: memoizedData?.is_active,
                        }}
                        buttonText="Update"
                        update={update}
                        payout_country={memoizedData?.country_code}
                        user_type={update_data?.user_type}
                        loading={update_loading}
                        handleAgent={handleAgent}
                        handleClose={handleClose}
                        onSubmit={handleDeliveryOptionUpdate}
                    />
                ) : (
                    <DeliveryOptionForm
                        partnerList={partner_data?.data || []}
                        update={update}
                        payout_country={memoizedData?.country_code}
                        loading={add_loading}
                        buttonText="Create"
                        handleClose={handleClose}
                        handleAgent={handleAgent}
                        onSubmit={handleDeliveryOptionSubmit}
                    />
                )}
            </Modal>
        </div>
    );
}

export default React.memo(AddDeliveryOption);
