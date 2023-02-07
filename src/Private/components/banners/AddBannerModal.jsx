import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import BannerForm from "./BannerForm";
import Modal from "App/components/Modal/Modal";
import bannerActions from "Private/features/banners/bannerActions";

export default function AddBannerModal() {
  const dispatch = useDispatch();

  const { is_modal_open: isOpen, loading } = useSelector(
    (state) => state.add_banner
  );

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE_ADD_BANNER_MODAL" });
  }, []);

  const handleSubmit = (data) => {
    dispatch(bannerActions.add_banner(data));
  };

  if (!isOpen) <></>;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <BannerForm
        isAddMode={true}
        onSubmit={handleSubmit}
        onCancel={handleClose}
        form="add_banner_form"
        isProcessing={loading}
      />
    </Modal>
  );
}
