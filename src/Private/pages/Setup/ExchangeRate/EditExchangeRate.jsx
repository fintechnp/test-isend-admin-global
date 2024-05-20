import React from "react";
import { permissions } from "Private/data/permissions";
import withPermission from "Private/HOC/withPermission";
import AddUpdateExchangeRate from "./AddUpdateExchangeRate";
import HasPermission from "Private/components/shared/HasPermission";

function EditExchangeRate() {
    return (
        <HasPermission permission={permissions.EDIT_EXCHANGE_RATE}>
            <AddUpdateExchangeRate title="Update Exchange Rate" />
        </HasPermission>
    );
}

export default withPermission({ permission: permissions.CREATE_EXCHANGE_RATE })(EditExchangeRate);
