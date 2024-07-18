import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";

import Row from "App/components/Row/Row";
import dateUtils from "App/utils/dateUtils";
import { relatedTo } from "Private/data/b2b";
import Modal from "App/components/Modal/Modal";
import Button from "App/components/Button/Button";
import { permissions } from "Private/data/permissions";
import ButtonWrapper from "App/components/Forms/ButtonWrapper";
import SourceDetails from "App/core/source-detail/SourceDetails";
import HasPermission from "Private/components/shared/HasPermission";
import useSourceDetail from "App/core/source-detail/useSourceDetail";

import { accountClosureRequestActions } from "../store";
import AccountClosureStatusBadge from "./AccountClosureStatusBadge";
import AcceptRejectAccountClosureRequestModal from "./AcceptRejectAccountClosureRequestModal";
import { AccountClosureRequestFormValues, AccountClosureRequestStatus } from "../data/AccountClosureRequestStatus";

export default function ViewAccountClosureRequestModal({ onAcceptRejectSuccess }) {
    const dispatch = useDispatch();

    const [status, setStatus] = useState("");

    const [open, setOpen] = useState(false);

    const { is_open: isOpen, data: response } = useSelector((state) => state.view_b2b_account_closure_request);

    const { success, loading } = useSelector((state) => state.accept_reject_b2b_account_closure_request);

    const relatedToName = response?.relatedTo;

    const relatedName = relatedToName === relatedTo.AGENT ? "Agent" : "Business";

    const handleClose = useCallback(() => {
        dispatch(accountClosureRequestActions.close_account_closure_view_modal());
    }, [dispatch]);

    const handleModalClose = () => {
        setOpen(false);
    };

    const handleSubmit = (data) => {
        dispatch(accountClosureRequestActions.accept_reject_account_closure_request(response?.id, data));
    };

    useEffect(() => {
        if (success) {
            onAcceptRejectSuccess?.();
            dispatch(accountClosureRequestActions.accept_reject_account_closure_request_reset());
            setOpen(false);
        }
    }, [success]);

    const definition = useSourceDetail([
        {
            label: relatedName,
            accessorKey: "related_id_name",
        },
        {
            label: "Email",
            accessorKey: "email",
        },
        {
            label: "Phone Number",
            accessorKey: "phone",
        },
        {
            label: "Deletion Reason",
            accessorKey: "deletion_reason",
        },
        {
            label: "Status",
            accessorKey: "status",
            cell: (row) => <AccountClosureStatusBadge status={row?.status ?? AccountClosureRequestStatus.PENDING} />,
        },

        {
            label: "Created At",
            cell: () => <>{dateUtils.getLocalDateTimeFromUTC(response?.created_ts)}</>,
        },
        {
            label: "Created By",
            accessorKey: "created_by",
        },
    ]);

    return (
        <Modal
            sx={{
                minWidth: "1000px",
                maxWidth: "1000px",
            }}
            open={isOpen}
            onClose={handleClose}
            title="Account Closure Request Details"
        >
            <SourceDetails definition={definition} data={response} />

            <ButtonWrapper>
                {![AccountClosureRequestStatus.ACCEPTED, AccountClosureRequestStatus.REJECTED].includes(
                    response?.status?.toUpperCase(),
                ) && (
                    <Row gap={2}>
                        <HasPermission permission={permissions.ACCEPT_B2B_ACCOUNT_CLOSURE_REQUEST}>
                            <Button
                                onClick={() => {
                                    setStatus(AccountClosureRequestFormValues.ACCEPTED);
                                    setOpen(true);
                                }}
                                variant="contained"
                                color="success"
                            >
                                Approve
                            </Button>
                        </HasPermission>

                        <HasPermission permission={permissions.REJECT_B2B_ACCOUNT_CLOSURE_REQUEST}>
                            <Button
                                onClick={() => {
                                    setStatus(AccountClosureRequestFormValues.REJECTED);
                                    setOpen(true);
                                }}
                                variant="contained"
                                color="error"
                            >
                                Reject
                            </Button>
                        </HasPermission>
                    </Row>
                )}
            </ButtonWrapper>

            <Modal title="Account Closure Request" open={open} onClose={handleModalClose}>
                <AcceptRejectAccountClosureRequestModal
                    handleSubmit={handleSubmit}
                    setOpen={setOpen}
                    status={status}
                    loading={loading}
                />
            </Modal>
        </Modal>
    );
}

ViewAccountClosureRequestModal.propTypes = {
    onAcceptRejectSuccess: PropTypes.func,
};
