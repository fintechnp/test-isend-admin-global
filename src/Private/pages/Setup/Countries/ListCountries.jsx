import { useDispatch } from "react-redux";
import Button from "@mui/material/Button";

import PageContent from "App/components/Container/PageContent";
import Countries from "Private/components/countries/Countries";
import AddCountryModal from "Private/components/countries/AddCountryModal";
import EditCountryModal from "Private/components/countries/EditCountryModal";

export default function ListCountries() {
    const dispatch = useDispatch();

    return (
        <PageContent
            title="Countries"
            topRightEndContent={
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
            }
        >
            <AddCountryModal />
            <EditCountryModal />

            <Countries />
        </PageContent>
    );
}
