import React, { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import ListItemButton from "@mui/material/ListItemButton";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import Modal from "App/components/Modal/Modal";
import SourceDetails from "App/core/source-detail/SourceDetails";

import useSourceDetail from "App/core/source-detail/useSourceDetail";

const ViewPaymentRule = ({ data, onClose }) => {
    const [open, setOpen] = useState(false);

    const definition = useSourceDetail([
        {
            title: "",
            items: [
                { label: "Id", accessorKey: "tid" },
                { label: "Sending Partner", accessorKey: "sending_agent" },
                { label: "Country", accessorKey: "send_country" },
                { label: "Payout Partner", accessorKey: "payout_agent" },
                { label: "Payout Country", accessorKey: "payout_country" },
                { label: "Amount", accessorKey: "amount" },
                { label: "No of Transactions", accessorKey: "no_of_transactions" },
                { label: "No of Days", accessorKey: "no_of_days" },
                { label: "Compliance Action", accessorKey: "compliance_action" },
                {
                    label: "Status",
                    accessorKey: "is_active",
                    cell: (data) => (
                        <>
                            {data.is_active ? (
                                <CheckCircleIcon color="success" fontSize="small" />
                            ) : (
                                <CancelIcon color="error" fontSize="small" />
                            )}
                        </>
                    ),
                },
            ],
        },
    ]);

    const handleClose = () => {
        setOpen(false);
        onClose?.();
    };

    return (
        <>
            <ListItemButton onClick={() => setOpen(true)}>View</ListItemButton>
            <Modal open={open} onClose={handleClose} title="Payment Rules">
                <SourceDetails data={data || []} definition={definition} />
            </Modal>
        </>
    );
};

export default ViewPaymentRule;
