import Box from "@mui/material/Box";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import Modal from "App/components/Modal/Modal";
import SourceDetails from "App/core/source-detail/SourceDetails";
import { ViewContentBox } from "../../components/DocumentContentBox";

import useSourceDetail from "App/core/source-detail/useSourceDetail";

const ViewPrivacyPolicyContent = () => {
    const dispatch = useDispatch();

    const { is_modal_open: isOpen, initial_form_state } = useSelector((state) => state.get_document_file_content_by_id);

    const handleClose = useCallback(() => {
        dispatch({ type: "CLOSE_GET_DOCUMENT_FILE_CONTENT_ID_BY_TYPE_MODAL" });
    }, []);

    const PPDefinition = useSourceDetail([
        {
            title: "",
            items: [
                {
                    label: "ID",
                    accessorKey: "contentId",
                    cell: (row) => <Box>{row?.contentId}</Box>,
                },
                {
                    label: "Order",
                    accessorKey: "contentOrder",
                    cell: (row) => <Box>{row?.contentOrder}</Box>,
                },
                {
                    label: "Content Title",
                    accessorKey: "content_title",
                    cell: (row) => (
                        <Box
                            sx={{
                                fontWeight: "bold",
                                color: "primary.main",
                                fontSize: "14px",
                            }}
                        >
                            {row?.content_title}
                        </Box>
                    ),
                },
                {
                    label: "Content Description",
                    accessorKey: "contents",
                    cell: (row) => <ViewContentBox content={row?.contents} />,
                },
            ],
        },
    ]);

    return (
        <Modal
            sx={{
                minWidth: "50%",
            }}
            title="View Content Detail"
            open={isOpen}
            onClose={handleClose}
        >
            <SourceDetails
                definition={PPDefinition}
                viewMode="column"
                rowMode="row"
                data={initial_form_state}
                disableLabelColon={false}
            />
        </Modal>
    );
};

export default ViewPrivacyPolicyContent;
