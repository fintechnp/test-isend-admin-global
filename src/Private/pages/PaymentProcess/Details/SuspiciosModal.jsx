import Modal from "App/components/Modal/Modal";
import React from "react";

export default function SuspiciosModal({ open, handleClose, data }) {
    return (
        <Modal
            sx={{
                maxWidth: "50%",
            }}
            title="Suspicios Data"
            open={open}
            onClose={handleClose}
        >
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </Modal>
    );
}
