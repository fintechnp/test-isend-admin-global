import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";
import React, { useEffect, useMemo, useState } from "react";

import Row from "App/components/Row/Row";
import Column from "App/components/Column/Column";
import PopoverButton from "App/components/Button/PopoverButton";
import TanstackReactTable from "App/components/Table/TanstackReactTable";
import ViewOrganizationStakeholderModal from "./ViewOrganizationStakeholderModal";

import isEmpty from "App/helpers/isEmpty";
import { stakeholderActions } from "../store";
import { relatedTo as relatedToConstants } from "Private/data/b2b";
import OrganizationStakeholderStatusBadge from "./OrganizationStakeholderStatusBadge";
import { organizationStakeholderStatus } from "../data/stakeholderStatus";

export default function OrganizationStakeholders({
    relatedTo,
    relatedId,
    onAddStakeholder,
    onEditStakeholder,
    disableParentFilter = true,
}) {
    const dispatch = useDispatch();

    const [selectedId, setSelectedId] = useState(null);

    const { response, loading } = useSelector((state) => state.get_organization_stakeholders);

    const data = (response?.data ?? [])?.filter((item) => {
        if (disableParentFilter) return true;
        return !isEmpty(item.parentId);
    });

    const { success } = useSelector((state) => state.update_business_kyb_status);

    const columns = useMemo(
        () => [
            {
                header: "SN",
                accessorKey: "f_serial_no",
                cell: ({ row }) => row.index + 1,
            },
            {
                header: "Name",
                accessorKey: "name",
            },
            {
                header: "Registration No",
                accessorKey: "registrationNo",
            },
            {
                header: "Country of Registration",
                accessorKey: "registeredCountry.country",
            },
            {
                header: "Registered Date",
                accessorKey: "registeredDate",
            },
            {
                header: "Status",
                accessorKey: "statusId",
                cell: ({ getValue, row }) => (
                    <OrganizationStakeholderStatusBadge statusId={getValue()} label={row.original.status} />
                ),
            },
            {
                header: "Actions",
                cell: ({ row }) => (
                    <PopoverButton>
                        {({ onClose }) => (
                            <>
                                <ListItemButton onClick={() => (setSelectedId(row.original.kybId), onClose())}>
                                    View
                                </ListItemButton>
                                {row.original.statusId != organizationStakeholderStatus.APPROVED && (
                                    <ListItemButton
                                        onClick={() => (onEditStakeholder?.(row.original.kybId), onClose())}
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

        dispatch(stakeholderActions.get_organization_stakeholders(query));
    };

    useEffect(() => {
        fetch();
    }, []);

    return (
        <Column gap="16px">
            <Row justifyContent="flex-end">
                <Button size="small" variant="contained" onClick={onAddStakeholder}>
                    Add Organization Stakeholder
                </Button>
            </Row>
            <TanstackReactTable columns={columns} title="KYB" data={data} loading={loading} />
            <ViewOrganizationStakeholderModal
                stakeholderId={selectedId}
                onClose={() => setSelectedId(null)}
                onChangeStatusSuccess={fetch}
            />
        </Column>
    );
}

OrganizationStakeholders.propTypes = {
    relatedTo: PropTypes.oneOf([relatedToConstants.AGENT, relatedToConstants.BUSINESS]).isRequired,
    relatedId: PropTypes.string.isRequired,
    onAddStakeholder: PropTypes.func,
    onEditStakeholder: PropTypes.func,
};
