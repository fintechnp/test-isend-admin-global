import React from "react";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";

import withPermission from "Private/HOC/withPermission";
import PageContent from "App/components/Container/PageContent";
import DocumentAcceptance from "Private/components/DocumentAcceptance/DocumentAcceptance";
import AddDocumentAcceptanceModal from "../../../components/DocumentAcceptance/AddDocumentAcceptanceModal";
import EditDocumentAcceptanceModal from "../../../components/DocumentAcceptance/EditDocumentAcceptanceModal";

import { permissions } from "Private/data/permissions";
import HasPermission from "Private/components/shared/HasPermission";

const ListDocumentAcceptance = () => {
    const dispatch = useDispatch();

    return (
        <PageContent
            title="KYC Documents"
            topRightEndContent={
                <HasPermission permission={permissions.CREATE_KYC_DOCUMENT_SETUP}>
                    <Button
                        variant="outlined"
                        onClick={() =>
                            dispatch({
                                type: "OPEN_ADD_DOCUMENT_ACCEPTANCE_MODAL",
                            })
                        }
                    >
                        Add Document
                    </Button>
                </HasPermission>
            }
        >
            <AddDocumentAcceptanceModal />
            <EditDocumentAcceptanceModal />
            <DocumentAcceptance />
        </PageContent>
    );
};

export default withPermission({ permission: [permissions.READ_KYC_DOCUMENT_SETUP] })(ListDocumentAcceptance);
