import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

import PageContent from "App/components/Container/PageContent";
import AddDocumentAcceptanceModal from "../../../components/DocumentAcceptance/AddDocumentAcceptanceModal";
import EditDocumentAcceptanceModal from "../../../components/DocumentAcceptance/EditDocumentAcceptanceModal";
import DocumentAcceptance from "Private/components/DocumentAcceptance/DocumentAcceptance";

const ListDocumentAcceptance = () => {
    const dispatch = useDispatch();

    return (
        <PageContent
            title="Document Acceptance"
            topRightEndContent={
                <Button
                    variant="outlined"
                    onClick={() =>
                        dispatch({
                            type: "OPEN_ADD_DOCUMENT_ACCEPTANCE_MODAL",
                        })
                    }
                >
                    Add Document Acceptance
                </Button>
            }
        >
            <AddDocumentAcceptanceModal />
            <EditDocumentAcceptanceModal />
            <DocumentAcceptance />
        </PageContent>
    );
};

export default ListDocumentAcceptance;
