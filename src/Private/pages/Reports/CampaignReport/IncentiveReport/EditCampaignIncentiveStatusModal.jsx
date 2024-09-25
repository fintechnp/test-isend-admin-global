import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";

import { ReportsAction } from "../../store";
import CampaignIncentiveForm from "./CampaignIncentiveForm";

export default function EditCampaignIncentiveStatusModal() {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading,
        success,
        initial_form_state: initialFormState,
    } = useSelector((state) => state.update_campaign_incentive_status);

    const handleClose = useCallback(() => {
        dispatch(ReportsAction.close_campaign_incentive_modal());
        dispatch(ReportsAction.get_campaign_incentive_report());
    });

    const id = initialFormState?.id;

    useEffect(() => {
        if (success) {
            handleClose();
        }
    });

    const handleSubmit = (data) => {
        dispatch(ReportsAction.update_campaign_incentive_status(id, data));
    };

    return (
        <Modal open={isOpen} onClose={handleClose} title="Edit Campagin Incentive Status">
            <CampaignIncentiveForm handleClose={handleClose} handleSubmit={handleSubmit} loading={loading} />
        </Modal>
    );
}
