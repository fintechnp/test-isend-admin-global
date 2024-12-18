import React from "react";
import BulkEmailGroups from "../groups/BulkEmailGroups";
import AddBulkEmailGroupModal from "../groups/AddBulkEmailGroupModal";
import EditBulkEmailGroupModal from "../groups/EditBulkEmailGroupModal";

export default function BulkEmailGroupTab() {
    return (
        <>
            <BulkEmailGroups />
            <AddBulkEmailGroupModal />
            <EditBulkEmailGroupModal />
        </>
    );
}
