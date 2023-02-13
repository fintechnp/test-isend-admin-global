import React from "react";
import BulkEmailGroups from "../groups/BulkEmailGroups";
import BulkEmailGroupFilter from "../groups/BulkEmailGroupFilter";

export default function BulkEmailGroupTab() {
    return (
        <div>
            <BulkEmailGroupFilter />
            <BulkEmailGroups />
        </div>
    );
}
