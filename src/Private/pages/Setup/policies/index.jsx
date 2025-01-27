import React from "react";

import ListFaqs from "./FAQs/ListFaqs";
import Tabs from "App/components/Tab/Tabs";
import ListContact from "./Contact/ListContact";
import ListAmlPolicy from "./AmlPolicy/ListAmlPolicy";
import PageContent from "App/components/Container/PageContent";
import ListPrivacyPolicy from "./PrivacyPolicy/ListPrivacyPolicy";
import ListTermsAndCondition from "./TermsAndCondition/ListTermsAndCondition";

const Policies = () => {
    return (
        <PageContent
            documentTitle="Policies Setup"
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "Policies",
                },
            ]}
        >
            <Tabs
                tabs={[
                    {
                        key: "FAQs",
                        tabName: "FAQs",
                        tabContent: <ListFaqs />,
                    },
                    // {
                    //     key: "TermsAndCondition",
                    //     tabName: "Terms & Conditions",
                    //     tabContent: <ListTermsAndCondition />,
                    // },
                    // {
                    //     key: "PrivacyPolicy",
                    //     tabName: "Privacy Policy",
                    //     tabContent: <ListPrivacyPolicy />,
                    // },
                    // {
                    //     key: "AmlPolicy",
                    //     tabName: "AML Policy",
                    //     tabContent: <ListAmlPolicy />,
                    // },
                    // {
                    //     key: "Contact",
                    //     tabName: "Contact",
                    //     tabContent: <ListContact />,
                    // },
                ]}
            />
        </PageContent>
    );
};

export default Policies;
