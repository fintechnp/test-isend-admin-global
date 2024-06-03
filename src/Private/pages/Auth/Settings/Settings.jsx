import React from "react";

import ChangePassword from "./components/ChangePassword";
import PageContent from "App/components/Container/PageContent";

function Settings() {
    return (
        <PageContent title="Change Password">
            <ChangePassword />
        </PageContent>
    );
}

export default Settings;
