import React from "react";

import app from "App/config/app";
import PageContent from "App/components/Container/PageContent";

function Dashboard() {

    return (
       <PageContent documentTitle="Dashboard">
         <div>Welcome to, {app.name}</div>
       </PageContent>
    );
}

export default Dashboard;
