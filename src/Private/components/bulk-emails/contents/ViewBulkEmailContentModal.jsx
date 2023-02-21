import React, { useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Accordion from "@mui/material/Accordion";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

import Modal from "App/components/Modal/Modal";
import TableViewData from "App/components/Table/TableViewData";

export default function ViewBulkEmailContentModal() {
    const dispatch = useDispatch();

    const {
        is_modal_open: isOpen,
        loading: isLoading,
        bulk_email_content_id: bulkEmailContentId,
        response,
    } = useSelector((state) => state.view_bulk_email_content);

    const viewData = [
        {
            tableData: [
                {
                    label: "Send To Group / Email",
                    accessor: "send_to",
                    accessorFn: (data) => data.send_to ?? data.group_name,
                },
                {
                    label: "Subject",
                    accessor: "email_subject",
                },
            ],
        },
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                <Box sx={{ width: "100%" }} display="flex" justifyContent="space-between">
                    <Typography>Email Body</Typography>
                </Box>
            </AccordionSummary>
            <AccordionDetails>
                {isLoading ? (
                    <Skeleton />
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: response?.data?.email_body }}></div>
                )}
            </AccordionDetails>
        </Accordion>,
    ];

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_VIEW_BULK_EMAIL_CONTENT_MODAL" });
    }, []);

    useEffect(() => {
        dispatch({ type: "VIEW_BULK_EMAIL_CONTENT", bulk_email_content_id: bulkEmailContentId });
    }, [bulkEmailContentId]);

    if (!isOpen) return <></>;

    return (
        <Modal open={isOpen} onClose={handleClose} title="Email Content Details" sx={{ minWidth: "600px" }}>
            <TableViewData isLoading={isLoading} views={viewData} data={response?.data} />
        </Modal>
    );
}
