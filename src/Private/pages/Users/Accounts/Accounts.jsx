import { useDispatch } from "react-redux";
import React, { useEffect } from "react";

import actions from "./store/actions";
import AccountTable from "./components/AccountTable";
import PageContent from "App/components/Container/PageContent";
import withPermission from "Private/HOC/withPermission";
import { permissions } from "Private/data/permissions";

function Accounts() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            actions.get_user_number({
                include_count: true,
                page_number: 1,
                page_size: 20,
            }),
        );
    }, []);

    return (
        <PageContent
            documentTitle="User Accounts"
            breadcrumbs={[
                {
                    label: "Users",
                },
                {
                    label: "User Setups",
                },
            ]}
            disablePadding
        >
            <AccountTable />
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_USER] })(Accounts);
