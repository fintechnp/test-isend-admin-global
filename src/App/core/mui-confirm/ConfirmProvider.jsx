import { useState, useCallback } from "react";
import PropTypes from "prop-types";
import ConfirmContext from "./ConfirmContext";
import ConfirmationDialog from "./ConfirmationDialog";

const DEFAULT_OPTIONS = {
    title: "Are you sure?",
    description: "This action can't be undone.",
    content: null,
    confirmationText: "Ok",
    cancellationText: "Cancel",
    dialogProps: {},
    confirmationButtonProps: {},
    cancellationButtonProps: {},
    titleProps: {},
    contentProps: {},
    allowClose: true,
    icon: "success",
};

const buildOptions = (defaultOptions, options) => {
    const dialogProps = {
        ...(defaultOptions.dialogProps || DEFAULT_OPTIONS.dialogProps),
        ...(options.dialogProps || {}),
    };
    const confirmationButtonProps = {
        ...(defaultOptions.confirmationButtonProps || DEFAULT_OPTIONS.confirmationButtonProps),
        ...(options.confirmationButtonProps || {}),
    };
    const cancellationButtonProps = {
        ...(defaultOptions.cancellationButtonProps || DEFAULT_OPTIONS.cancellationButtonProps),
        ...(options.cancellationButtonProps || {}),
    };
    const titleProps = {
        ...(defaultOptions.titleProps || DEFAULT_OPTIONS.titleProps),
        ...(options.titleProps || {}),
    };
    const contentProps = {
        ...(defaultOptions.contentProps || DEFAULT_OPTIONS.contentProps),
        ...(options.contentProps || {}),
    };

    return {
        ...DEFAULT_OPTIONS,
        ...defaultOptions,
        ...options,
        dialogProps,
        confirmationButtonProps,
        cancellationButtonProps,
        titleProps,
        contentProps,
    };
};

const ConfirmProvider = ({ children, defaultOptions = {} }) => {
    const [options, setOptions] = useState({ ...DEFAULT_OPTIONS, ...defaultOptions });
    const [resolveReject, setResolveReject] = useState([]);
    const [resolve, reject] = resolveReject;

    const confirm = useCallback((options = {}) => {
        return new Promise((resolve, reject) => {
            setOptions(buildOptions(defaultOptions, options));
            setResolveReject([resolve, reject]);
        });
    }, []);

    const handleClose = useCallback(() => {
        setResolveReject([]);
    }, []);

    const handleCancel = useCallback(() => {
        if (reject) {
            reject();
            handleClose();
        }
    }, [reject, handleClose]);

    const handleConfirm = useCallback(() => {
        if (resolve) {
            resolve();
            handleClose();
        }
    }, [resolve, handleClose]);

    return (
        <>
            <ConfirmContext.Provider value={confirm}>{children}</ConfirmContext.Provider>
            <ConfirmationDialog
                open={resolveReject.length === 2}
                options={options}
                onClose={handleClose}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
                icon={options.icon || DEFAULT_OPTIONS.icon}
            />
        </>
    );
};

export default ConfirmProvider;

ConfirmProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
    defaultOptions: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        content: PropTypes.node,
        confirmationText: PropTypes.string,
        cancellationText: PropTypes.string,
        dialogProps: PropTypes.object,
        confirmationButtonProps: PropTypes.object,
        cancellationButtonProps: PropTypes.object,
        titleProps: PropTypes.object,
        contentProps: PropTypes.object,
        allowClose: PropTypes.bool,
        icon: PropTypes.string,
    }),
};
