import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";

import withPermission from "Private/HOC/withPermission";
import PageContent from "App/components/Container/PageContent";
import Countries from "Private/components/countries/Countries";
import AddCountryModal from "Private/components/countries/AddCountryModal";
import EditCountryModal from "Private/components/countries/EditCountryModal";

import { permissions } from "Private/data/permissions";
import HasPermission from "Private/components/shared/HasPermission";

function ListCountries() {
    const dispatch = useDispatch();

    return (
        <PageContent
            title="Countries"
            topRightEndContent={
                <HasPermission permission={permissions.CREATE_COUNTRY_SETUP}>
                    <Button
                        variant="outlined"
                        onClick={() =>
                            dispatch({
                                type: "OPEN_ADD_COUNTRY_MODAL",
                            })
                        }
                    >
                        Add Country
                    </Button>
                </HasPermission>
            }
        >
            <AddCountryModal />
            <EditCountryModal />
            <Countries />
        </PageContent>
    );
}

export default withPermission({ permission: [permissions.READ_COUNTRY_SETUP] })(ListCountries);
