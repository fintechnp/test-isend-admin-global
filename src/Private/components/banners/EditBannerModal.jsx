import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import BannerForm from "./BannerForm";
import Modal from "App/components/Modal/Modal";
import bannerActions from "Private/features/banners/bannerActions";

export default function EditBannerModal() {
  const dispatch = useDispatch();

  const {
    is_modal_open: isOpen,
    loading,
    initial_form_state: initialFormState,
  } = useSelector((state) => state.update_banner);

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE_UPDATE_BANNER_MODAL" });
  }, []);

  const handleSubmit = (data) => {
    dispatch(bannerActions.update_banner(initialFormState.banner_id, data));
  };

  if (!isOpen) return <></>;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <BannerForm
        initialValues={{
          banner_name: initialFormState?.banner_name,
          link: initialFormState?.link,
          is_active: initialFormState?.is_active,
        }}
        isAddMode={false}
        onSubmit={handleSubmit}
        onCancel={handleClose}
        form="update_banner_form"
        isProcessing={loading}
      />
    </Modal>
  );
}
