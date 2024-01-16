import React from "react";
import { useDispatch } from "react-redux";

import PageContent from "App/components/Container/PageContent";

function Dashboard() {

    return (
       <PageContent documentTitle="Dashboard">
         <div>Welcome to iSend</div>
       </PageContent>
    );
}

export default Dashboard;
