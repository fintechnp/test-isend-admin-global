import React from "react";
import { useDispatch } from "react-redux";

import Button from "App/components/Button/Button";
import PageContent from "App/components/Container/PageContent";
import CountryStates from "Private/components/country-states/CountryStates";
import AddCountryStateModal from "Private/components/country-states/AddCountryStateModal";
import EditCountryStateModal from "Private/components/country-states/EditCountryStateModal";

export default function ListCountryState() {
  const dispatch = useDispatch();

  return (
    <PageContent
      title="Country States"
      topRightEndContent={
        <Button
          onClick={() => dispatch({ type: "OPEN_ADD_COUNTRY_STATE_MODAL" })}
        >
          Add Country State
        </Button>
      }
    >
      <AddCountryStateModal />
      <EditCountryStateModal />
      <CountryStates />
    </PageContent>
  );
}
