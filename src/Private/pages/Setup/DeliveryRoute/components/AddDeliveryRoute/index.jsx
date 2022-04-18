import * as React from "react";
import PropTypes from "prop-types";
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
import { Box } from "@mui/material";

import AccountForm from "./Form";
import actions from "./../../store/actions";
import PartnerActions from "./../../../Partner/store/actions";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialog-paper": {
        maxWidth: "90%",
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
    color: theme.palette.primary.main,
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

const filter = {
    page_number: 1,
    page_size: 100,
    agent_type: "SEND",
    country: "",
    sort_by: "name",
    order_by: "ASC",
};

function AddDeliveryRoute({ update_data, update }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [filterSchemaPay, setFilterSchemaPay] = React.useState({
        page_number: 1,
        page_size: 100,
        agent_type: "PAY",
        country: "",
        sort_by: "name",
        order_by: "ASC",
    });
    const { response: partner_sending } = useSelector(
        (state) => state.get_sending_partner
    );
    const { response: partner_payout } = useSelector(
        (state) => state.get_payout_partner
    );
    const { success: add_success, loading: add_loading } = useSelector(
        (state) => state.create_delivery_route
    );
    const { success: update_success, loading: update_loading } = useSelector(
        (state) => state.update_delivery_route
    );

    const memoizedData = React.useMemo(() => update_data, [update_data]);

    React.useEffect(() => {
        if (open) {
            dispatch(PartnerActions.get_sending_partner(filter));
        }
    }, [dispatch, open]);

    React.useEffect(() => {
        if (open && filterSchemaPay?.country) {
            dispatch(PartnerActions.get_payout_partner(filterSchemaPay));
        } else if (open && !filterSchemaPay?.country) {
            dispatch({ type: "GET_PAYOUT_PARTNER_RESET" });
        }
    }, [open, filterSchemaPay]);

    React.useEffect(() => {
        if (add_success || update_success) {
            setOpen(false);
        }
    }, [add_success, update_success]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        const updatedFilterPay = {
            ...filterSchemaPay,
            country: "",
        };
        setFilterSchemaPay(updatedFilterPay);
        setOpen(false);
    };

    const handleRouteSubmit = (data) => {
        dispatch(actions.create_delivery_route(data));
    };

    const handleRouteUpdate = (data) => {
        dispatch(actions.update_delivery_route(data.tid, data));
    };

    const handleAgent = React.useCallback(
        (country) => {
            const updatedFilterPay = {
                ...filterSchemaPay,
                country: country,
            };
            setFilterSchemaPay(updatedFilterPay);
        },
        [filterSchemaPay]
    );

    return (
        <div>
            {update ? (
                <Tooltip title="Edit Delivery Route" arrow>
                    <UpdateButton onClick={handleClickOpen}>
                        <EditOutlinedIcon
                            sx={{
                                fontSize: "20px",
                            }}
                        />
                    </UpdateButton>
                </Tooltip>
            ) : (
                <AddButton
                    size="small"
                    variant="outlined"
                    onClick={handleClickOpen}
                    endIcon={<AddIcon />}
                >
                    Add Delivery Route
                </AddButton>
            )}
            <BootstrapDialog
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle
                    id="customized-dialog-title"
                    onClose={handleClose}
                >
                    {update ? "Update" : "Create New"} Delivery Route
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {update ? (
                        <AccountForm
                            destroyOnUnmount
                            initialValues={{
                                tid: memoizedData?.tid,
                                send_agent_id: memoizedData?.send_agent_id,
                                payout_agent_id: memoizedData?.payout_agent_id,
                                payout_country: memoizedData?.payout_country,
                                payout_currency: memoizedData?.payout_currency,
                                payment_type: memoizedData?.payment_type,
                                is_active: memoizedData?.is_active,
                            }}
                            onSubmit={handleRouteUpdate}
                            buttonText="Update"
                            update={update}
                            payout_country={memoizedData?.payout_country}
                            loading={update_loading}
                            form={`update_delivery_route_form`}
                            handleClose={handleClose}
                            handleAgent={handleAgent}
                            partner_sending={partner_sending?.data || []}
                            partner_payout={partner_payout?.data || []}
                        />
                    ) : (
                        <AccountForm
                            update={update}
                            enableReinitialize={true}
                            onSubmit={handleRouteSubmit}
                            buttonText="Create"
                            form={`add_delivery_route_form`}
                            loading={add_loading}
                            handleAgent={handleAgent}
                            partner_sending={partner_sending?.data || []}
                            partner_payout={partner_payout?.data || []}
                            handleClose={handleClose}
                        />
                    )}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default React.memo(AddDeliveryRoute);
