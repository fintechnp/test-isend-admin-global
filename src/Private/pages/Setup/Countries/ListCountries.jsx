import withPermission from "Private/HOC/withPermission";
import PageContent from "App/components/Container/PageContent";
import Countries from "Private/components/countries/Countries";
import AddCountryModal from "Private/components/countries/AddCountryModal";
import EditCountryModal from "Private/components/countries/EditCountryModal";

import { permissions } from "Private/data/permissions";

function ListCountries() {
    return (
        <PageContent
            documentTitle="Countries"
            breadcrumbs={[
                {
                    label: "Setup",
                },
                {
                    label: "Countries",
                },
            ]}
        >
            <AddCountryModal />
            <EditCountryModal />
            <Countries />
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_COUNTRY_SETUP] })(ListCountries);
