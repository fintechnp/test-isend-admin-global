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
import actions from "../../store/actions";

// import LanguageOptionForm from "./Form";
import { useState, useEffect } from "react";
import LanguageCountryForm from "./Form";

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
    color: theme.palette.secondary.contrastText,
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

const AddLanguageCountry = ({ update, loading, update_data }) => {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);

    const { success: addLanguageCountrySuccess, loading: addLanguageCountryLoading } = useSelector(
        (state) => state.add_language_country,
    );
    const { success: updateLanguageCountrySuccess, loading: updateLanguageCountryLoading } = useSelector(
        (state) => state.update_language_country,
    );
    const { success: deleteLanguageCountrySuccess, loading: deleteLanguageCountryLoading } = useSelector(
        (state) => state.delete_language_country,
    );

    useEffect(() => {
        if (addLanguageCountrySuccess || updateLanguageCountrySuccess) {
            setOpen(false);
            dispatch({ type: actions.ADD_LANGUAGE_COUNTRY_RESET });
            dispatch({ type: actions.UPDATE_LANGUAGE_COUNTRY_RESET });
            // dispatch(actions.get_all_language_country());
        }
    }, [
        addLanguageCountrySuccess,
        updateLanguageCountrySuccess,
        deleteLanguageCountrySuccess,
        // updateLanguageCountryStatusSuccess,
    ]);

    // const [filterSchema, setFilterSchema] = useState({
    //     language_code: "",
    //     language_name: "",
    // });

    const memoizedData = React.useMemo(() => update_data, [update_data]);

    const handleLanguageOptionSubmit = (data) => {
        dispatch(actions.add_language_country(data));
    };

    const handleLanguageOptionUpdate = (data) => {
        const status = {
            is_active: data.is_active,
        };
        const updatedData = {
            country: data.country,
            language_code: data.language_code,
        };
        dispatch(actions.update_language_country(update_data?.language_country_id, updatedData));
        dispatch(actions.update_language_country_status(update_data?.language_country_id, status));
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        // const updatedFilter = {
        //     ...filterSchema,
        //     country: "",
        // };
        // setFilterSchema(updatedFilter);
        setOpen(false);
    };
    return (
        <div>
            {update ? (
                <Tooltip title="Edit Language Option" arrow>
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
                    Add Language Country
                </AddButton>
            )}
            <BootstrapDialog
                onClose={handleClose}
                TransitionComponent={Transition}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {update ? "Update" : "Create New"} Language Country
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    {update ? (
                        <LanguageCountryForm
                            update={true}
                            onSubmit={handleLanguageOptionUpdate}
                            buttonText="Update"
                            handleClose={handleClose}
                            initialValues={{
                                language_code: memoizedData?.language_code,
                                country: memoizedData?.country,
                                is_active: memoizedData?.is_active,
                            }}
                        />
                    ) : (
                        <LanguageCountryForm
                            onSubmit={handleLanguageOptionSubmit}
                            buttonText="Create"
                            // loading={loading}
                            handleClose={handleClose}
                            update={false}
                        />
                    )}
                </DialogContent>
            </BootstrapDialog>
        </div>
    );
};
export default AddLanguageCountry;
