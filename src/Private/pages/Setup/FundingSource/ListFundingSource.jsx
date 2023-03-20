import React from "react";
import { useDispatch } from "react-redux";

import Button from "App/components/Button/Button";
import PageContent from "App/components/Container/PageContent";
import FundingSources from "Private/components/funding-sources/FundingSources";
import AddFundingSourceModal from "Private/components/funding-sources/AddFundingSourceModal";
import EditFundingSourceModal from "Private/components/funding-sources/EditFundingSourceModal";

export default function ListFundingSource() {
    const dispatch = useDispatch();

    return (
        <PageContent
            title="Funding Sources"
            topRightEndContent={
                <Button onClick={() => dispatch({ type: "OPEN_ADD_FUNDING_SOURCE_MODAL" })}>Add Funding Source</Button>
            }
        >
            <AddFundingSourceModal />
            <EditFundingSourceModal />
            <FundingSources />
        </PageContent>
    );
}
