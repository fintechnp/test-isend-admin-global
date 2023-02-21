import React from "react";

import Tabs from "App/components/Tab/Tabs";
import PageContent from "App/components/Container/PageContent";
import BulkEmailGroupTab from "Private/components/bulk-emails/tabs/BulkEmailGroupTab";
import BulkEmailAddressTab from "Private/components/bulk-emails/tabs/BulkEmailAddressTab";
import BulkEmailContentTab from "Private/components/bulk-emails/tabs/BulkEmailContentTab";
import BulkEmailCredentialTab from "Private/components/bulk-emails/tabs/BulkEmailCredentialTab";

export default function ListBulkEmail() {
    const tabs = [
        {
            key: "groups",
            tabName: "Groups",
            tabContent: <BulkEmailGroupTab />,
        },
        {
            key: "email-addresses",
            tabName: "Email Address",
            tabContent: <BulkEmailAddressTab />,
        },
        {
            key: "contents",
            tabName: "Email Contents",
            tabContent: <BulkEmailContentTab />,
        },
        {
            key: "credentials",
            tabName: "Credentials",
            tabContent: <BulkEmailCredentialTab />,
        },
    ];

    return (
        <PageContent title="Bulk Emails">
            <Tabs tabs={tabs} />
        </PageContent>
    );
}
