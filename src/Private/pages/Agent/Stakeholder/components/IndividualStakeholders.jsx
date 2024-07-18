import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useEffect, useMemo, useState } from "react";

import Column from "App/components/Column/Column";
import Button from "App/components/Button/Button";
import PopoverButton from "App/components/Button/PopoverButton";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import ViewIndividualStakeholderModal from "./ViewIndividualStakeholderModal";

import { stakeholderActions } from "../store";
import { relatedTo as relatedToConstants } from "Private/data/b2b";
import IndividualStakeholderStatusBadge from "./IndividualStakeholderStatusBadge";
import { individualStakeholderStatus } from "../data/stakeholderStatus";
export default function IndividualStakeholders({ relatedTo, relatedId, onAddStakeholder, onEditStakeholder }) {
    const dispatch = useDispatch();

    const [selectedId, setSelectedId] = useState(null);

    const [open, setOpen] = useState(false);

    const { response, loading } = useSelector((state) => state.get_individual_stakeholders);

    const data = response?.data ?? [];

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
            },
            {
                header: "Full Name",
                accessorKey: "fullName",
            },
            {
                header: "Designation",
                accessorKey: "designationName",
            },
            {
                header: "Mobile Number",
                accessorKey: "mobileNumber",
            },
            {
                header: "Status",
                accessorKey: "status",
                cell: ({ getValue, row }) => (
                    <IndividualStakeholderStatusBadge statusId={getValue()} label={row.original.statusName} />
                ),
            },
            {
                header: "Actions",
                cell: ({ row }) => (
                    <PopoverButton>
                        {({ onClose }) => (
                            <>
                                <ListItemButton onClick={() => (setSelectedId(row.original.kycId), onClose())}>
                                    View
                                </ListItemButton>
                                {row.original.status !== individualStakeholderStatus.APPROVED && (
                                    <ListItemButton
                                        onClick={() => (onEditStakeholder?.(row.original.kycId), onClose())}
                                    >
                                        Edit
                                    </ListItemButton>
                                )}
                            </>
                        )}
                    </PopoverButton>
                ),
            },
        ],
        [],
    );

    const fetch = () => {
        const query = {
            ...(relatedTo === relatedToConstants.AGENT
                ? {
                      marketMakerId: relatedId,
                  }
                : undefined),
            ...(relatedTo === relatedToConstants.BUSINESS
                ? {
                      businessId: relatedId,
                  }
                : undefined),
        };

        dispatch(stakeholderActions.get_individual_stakeholders(query));
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <Column gap="1rem">
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                }}
            >
                <Button size="small" variant="contained" onClick={onAddStakeholder}>
                    Add Individual Stakeholder
                </Button>
            </Box>
            <TanstackReactTable columns={columns} title="KYB" data={data} loading={loading} />
            <ViewIndividualStakeholderModal
                stakeholderId={selectedId}
                onClose={() => setSelectedId(null)}
                onChangeStatusSuccess={fetch}
                onEditStakeholder={onEditStakeholder}
            />
        </Column>
    );
}

IndividualStakeholders.propTypes = {
    relatedTo: PropTypes.oneOf([relatedToConstants.AGENT, relatedToConstants.BUSINESS]).isRequired,
    relatedId: PropTypes.string.isRequired,
    onAddStakeholder: PropTypes.func,
    onEditStakeholder: PropTypes.func,
};
