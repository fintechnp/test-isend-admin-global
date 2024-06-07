import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import BannerForm from "./BannerForm";
import Modal from "App/components/Modal/Modal";
import bannerActions from "Private/features/banners/bannerActions";

// AddBannerModal.jsx
export default function AddBannerModal() {
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, loading } = useSelector((state) => state.add_banner);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_ADD_BANNER_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch(bannerActions.add_banner(data));
    };

    if (!isOpen) <></>;

    return (
        <Modal title="Add Banner" open={isOpen} onClose={handleClose}>
            <BannerForm isAddMode={true} handleClose={handleClose} handleSubmit={handleSubmit} loading={loading} />
        </Modal>
    );
}
