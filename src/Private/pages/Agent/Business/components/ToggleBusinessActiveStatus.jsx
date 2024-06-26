import PropTypes from "prop-types";
import React, { useEffect } from "react";
import Switch from "@mui/material/Switch";
import { useDispatch, useSelector } from "react-redux";

import { businessActions } from "../store";
import { useConfirm } from "App/core/mui-confirm";
import CircularProgress from "App/components/Loading/CircularProgress";

export default function ToggleBusinessActiveStatus({ businessId, statusId, onSuccess }) {
    const dispatch = useDispatch();

    const confirm = useConfirm();

    const { loading: isLoading, success: isSuccess } = useSelector((state) => state.toggle_business_active_status);

    const handleChangeStatus = () => {
        confirm({
            description: `You want to make business ${!!statusId ? "Inactive" : "Active"}`,
        }).then(() => {
            dispatch(businessActions.toggle_business_active_status(businessId));
        });
    };

    useEffect(() => {
        if (isSuccess) {
            onSuccess?.();
            dispatch(businessActions.toggle_business_active_status_reset());
        }
    }, [isSuccess]);

    return (
        <>
            {isLoading ? (
                <CircularProgress size={20} />
            ) : (
                <Switch size="small" checked={!!statusId} onChange={handleChangeStatus} />
            )}
        </>
    );
}

ToggleBusinessActiveStatus.propTypes = {
    businessId: PropTypes.string.isRequired,
    statusId: PropTypes.string.isRequired,
    onSuccess: PropTypes.func.isRequired,
};
