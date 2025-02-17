import React from "react";
import { useDispatch } from "react-redux";

import Button from "App/components/Button/Button";
import PageContent from "App/components/Container/PageContent";
import CountryStates from "Private/components/country-states/CountryStates";
import AddCountryStateModal from "Private/components/country-states/AddCountryStateModal";
import EditCountryStateModal from "Private/components/country-states/EditCountryStateModal";
import HasPermission from "Private/components/shared/HasPermission";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import PageContentContainer from "App/components/Container/PageContentContainer";

function ListCountryState() {
    const dispatch = useDispatch();

    return (
        <PageContent
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "Country States",
                },
            ]}
        >
            <PageContentContainer
                title="Country States"
                topRightContent={
                    <HasPermission permission={permissions.CREATE_COUNTRY_STATE}>
                        <Button onClick={() => dispatch({ type: "OPEN_ADD_COUNTRY_STATE_MODAL" })}>
                            Add Country State
                        </Button>
                    </HasPermission>
                }
            >
                <AddCountryStateModal />
                <EditCountryStateModal />
                <CountryStates />
            </PageContentContainer>
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_COUNTRY_STATE] })(ListCountryState);
