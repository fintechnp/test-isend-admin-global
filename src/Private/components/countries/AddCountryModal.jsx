import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import CountryForm from "./CountryForm";
import Modal from "App/components/Modal/Modal";
import countryActions from "Private/features/countries/countryActions";

export default function AddCountryModal() {
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, loading } = useSelector((state) => state.add_country);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_ADD_COUNTRY_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch(countryActions?.add_country(data));
    };

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Add Country">
            <CountryForm isAddMode={true} onSubmit={handleSubmit} handleClose={handleClose} loading={loading} />
        </Modal>
    );
}
