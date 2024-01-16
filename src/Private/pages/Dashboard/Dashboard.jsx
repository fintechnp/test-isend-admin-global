import PageContent from "App/components/Container/PageContent";
import AuthUtility from "App/utils/AuthUtility";
import { refreshToken } from "Common/store/sagas";
import React from "react";
import { useDispatch } from "react-redux";

function Dashboard() {

  const dispatch = useDispatch()

    return (
       <PageContent documentTitle="Dashboard">
         <div>Welcome to iSend</div>
         <button onClick={() => {
          dispatch({
            type: "REFRESH_TOKEN",
            data: {
                access_token: AuthUtility.getAccessToken(),
                refresh_token: AuthUtility.getRefreshToken(),
            },
        })
         }}>sddfa</button>
       </PageContent>
    );
}

export default Dashboard;
