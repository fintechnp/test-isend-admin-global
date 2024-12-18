import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";

import Modal from "App/components/Modal/Modal";
import SourceDetails from "App/core/source-detail/SourceDetails";

import dateUtils from "App/utils/dateUtils";
import { ReferenceName } from "App/helpers";
import useSourceDetail from "App/core/source-detail/useSourceDetail";

const ViewSanction = ({ data, onClose }) => {
    const [open, setOpen] = useState(false);

    const definition = useSourceDetail([
        {
            title: "",
            items: [
                { label: "Id", accessorKey: "tid" },
                { label: "Name", accessorKey: "name" },
                {
                    label: "Type",
                    accessorKey: "type",
                    cell: (data) => <>{data.type ? ReferenceName(30, data.type) : "-"}</>,
                },
                { label: "Address", accessorKey: "address" },
                { label: "Country", accessorKey: "country" },
                {
                    label: "DOB",
                    accessorKey: "dob",
                    cell: (data) => <>{data.dob ? dateUtils.getFormattedDate(data.dob, "DD/MM/YYYY") : "-"}</>,
                },
                { label: "Source", accessorKey: "source" },
                { label: "Remarks", accessorKey: "remarks" },
                { label: "Ref 1", accessorKey: "ref1" },
                { label: "Ref 2", accessorKey: "ref2" },
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
            <Modal open={open} onClose={handleClose} title="Sanction">
                <SourceDetails data={data || []} definition={definition} />
            </Modal>
        </>
    );
};

export default ViewSanction;
