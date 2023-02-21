import React from "react";
import BulkEmailAddresses from "../email-addresses/BulkEmailAddresses";
import AddBulkEmailAddressModal from "../email-addresses/AddBulkEmailAddressModal";
import EditBulkEmailAddressModal from "../email-addresses/EditBulkEmailAddressModal";
import ImportBulkEmailAddressModal from "../email-addresses/ImportBulkEmailAddressModal";

export default function BulkEmailAddressTab() {
    return (
        <>
            <AddBulkEmailAddressModal />
            <EditBulkEmailAddressModal />
            <ImportBulkEmailAddressModal />
            <BulkEmailAddresses />
        </>
    );
}
