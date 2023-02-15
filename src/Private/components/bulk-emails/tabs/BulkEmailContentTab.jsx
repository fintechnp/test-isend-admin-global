import React from "react";

import BulkEmailContents from "../contents/BulkEmailContents";
import AddBulkEmailContentModal from "../contents/AddBulkEmailContentModal";
import EditBulkEmailContentModal from "../contents/EditBulkEmailContentModal";
import ViewBulkEmailContentModal from "../contents/ViewBulkEmailContentModal";

export default function BulkEmailContentTab() {
    return (
        <>
            <AddBulkEmailContentModal />
            <EditBulkEmailContentModal />
            <ViewBulkEmailContentModal />
            <BulkEmailContents />
        </>
    );
}
