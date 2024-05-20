import React from "react";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import AddUpdateExchangeRate from "./AddUpdateExchangeRate";
import HasPermission from "Private/components/shared/HasPermission";

function AddExchangeRate() {
    return (
        <HasPermission permission={permissions.CREATE_EXCHANGE_RATE}>
            <AddUpdateExchangeRate title="Create Exchange Rate" />
        </HasPermission>
    );
}

export default withPermission({ permission: permissions.CREATE_EXCHANGE_RATE })(AddExchangeRate);
