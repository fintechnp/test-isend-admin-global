import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";

import PageContent from "App/components/Container/PageContent";

import EmailTemplate from "Private/components/email-template/EmailTemplate";
import AddEmailTemplateModal from "Private/components/email-template/AddEmailTemplateModal";
import EditEmailTemplateModal from "Private/components/email-template/EditEmailTemplateModal";
function ListEmailTemplate() {
    const dispatch = useDispatch();

    return (
        <PageContent
            title="Email Templates"
            topRightEndContent={
                <Button
                    onClick={() =>
                        dispatch({
                            type: "OPEN_ADD_EMAIL_TEMPLATE_MODAL",
                        })
                    }
                    variant="outlined"
                >
                    Add Email Template
                </Button>
            }
        >
            <AddEmailTemplateModal />
            <EditEmailTemplateModal />
            <EmailTemplate />
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_EMAIL_TEMPLATE] })(ListEmailTemplate);
