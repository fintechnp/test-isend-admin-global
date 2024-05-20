import React from "react";
import { useDispatch } from "react-redux";

import Button from "App/components/Button/Button";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import PageContent from "App/components/Container/PageContent";
import HasPermission from "Private/components/shared/HasPermission";
import FundingSources from "Private/components/funding-sources/FundingSources";
import AddFundingSourceModal from "Private/components/funding-sources/AddFundingSourceModal";
import EditFundingSourceModal from "Private/components/funding-sources/EditFundingSourceModal";

function ListFundingSource() {
    const dispatch = useDispatch();

    return (
        <PageContent
            title="Funding Sources"
            topRightEndContent={
                <HasPermission permission={permissions.CREATE_FUNDING_SOURCE}>
                    <Button onClick={() => dispatch({ type: "OPEN_ADD_FUNDING_SOURCE_MODAL" })}>
                        Add Funding Source
                    </Button>
                </HasPermission>
            }
        >
            <HasPermission permission={permissions.CREATE_FUNDING_SOURCE}>
                <AddFundingSourceModal />
            </HasPermission>
            <HasPermission permission={permissions.EDIT_FUNDING_SOURCE}>
                <EditFundingSourceModal />
            </HasPermission>
            <FundingSources />
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_FUNDING_SOURCE] })(ListFundingSource);
