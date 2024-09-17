import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import emailTemplateActions from "./store/emailTemplateActions";

const isAllEmpty = (obj) => {
    // Check if obj is an object and is not null
    if (typeof obj !== "object" || obj === null) {
        throw new TypeError("Expected an object");
    }

    // Get all values from the object
    const values = Object.values(obj);

    // Check if all values are empty
    return values.every((value) => value === "" || value === null || value === undefined);
};

export default function ViewEmailTemplateModal({ data, isOpen, handleClose }) {
    const dispatch = useDispatch();

    const { response, loading } = useSelector((state) => state.get_email_element);

    const emailHeader = response?.data.find(
        (email_e) => email_e.element_id === data.header_element_id,
    )?.element_content;
    const emailFooter = response?.data.find(
        (email_e) => email_e.element_id === data.footer_element_id,
    )?.element_content;

    useEffect(() => {
        dispatch(emailTemplateActions.get_email_element());
    }, []);

    return (
        <Modal
            sx={{
                minWidth: "600px",
                maxWidth: "900px",
            }}
            open={isOpen}
            onClose={handleClose}
            title="Email Preview"
        >
            {isAllEmpty(data) ? (
                <Typography> No Email Template Found</Typography>
            ) : (
                <Box
                    sx={{
                        backgroundColor: "#F7F7F8",
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor: "#F7F7F8",
                        }}
                        dangerouslySetInnerHTML={{ __html: emailHeader }}
                    />
                    <Box
                        sx={{
                            backgroundColor: "#F7F7F8",
                        }}
                        dangerouslySetInnerHTML={{ __html: data?.email_format }}
                    />
                    <Box
                        sx={{
                            backgroundColor: "#F7F7F8",
                        }}
                        dangerouslySetInnerHTML={{ __html: emailFooter }}
                    />
                </Box>
            )}
        </Modal>
    );
}
