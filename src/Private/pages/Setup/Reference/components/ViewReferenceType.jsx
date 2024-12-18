import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";

import Modal from "App/components/Modal/Modal";
import SourceDetails from "App/core/source-detail/SourceDetails";

import dateUtils from "App/utils/dateUtils";
import useSourceDetail from "App/core/source-detail/useSourceDetail";

const ViewReferenceType = ({ data, onClose }) => {
    const [open, setOpen] = useState(false);

    const definition = useSourceDetail([
        {
            title: "",
            items: [
                { label: "Id", accessorKey: "reference_type_id" },
                { label: "Type Name", accessorKey: "type_name" },
                { label: "Description", accessorKey: "description" },
                {
                    label: "Created Date",
                    accessorKey: "created_ts",
                    cell: (data) => (
                        <>{data.created_ts ? dateUtils.getFormattedDate(data.created_ts, "DD/MM/YYYY") : "-"}</>
                    ),
                },
            ],
        },
    ]);

    const handleClose = () => {
        setOpen(false);
        onClose?.();
    };

    return (
        <>
            <ListItemButton onClick={() => setOpen(true)}>View</ListItemButton>
            <Modal open={open} onClose={handleClose} title="Reference Type Details">
                <SourceDetails data={data || []} definition={definition} />
            </Modal>
        </>
    );
};

export default ViewReferenceType;
