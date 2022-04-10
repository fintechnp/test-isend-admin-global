import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
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

function AddPayoutLocation({ update_data, update }) {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [filterSchema, setFilterSchema] = React.useState({
        page_number: 1,
        page_size: 100,
        agent_type: "SEND",
        sort_by: "name",
        order_by: "ASC",
    });
    const { response: partner_data, loading: g_loading } = useSelector(
        (state) => state.get_all_partner
    );
    const { success: add_success, loading: add_loading } = useSelector(
        (state) => state.add_user
    );
    const { success: update_success, loading: update_loading } = useSelector(
        (state) => state.update_user
    );

    const memoizedData = React.useMemo(() => update_data, [update_data]);

    React.useEffect(() => {
        dispatch(PartnerActions.get_all_partner(filterSchema));
    }, [dispatch, filterSchema]);

    React.useEffect(() => {
        if (add_success || update_success) {
            setOpen(false);
        }
    }, [add_success, update_success]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMenuSubmit = (data) => {
        dispatch(actions.create_delivery_route(data));
    };

    const handleMenuUpdate = (data) => {
        dispatch(actions.update_delivery_route(data.menu_id, data));
    };

    return (
        <div>
            {update ? (
                <Tooltip title="Edit Payout Location" arrow>
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
                    Add Payout Location
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
                    {update ? "Update" : "Create New"} Payout Location
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {update ? (
                        <AccountForm
                            destroyOnUnmount
                            initialValues={{
                                menu_id: memoizedData?.menu_id,
                                name: memoizedData?.name,
                                menu_order: memoizedData?.menu_order,
                                is_active: memoizedData?.is_active,
                            }}
                            onSubmit={handleMenuUpdate}
                            buttonText="Update"
                            update={update}
                            partnerList={partner_data?.data || []}
                            user_type={update_data?.user_type}
                            loading={update_loading}
                            form={`update_delivery_route_form`}
                            handleClose={handleClose}
                        />
                    ) : (
                        <AccountForm
                            update={update}
                            enableReinitialize={true}
                            onSubmit={handleMenuSubmit}
                            buttonText="Create"
                            partnerList={partner_data?.data || []}
                            form={`add_delivery_route_form`}
                            initialValues={{ is_active: false }}
                            loading={add_loading}
                            handleClose={handleClose}
                        />
                    )}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
}

export default React.memo(AddPayoutLocation);
