import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Divider from "@mui/material/Divider";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import ListItemButton from "@mui/material/ListItemButton";

import Documents from "./Documents";
import Row from "App/components/Row/Row";
import Modal from "App/components/Modal/Modal";
import SourceDetails from "App/core/source-detail/SourceDetails";
import PopoverButton from "App/components/Button/PopoverButton";

import isEmpty from "App/helpers/isEmpty";
import { stakeholderActions } from "../store";
import useModal from "Private/hooks/useModal";
import { approveBusinessStakeholderSchema } from "../schema/approveBusinessStakeholderSchema";
import ChangeOrganizationStakeholderStatusModal from "./ChangeOrganizationStakeholderStatusModal";
import useSourceDetail from "App/core/source-detail/useSourceDetail";
import OrganizationStakeholderStatusBadge from "./OrganizationStakeholderStatusBadge";
import { organizationStakeholderStatus } from "../data/stakeholderStatus";

export default function ViewOrganizationStakeholderModal({
    stakeholderId,
    onClose,
    onChangeStatusSuccess,
    onEditStakeholder,
}) {
    const { isModalOpen, openModal, closeModal } = useModal("ChangeOrganizationStakeholderStatus");

    const methods = useForm({
        resolver: yupResolver(approveBusinessStakeholderSchema),
    });

    const dispatch = useDispatch();

    const { response, loading: isLoading } = useSelector((state) => state.get_organization_stakeholder_by_id);

    const data = response?.data;

    const definition = useSourceDetail([
        {
            title: "",
            items: [
                {
                    label: "Parent Organization",
                    accessorKey: "parent",
                },
            ],
        },
        {
            title: "Business Details",
            items: [
                {
                    label: "Business Name",
                    accessorKey: "name",
                },
                {
                    label: "Brand Name",
                    accessorKey: "brandName",
                },
                {
                    label: "Registration Number",
                    accessorKey: "registrationNo",
                },
                {
                    label: "Registration Date",
                    accessorKey: "registeredDate",
                },
                {
                    label: "Registered Country",
                    accessorKey: "registeredCountry.country",
                },
                {
                    label: "Status",
                    accessorKey: "status",
                    cell: (data) => <OrganizationStakeholderStatusBadge statusId={data.statusId} label={data.status} />,
                },
                {
                    label: "Remarks",
                    accessorKey: "remarks",
                },
            ],
        },
        {
            title: "Address Details",
            items: [
                {
                    label: "Country",
                    accessorKey: "address.country",
                },
                {
                    label: "State",
                    accessorKey: "address.state",
                },
                {
                    label: "City",
                    accessorKey: "address.city",
                },
                {
                    label: "Postal Code",
                    accessorKey: "address.postCode",
                },
                {
                    label: "Street",
                    accessorKey: "address.street",
                },
                {
                    label: "Unit",
                    accessorKey: "address.unit",
                },
                {
                    label: "Address",
                    accessorKey: "permanentAddress.address",
                },
            ],
        },
    ]);

    const fetch = () => dispatch(stakeholderActions.get_organization_stakeholder_by_id(stakeholderId));

    useEffect(() => {
        if (stakeholderId) {
            fetch();
        }
    }, [stakeholderId]);

    return (
        <Modal
            title="Organization Stakeholder Details"
            open={!isEmpty(stakeholderId)}
            onClose={onClose}
            sx={{ minWidth: "600px" }}
        >
            <Box>
                <Row justifyContent="flex-end">
                    <PopoverButton variant="button" disabled={isLoading}>
                        {({ onClose }) => (
                            <>
                                <ListItemButton onClick={() => (openModal(), onClose())}>Update Status</ListItemButton>
                                {data?.statusId !== organizationStakeholderStatus.APPROVED && (
                                    <ListItemButton onClick={() => onEditStakeholder?.(data.kybId)}>Edit</ListItemButton>
                                )}
                            </>
                        )}
                    </PopoverButton>
                </Row>
            </Box>
            <SourceDetails definition={definition} data={data} isLoading={isLoading} />
            <Divider sx={{ my: "16px" }} />
            <Documents data={data?.documents ?? []} isLoading={isLoading} />
            {data && stakeholderId && (
                <ChangeOrganizationStakeholderStatusModal
                    currentStatusId={data.statusId}
                    onClose={closeModal}
                    onSuccess={() => {
                        fetch();
                        onChangeStatusSuccess?.();
                    }}
                    open={isModalOpen}
                    stakeholderId={stakeholderId}
                />
            )}
        </Modal>
    );
}

ViewOrganizationStakeholderModal.propTypes = {
    stakeholderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onClose: PropTypes.func,
    onChangeStatusSuccess: PropTypes.func,
    onEditStakeholder: PropTypes.func,
};
