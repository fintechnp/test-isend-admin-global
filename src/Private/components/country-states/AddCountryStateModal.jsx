import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import CountryStateForm from "./CountryStateForm";
import countryStateActions from "Private/features/country-states/countryStateActions";

export default function AddCountryStateModal() {
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, loading } = useSelector((state) => state.add_country_state);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_ADD_COUNTRY_STATE_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch(countryStateActions.add_country_state(data));
    };

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Add State">
            <CountryStateForm
                isAddMode={true}
                onSubmit={handleSubmit}
                onCancel={handleClose}
                form="add_country_state_form"
                isProcessing={loading}
            />
        </Modal>
    );
}
