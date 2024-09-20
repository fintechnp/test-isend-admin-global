import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Tooltip from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import AccountForm from "./Form";
import Modal from "App/components/Modal/Modal";

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

function AddPartnerBank({ update_data, update, handleCloseDialog, enablePopoverAction }) {
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
    const { response: partner_payout } = useSelector((state) => state.get_payout_partner);
    const { success: add_success, loading: add_loading } = useSelector((state) => state.create_partner_bank);
    const { success: update_success, loading: update_loading } = useSelector((state) => state.update_partner_bank);

    const memoizedData = React.useMemo(() => update_data, [update_data]);

    React.useEffect(() => {
        if (open && filterSchema?.country) {
            dispatch(PartnerActions.get_payout_partner(filterSchema));
        } else if (open && !filterSchema?.country) {
            dispatch({ type: "GET_PAYOUT_PARTNER_RESET" });
        }
    }, [dispatch, open, filterSchema]);

    React.useEffect(() => {
        if (add_success || update_success) {
            const updatedFilter = {
                ...filterSchema,
                country: "",
            };
            setFilterSchema(updatedFilter);
            setOpen(false);
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
        handleCloseDialog();
    };

    const handlePartnerBankSubmit = (data) => {
        dispatch(actions.create_partner_bank(data));
    };

    const handlePartnerBankUpdate = (data) => {
        dispatch(actions.update_partner_bank(data.tid, data));
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
                    <Tooltip title="Edit Partner Bank" arrow>
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
                    Add Partner Bank
                </AddButton>
            )}
            <Modal onClose={handleClose} open={open} title={update ? "Update Partner Bank" : "Create New Partner Bank"}>
                {update ? (
                    <AccountForm
                        destroyOnUnmount
                        initialValues={{
                            tid: memoizedData?.tid,
                            bank_name: memoizedData?.bank_name,
                            country: memoizedData?.country,
                            currency: memoizedData?.currency,
                            agent_id: memoizedData?.agent_id,
                            payment_type: memoizedData?.payment_type,
                            external_bank_code: memoizedData?.external_bank_code,
                            external_bank_code1: memoizedData?.external_bank_code1,
                            external_bank_code2: memoizedData?.external_bank_code2,
                            payout_location_id: memoizedData?.payout_location_id,
                        }}
                        onSubmit={handlePartnerBankUpdate}
                        buttonText="Update"
                        payout_country={memoizedData?.country}
                        update={update}
                        loading={update_loading}
                        form={`update_partner_bank_form`}
                        partner_payout={partner_payout?.data || []}
                        handleClose={handleClose}
                        handleAgent={handleAgent}
                    />
                ) : (
                    <AccountForm
                        update={update}
                        enableReinitialize={true}
                        onSubmit={handlePartnerBankSubmit}
                        buttonText="Create"
                        form={`add_partner_bank_form`}
                        loading={add_loading}
                        partner_payout={partner_payout?.data || []}
                        handleClose={handleClose}
                        handleAgent={handleAgent}
                    />
                )}
            </Modal>
        </div>
    );
}

export default React.memo(AddPartnerBank);
