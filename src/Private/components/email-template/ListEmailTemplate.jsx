import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";

import PageContent from "App/components/Container/PageContent";

import EmailTemplate from "Private/components/email-template/EmailTemplate";
import AddEmailTemplateModal from "Private/components/email-template/AddEmailTemplateModal";
import EditEmailTemplateModal from "Private/components/email-template/EditEmailTemplateModal";

function ListEmailTemplate() {
    return (
        <PageContent
            documentTitle="Email Templates"
            breadcrumbs={[
                {
                    label: "Dashboard",
                },
                {
                    label: "Email Templates",
                },
            ]}
        >
            <AddEmailTemplateModal />
            <EditEmailTemplateModal />
            <EmailTemplate />
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_EMAIL_TEMPLATE] })(ListEmailTemplate);
