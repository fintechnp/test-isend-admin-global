import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import CountryForm from "./CountryForm";
import Modal from "App/components/Modal/Modal";
import countryActions from "Private/features/countries/countryActions";

export default function EditCountryModal() {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading,
        initial_form_state: initialFormState,
    } = useSelector((state) => state.update_country);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_UPDATE_COUNTRY_MODAL" });
    }, []);

    const handleSubmit = (data) => {
        dispatch(countryActions.update_country(initialFormState.country_id, data));
    };

    if (!isOpen) <></>;

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <CountryForm
                initialValues={{
                    country_name: initialFormState?.country_name ?? "",
                    currency: initialFormState?.currency ?? "",
                    iso2: initialFormState?.iso2 ?? "",
                    iso3: initialFormState?.iso3 ?? "",
                    phone_code: initialFormState?.phone_code ?? "",
                    currency_name: initialFormState?.currency_name ?? "",
                    phone_regex: initialFormState?.phone_regex ?? "",
                    postcode_regex: initialFormState?.postcode_regex ?? "",
                    has_state: initialFormState?.has_state ?? false,
                }}
                isAddMode={false}
                onSubmit={handleSubmit}
                handleClose={handleClose}
                loading={loading}
            />
        </Modal>
    );
}
