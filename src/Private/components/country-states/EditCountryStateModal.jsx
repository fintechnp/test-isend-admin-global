import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import CountryStateForm from "./CountryStateForm";
import countryStateActions from "Private/features/country-states/countryStateActions";

export default function EditCountryStateModal() {
  const dispatch = useDispatch();

  const {
    is_modal_open: isOpen,
    loading,
    initial_form_state: initialFormState,
  } = useSelector((state) => state.update_country_state);

  const handleClose = useCallback(() => {
    dispatch({ type: "CLOSE_UPDATE_COUNTRY_STATE_MODAL" });
  }, []);

  const handleSubmit = (data) => {
    dispatch(
      countryStateActions.update_country_state(initialFormState.state_id, data)
    );
  };

  if (!isOpen) <></>;

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <CountryStateForm
        initialValues={{
          country: initialFormState?.country ?? "",
          name: initialFormState?.name ?? "",
          code: initialFormState?.code ?? "",
        }}
        isAddMode={false}
        onSubmit={handleSubmit}
        onCancel={handleClose}
        form="edit_country_state_form"
        isProcessing={loading}
      />
    </Modal>
  );
}
